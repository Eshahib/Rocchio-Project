import { useInView } from "@/hooks/useInView";

const PILLARS = [
  {
    n: "I",
    title: "Underwrite the Structure",
    body: "We model every asset to its bones — rent rolls, replacement cost, and the geometry of the submarket. No deal closes until the thesis survives a stress-tested downside.",
  },
  {
    n: "II",
    title: "Reposition the Asset",
    body: "Capital expenditure is deployed with architectural intent — value-add renovations, lease engineering, and operational systems that compound NOI across the hold.",
  },
  {
    n: "III",
    title: "Distribute the Yield",
    body: "Quarterly distributions begin at stabilization. We exit on schedule, returning principal plus appreciation through tax-advantaged structures vetted by counsel.",
  },
];

const STATS = [
  { value: "$1.2M", label: "Assets Under Management" },
  { value: "2", label: "Acquisitions Closed" },
  { value: "2", label: "Limited Partners" },
  { value: "1", label: "Years Operating" },
];

/**
 * The "Approach" — institutional thesis, three structural pillars, and a stats band.
 */
export default function Approach() {
  const [ref, inView] = useInView();
  return (
    <section id="approach" className="relative py-24 md:py-36 bg-foreground text-background">
      <div className="px-5 md:px-8">
        <div className="grid grid-cols-12 gap-4 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-background/50">
              Method
            </span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-heading text-5xl md:text-7xl font-medium tracking-[-0.02em] leading-[0.95]">
              We are not middlemen.
              <br />
              <span className="text-highlight">We are builders of wealth.</span>
            </h2>
          </div>
        </div>

        {/* Pillars */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 border-t border-background/15">
          {PILLARS.map((p, i) => (
            <div
              key={p.n}
              className={`assemble ${inView ? "in-view" : ""} py-10 md:py-12 px-1 md:px-8 border-b md:border-b-0 border-background/15 ${
                i > 0 ? "md:border-l border-background/15" : ""
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="font-heading text-5xl text-highlight/80 block mb-6">
                {p.n}
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-medium mb-4 leading-tight">
                {p.title}
              </h3>
              <p className="text-background/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Stats band */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-background/15 mt-px border-y border-background/15">
          {STATS.map((s) => (
            <div key={s.label} className="bg-foreground px-5 md:px-8 py-10 md:py-14">
              <div className="font-heading text-5xl md:text-6xl font-medium tracking-tight">
                {s.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/50 mt-3">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}