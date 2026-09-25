import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "@/hooks/useInView";
import { ArrowRight, Check } from "lucide-react";
import IncomeSelect from "@/components/IncomeSelect";
import { base44 } from "@/api/base44Client";

/**
 * The "Investor Portal" Gateway — two paths: "Access Deal Room" (existing) and
 * "Partner with Us" (new). The partner form is a multi-step Qualification Flow
 * that feels like a bespoke consultation. Flow progress (path + step) is synced
 * to search params so the iOS back gesture/button navigates between steps.
 */
export default function InvestorPortal() {
  const [ref, inView] = useInView();
  const [searchParams, setSearchParams] = useSearchParams();
  const path = searchParams.get("path"); // null | "access" | "partner"
  const step = parseInt(searchParams.get("step") || "0", 10);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    accredited: "",
    income: "",
    interest: "",
    whyInterested: "",
  });

  // Any route change (incl. back gesture) resets the terminal success state.
  useEffect(() => {
    setDone(false);
  }, [path, step]);

  const updateParams = (changes) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(changes).forEach(([k, v]) => {
        if (v === null || v === undefined) next.delete(k);
        else next.set(k, String(v));
      });
      return next;
    });
  };

  const choosePath = (p) => {
    setDone(false);
    if (p === "partner") updateParams({ path: p, step: 0 });
    else updateParams({ path: p });
  };

  const reset = () => {
    setDone(false);
    setSubmitError("");
    setForm({ name: "", email: "", accredited: "", income: "", interest: "", whyInterested: "" });
    updateParams({ path: null, step: null });
  };

  const next = () => updateParams({ step: step + 1 });
  const back = () => {
    if (step > 0) updateParams({ step: step - 1 });
    else updateParams({ path: null, step: null });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      await base44.functions.invoke("partner-inquiry", form);
      setDone(true);
    } catch (error) {
      setSubmitError(error.response?.data?.error || "We couldn't send your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <section id="portal" className="relative py-24 md:py-36 bg-background">
      <div className="px-5 md:px-8">
        <div className="grid grid-cols-12 gap-4 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Portal
            </span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-heading text-5xl md:text-7xl font-medium tracking-[-0.02em] leading-[0.95]">
              Become an Investor
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground text-lg leading-relaxed">
              Our offerings are restricted to accredited investors. Choose your
              path below.
            </p>
          </div>
        </div>

        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border hair-line assemble ${inView ? "in-view" : ""}`}>
          {/* Left — paths / access */}
          <div className="bg-background p-8 md:p-12 flex flex-col">
            {!path ? (
              <>
                <h3 className="font-heading text-3xl font-medium mb-8">Two Paths</h3>
                <button
                  onClick={() => choosePath("access")}
                  className="group text-left border hair-line p-6 mb-5 hover:border-foreground transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Existing Partner
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="font-heading text-2xl font-medium">Access Deal Room</div>
                  <p className="text-muted-foreground text-sm mt-2">
                    Log in to view active memoranda, distributions, and K-1s.
                  </p>
                </button>
                <button
                  onClick={() => choosePath("partner")}
                  className="group text-left border hair-line p-6 bg-foreground text-background hover:bg-accent hover:text-background transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/60">
                      New Investor
                    </span>
                    <ArrowRight className="w-4 h-4 text-background/60 group-hover:text-background group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="font-heading text-2xl font-medium">Partner with Us</div>
                  <p className="text-background/70 text-sm mt-2">
                    Complete a brief qualification flow to access offerings.
                  </p>
                </button>
              </>
            ) : path === "access" ? (
              <AccessRoom onBack={reset} />
            ) : done ? (
              <Success onBack={reset} />
            ) : (
              <QualificationFlow
                step={step}
                form={form}
                set={set}
                next={next}
                back={back}
                submit={submit}
                submitting={submitting}
                submitError={submitError}
                onBack={reset}
              />
            )}
          </div>

          {/* Right — trust panel */}
          <div className="bg-foreground text-background p-8 md:p-12 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/50">
                Institutional Standards
              </span>
              <h3 className="font-heading text-3xl md:text-4xl font-medium mt-6 leading-tight">
                Discretion is the foundation of partnership.
              </h3>
            </div>
            <ul className="space-y-5 mt-10">
              {[
                "SEC-registered investment vehicle",
                "Quarterly distributions & full reporting",
                "Tax-advantaged operating structures",
                "Independent third-party administration",
                "15-year track record across cycles",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-highlight mt-1 shrink-0" />
                  <span className="text-background/80">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-6 border-t border-background/15 font-mono text-[10px] uppercase tracking-[0.2em] text-background/40">
              This is not an offer to sell securities. Offerings made only to
              verified accredited investors via PPM.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccessRoom({ onBack }) {
  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center min-h-[44px] font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-6 hover:text-foreground">
        ← Back
      </button>
      <h3 className="font-heading text-3xl font-medium mb-8">Access Deal Room</h3>
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onBack(); }}>
        <Field label="Email">
          <input type="email" required placeholder="partner@firm.com" className="w-full bg-transparent border-b hair-line py-3 focus:outline-none focus:border-foreground" />
        </Field>
        <Field label="Password">
          <input type="password" required placeholder="••••••••" className="w-full bg-transparent border-b hair-line py-3 focus:outline-none focus:border-foreground" />
        </Field>
        <button type="submit" className="w-full bg-highlight text-highlight-foreground min-h-[44px] py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-colors">
          Enter Deal Room ↗
        </button>
      </form>
    </div>
  );
}

function QualificationFlow({ step, form, set, next, back, submit, submitting, submitError, onBack }) {
  const steps = ["Identity", "Accreditation", "Interests"];
  const canNext =
    (step === 0 && form.name && form.email) ||
    (step === 1 && form.accredited && form.income) ||
    (step === 2 && form.interest && form.whyInterested);

  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center min-h-[44px] font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-6 hover:text-foreground">
        ← Back
      </button>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div className={`h-px ${i <= step ? "bg-foreground" : "bg-border"}`} />
            <span className={`font-mono text-[9px] uppercase tracking-[0.2em] mt-2 block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
              0{i + 1} · {s}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-6">
        {step === 0 && (
          <>
            <Field label="Full Name">
              <input value={form.name} onChange={(e) => set("name", e.target.value)} required className="w-full bg-transparent border-b hair-line py-3 focus:outline-none focus:border-foreground" placeholder="Jordan Mercer" />
            </Field>
            <Field label="Email">
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className="w-full bg-transparent border-b hair-line py-3 focus:outline-none focus:border-foreground" placeholder="jordan@example.com" />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field label="Are you an accredited investor?">
              <div className="grid grid-cols-2 gap-3 mt-2">
                {["Yes", "Not yet"].map((o) => (
                  <button type="button" key={o} onClick={() => set("accredited", o)} className={`border py-3 min-h-[44px] font-mono text-xs uppercase tracking-[0.15em] transition-colors ${form.accredited === o ? "bg-foreground text-background border-foreground" : "hair-line hover:border-foreground"}`}>
                    {o}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Annual Income Range">
              <IncomeSelect value={form.income} onChange={(v) => set("income", v)} />
            </Field>
          </>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Field label="Primary Investment Interest">
              <div className="grid grid-cols-1 gap-3 mt-2">
                {["Multifamily Value-Add", "Industrial / Logistics", "Office Repositioning", "Diversified Portfolio"].map((o) => (
                  <button type="button" key={o} onClick={() => set("interest", o)} className={`text-left border px-4 py-3 min-h-[44px] transition-colors ${form.interest === o ? "bg-foreground text-background border-foreground" : "hair-line hover:border-foreground"}`}>
                    <span className="font-mono text-xs uppercase tracking-[0.12em]">{o}</span>
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Why are you interested in partnering with us?">
              <textarea value={form.whyInterested} onChange={(e) => set("whyInterested", e.target.value)} required rows={4} className="w-full resize-none bg-transparent border hair-line p-3 mt-2 focus:outline-none focus:border-foreground" placeholder="Tell us a little about your investment goals..." />
            </Field>
          </div>
        )}

        {submitError && (
          <p role="alert" className="text-sm text-destructive">{submitError}</p>
        )}

        <div className="flex items-center justify-between pt-4">
          {step > 0 ? (
            <button type="button" onClick={back} className="inline-flex items-center min-h-[44px] font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
              ← Previous
            </button>
          ) : <span />}

          {step < 2 ? (
            <button type="button" onClick={next} disabled={!canNext} className="bg-highlight text-highlight-foreground disabled:opacity-40 px-6 py-3 min-h-[44px] font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-colors">
              Continue →
            </button>
          ) : (
            <button type="submit" disabled={!canNext || submitting} className="bg-highlight text-highlight-foreground disabled:opacity-40 px-6 py-3 min-h-[44px] font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-colors">
              {submitting ? "Sending..." : "Submit Application ↗"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Success({ onBack }) {
  return (
    <div className="flex flex-col justify-center items-start h-full">
      <div className="w-12 h-12 border-2 border-accent rounded-full flex items-center justify-center mb-6">
        <Check className="w-6 h-6 text-accent" />
      </div>
      <h3 className="font-heading text-3xl font-medium mb-3">Application Received</h3>
      <p className="text-muted-foreground leading-relaxed mb-8">
        Thank you. Our investor relations team will review your qualification and
        reach out within two business days to schedule a consultation.
      </p>
      <button onClick={onBack} className="inline-flex items-center min-h-[44px] font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
        ← Return to Portal
      </button>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}