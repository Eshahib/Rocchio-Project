import Logo from "@/components/Logo";

/**
 * Footer — architectural sign-off with contact, legal, and structural mark.
 */
export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-16 px-5 md:px-8">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 md:col-span-5">
          <Logo variant="light" className="mb-6" />
          <p className="text-background/60 max-w-sm leading-relaxed">
            An institutional real estate syndication firm architecting generational
            wealth through landmark physical assets.
          </p>
        </div>

        <div className="col-span-6 md:col-span-2">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/40 mb-5">Navigate</h4>
          <ul className="space-y-3">
            {[
              ["Opportunities", "#opportunities"],
              ["Approach", "#approach"],
              ["Portfolio", "#portfolio"],
              ["Partner", "#portal"],
            ].map(([l, h]) => (
              <li key={h}>
                <a href={h} className="text-background/70 hover:text-highlight transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 md:col-span-3">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/40 mb-5">Contact</h4>
          <ul className="space-y-3 text-background/70">
            <li className="break-all"><a href="mailto:Cody.Rocchio@yahoo.com" className="hover:text-highlight transition-colors">Cody.Rocchio@yahoo.com</a></li>
            <li>(475) 441-1449</li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-2">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/40 mb-5">Legal</h4>
          <ul className="space-y-3 text-background/70">
            <li><a href="#" className="hover:text-highlight transition-colors">Form ADV</a></li>
            <li><a href="#" className="hover:text-highlight transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-highlight transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-highlight transition-colors">Disclosures</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/40">
          © 2026 Rocchio Syndications Partners — All Rights Reserved
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/40">
          SEC Registered Investment Adviser · For Accredited Investors Only
        </span>
      </div>
    </footer>
  );
}