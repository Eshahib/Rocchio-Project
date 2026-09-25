import { useRef } from "react";
import { Image } from "@/components/ui/image";
import { ArrowRight, ArrowLeft } from "lucide-react";

const DEALS = [
  {
    code: "RCH-101",
    name: "22 Bristol St",
    class: "Past Deal",
    location: "",
    irr: "16.8%",
    hold: "7-9 yrs",
    raise: "$5XX,000",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    code: "RCH-102",
    name: "1045 Campbell Ave",
    class: "Past Deal",
    location: "",
    irr: "15.9%",
    hold: "7-9 yrs",
    raise: "$6XX,000",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
  },
];

/**
 * The "Active Opportunities" Matrix — horizontal-scrolling masonry of vertical Deal Cards.
 * Each card shows a Spec Sheet (IRR, Hold, Asset Class) over a desaturated architectural photo.
 */
export default function OpportunitiesMatrix() {
  const scroller = useRef(null);

  const scrollBy = (dir) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: dir * (node.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="opportunities" className="relative py-24 md:py-36 bg-background">
      <div className="px-5 md:px-8">
        {/* Section header — asymmetric massing */}
        <div className="grid grid-cols-12 gap-4 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Offerings
            </span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <h2 className="font-heading text-5xl md:text-7xl font-medium tracking-[-0.02em] leading-[0.95]">
              Past Deals
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground text-lg leading-relaxed">
              A record of completed investments. Each asset was acquired, repositioned,
              and exited on a defined thesis — delivering durable yield to our partners.
            </p>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end items-end gap-3">
            <button
              onClick={() => scrollBy(-1)}
              className="w-11 h-11 border hair-line rounded-none flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="w-11 h-11 border hair-line rounded-none flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scroller}
        className="flex gap-5 md:gap-8 overflow-x-auto px-5 md:px-8 pb-8 snap-x snap-mandatory scroll-pl-5 md:scroll-pl-8"
        style={{ scrollbarWidth: "none" }}
      >
        {DEALS.map((d) => (
          <DealCard key={d.code} deal={d} />
        ))}
        <div className="shrink-0 w-1" />
      </div>
    </section>
  );
}

function DealCard({ deal }) {
  return (
    <article className="group relative shrink-0 w-[78vw] sm:w-[340px] md:w-[380px] snap-start">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={deal.img}
          alt={deal.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          fittingType="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />

        {/* Spec sheet overlay */}
        <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between text-background">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/70">
              {deal.code}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] border border-background/40 px-2 py-1">
              {deal.class}
            </span>
          </div>

          <div>
            <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-background/25">
              <Spec label="Proj. IRR" value={deal.irr} accent />
              <Spec label="Hold" value={deal.hold} />
              <Spec label="Raise" value={deal.raise} />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-medium leading-tight">
              {deal.name}
            </h3>
            {deal.location && (
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/60 mt-1">
                {deal.location}
              </p>
            )}

            {/* Reveal on hover */}
            <a
              href="#portal"
              className="mt-5 inline-flex items-center gap-2 bg-highlight text-highlight-foreground px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
            >
              Request Memorandum
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value, accent }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-background/50 mb-1">
        {label}
      </div>
      <div className={`font-mono text-lg ${accent ? "text-highlight" : "text-background"}`}>
        {value}
      </div>
    </div>
  );
}