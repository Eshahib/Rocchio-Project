import { useMemo, useState } from "react";
import { Image } from "@/components/ui/image";
import { useInView } from "@/hooks/useInView";

const DETAIL_IMG =
  "https://media.base44.com/images/public/6a94a284256ee594ccae6fbb/0ced4e203_IMG_4380.jpg";

/**
 * The "Asset Deep-Dive" — split-screen. Left: sticky gallery of architectural detail.
 * Right: scrollable investment thesis, market analytics, funding progress, and a
 * "Calculate Returns" slider widget.
 */
export default function AssetDeepDive() {
  const [ref, inView] = useInView();
  const [investment, setInvestment] = useState(250000);

  const { equityMultiple, irr, projectedProfit } = useMemo(() => {
    const irrRate = 0.168;
    const years = 8;
    const multiple = Math.pow(1 + irrRate, years);
    return {
      equityMultiple: multiple.toFixed(2) + "x",
      irr: "16.8%",
      projectedProfit: Math.round(investment * (multiple - 1)).toLocaleString(),
    };
  }, [investment]);

  return (
    <section id="portfolio" className="relative py-24 md:py-36 bg-background">
      <div className="px-5 md:px-8">
        <div className="grid grid-cols-12 gap-4 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Deep-Dive
            </span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-heading text-5xl md:text-7xl font-medium tracking-[-0.02em] leading-[0.95]">
              22 Bristol St
            </h2>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              RCH-101 · West Haven, CT 06516 · 3 Units · 2BR Each
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          {/* Left — sticky gallery */}
          <div className="lg:sticky lg:top-10 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={DETAIL_IMG}
                alt="22 Bristol St — renovated 1920s three-unit multifamily"
                className="w-full h-full object-cover"
                fittingType="fill"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-foreground/80 to-transparent">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/80">
                  Interior detail — renovated unit
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-px mt-px bg-border">
              {[
                { l: "Year Built", v: "1920s" },
                { l: "Unit Mix", v: "3 × 2BR" },
                { l: "Occupancy", v: "100%" },
              ].map((x) => (
                <div key={x.l} className="bg-background px-4 py-5">
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    {x.l}
                  </div>
                  <div className="font-mono text-base">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — scrollable document feed */}
          <div ref={ref} className="space-y-12">
            {/* Funding progress */}
            <div className={`assemble ${inView ? "in-view" : ""}`}>
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Capital Raised
                </span>
                <span className="font-mono text-sm">100% — $5XX,000</span>
              </div>
              <div className="h-2 bg-secondary overflow-hidden">
                <div className="h-full bg-accent" style={{ width: "100%" }} />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
                Closed 2024 · Fully Subscribed · Accredited investors only
              </p>
            </div>

            <Block title="Investment Thesis">
              22 Bristol St is a fully occupied three-unit multifamily residence in
              West Haven, Connecticut — a 1920s-era property acquired below
              replacement cost in a supply-constrained shoreline submarket. We
              renovated all three 2-bedroom units, repositioned rents to market,
              and stabilized the asset at 100% occupancy before a planned
              7–9 year hold.
            </Block>

            {/* Market analytics */}
            <div className="grid grid-cols-2 gap-px bg-border">
              {[
                { l: "Submarket Rent Growth", v: "3.4%" },
                { l: "Population Growth (5y)", v: "+2.1%" },
                { l: "Median Household Income", v: "$74k" },
                { l: "Median Rent (06516)", v: "$2.2K/mo" },
              ].map((x) => (
                <div key={x.l} className="bg-background px-5 py-6">
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {x.l}
                  </div>
                  <div className="font-heading text-3xl font-medium">{x.v}</div>
                </div>
              ))}
            </div>

            {/* Calculate Returns widget */}
            <div className="border hair-line p-6 md:p-8 bg-foreground text-background">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-highlight" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/60">
                  Calculate Returns
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/60">
                    Your Investment
                  </span>
                  <span className="font-mono text-2xl text-highlight tabular-nums">
                    ${investment.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={2000000}
                  step={25000}
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
                <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-background/40 mt-2">
                  <span>$50K</span>
                  <span>$2.0M</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-px bg-background/15">
                {[
                  { l: "Proj. IRR", v: irr },
                  { l: "Equity Multiple", v: equityMultiple },
                  { l: "Proj. Profit", v: `$${projectedProfit}` },
                ].map((x) => (
                  <div key={x.l} className="bg-foreground px-4 py-5">
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-background/50 mb-2">
                      {x.l}
                    </div>
                    <div className="font-mono text-lg text-highlight tabular-nums">
                      {x.v}
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-background/40 mt-4 leading-relaxed">
                Illustrative projection based on target returns. Not a guarantee.
                Past performance does not indicate future results.
              </p>
            </div>

            <a
              href="#portal"
              className="inline-flex items-center gap-3 bg-highlight text-highlight-foreground px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-colors"
            >
              Request Offering Memorandum
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Block({ title, children }) {
  return (
    <div>
      <h3 className="font-heading text-2xl md:text-3xl font-medium mb-4">{title}</h3>
      <p className="text-muted-foreground text-lg leading-relaxed">{children}</p>
    </div>
  );
}