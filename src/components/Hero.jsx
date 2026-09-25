import { Image } from "@/components/ui/image";

const HERO_IMG =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85";

/**
 * The "Scale & Stability" Hero — full-bleed landmark asset, headline split across the grid
 * ("WE ARCHITECT" top-left / "WEALTH" bottom-right), with a live ticker of AUM and investors.
 */
export default function Hero() {
  const aum = 1.2;
  const investors = 2;

  return (
    <section id="top" className="relative h-screen min-h-[680px] w-full overflow-hidden bg-foreground">
      {/* Full-bleed image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Landmark multifamily asset at golden hour"
          className="w-full h-full object-cover"
          fittingType="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/70" />
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      {/* 12-column grid hair-lines */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
        {Array.from({ length: 13 }).map((_, i) => (
          <div
            key={i}
            className="border-l border-background/10 h-full"
            style={{ gridColumnStart: i + 1 }}
          />
        ))}
      </div>

      {/* Split headline across the grid */}
      <div className="relative z-10 h-full grid grid-rows-3 px-5 md:px-8 pb-36 md:pb-40 pt-28 md:pt-24">
        <div className="row-start-1 flex items-start">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-background/70">
            Institutional Real Estate Syndication
          </span>
        </div>

        <div className="row-start-2 flex flex-col justify-center">
          <h1 className="font-heading font-medium text-background leading-[0.92] tracking-[-0.02em]">
            <span className="block text-[15vw] md:text-[9vw] reveal-line">
              <span style={{ animationDelay: "0.1s" }}>We Architect</span>
            </span>
          </h1>
        </div>

        <div className="row-start-3 flex flex-col justify-end items-end text-right">
          <h1 className="font-heading font-medium text-background leading-[0.92] tracking-[-0.02em]">
            <span className="block text-[15vw] md:text-[9vw] reveal-line">
              <span style={{ animationDelay: "0.35s" }}>Wealth.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-background/80 text-base md:text-lg font-body leading-relaxed">
            We acquire, reposition, and operate landmark real assets — converting
            physical infrastructure into durable, tax-advantaged yield for
            accredited partners.
          </p>
        </div>
      </div>

      {/* Live ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-background/20 bg-foreground/30 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-background/15">
          <Metric label="Assets Under Management" value={`$${aum.toFixed(1)}M`} />
          <Metric label="Investors Distributed" value={investors.toLocaleString()} />
          <Metric label="Avg. Net IRR" value="18.4%" />
          <Metric label="Active Offerings" value="0" />
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, live }) {
  return (
    <div className="px-5 md:px-8 py-4 md:py-5">
      <div className="flex items-center gap-2 mb-1">
        {live && (
          <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
        )}
        <span className="font-mono text-[11px] md:text-[10px] uppercase tracking-[0.22em] text-background/60">
          {label}
        </span>
      </div>
      <div className="font-mono text-xl md:text-2xl text-background tabular-nums">
        {value}
      </div>
    </div>
  );
}