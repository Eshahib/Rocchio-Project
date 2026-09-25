import { createClientFromRequest } from "npm:@base44/sdk";
import { secrets } from "base44:runtime";

const requiredFields = ["name", "email", "accredited", "income", "interest", "whyInterested"];

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] || character,
  );

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();
    const missingField = requiredFields.find(
      (field) => typeof payload[field] !== "string" || !payload[field].trim(),
    );

    if (missingField) {
      return Response.json(
        { error: `${missingField} is required` },
        { status: 400 },
      );
    }

    const recipient = secrets.get("PARTNER_INQUIRY_RECIPIENT");
    if (!recipient) {
      return Response.json(
        { error: "Partner inquiry recipient is not configured" },
        { status: 500 },
      );
    }

    const { name, email, accredited, income, interest, whyInterested } = payload;
    const safeValues = { name, email, accredited, income, interest, whyInterested };
    const body = `
      <h2>New Partner Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(safeValues.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(safeValues.email)}</p>
      <p><strong>Accredited investor:</strong> ${escapeHtml(safeValues.accredited)}</p>
      <p><strong>Annual income range:</strong> ${escapeHtml(safeValues.income)}</p>
      <p><strong>Primary investment interest:</strong> ${escapeHtml(safeValues.interest)}</p>
      <p><strong>Why they are interested:</strong></p>
      <p>${escapeHtml(safeValues.whyInterested).replace(/\n/g, "<br />")}</p>
    `;

    await base44.integrations.Core.SendEmail({
      to: recipient,
      subject: `New partner inquiry from ${name.trim()}`,
      body,
      from_name: "Rocchio Syndications Partners",
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Partner inquiry failed", error);
    return Response.json(
      { error: "Unable to send partner inquiry" },
      { status: 500 },
    );
  }
}
