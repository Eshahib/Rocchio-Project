import { cn } from "@/lib/utils";

/**
 * Rocchio brand mark — a seamless three-building skyline (no enclosing border)
 * with the wordmark stack. `variant` adapts colors for dark/light backgrounds:
 *   "dark"  → navy/grey (use over light surfaces)
 *   "light" → alabaster/light-grey (use over dark surfaces)
 */
export default function Logo({ variant = "dark", className }) {
  const navy = variant === "light" ? "#F9F8F6" : "#0a1a2a";
  const grey = variant === "light" ? "rgba(249,248,246,0.65)" : "#959595";

  return (
    <div className={cn("flex flex-col items-center select-none", className)}>
      <svg viewBox="0 0 120 80" className="w-16 h-11 md:w-[4.5rem] md:h-12" aria-hidden="true">
        {/* Left building */}
        <path d="M6 78 L6 52 L20 38 L34 52 L34 78 Z" fill={navy} />
        {/* Center building (grey, taller) */}
        <path d="M40 78 L40 30 L60 12 L80 30 L80 78 Z" fill={grey} />
        {/* Right building */}
        <path d="M86 78 L86 50 L100 36 L114 50 L114 78 Z" fill={navy} />
        {/* Subtle facet line on center building */}
        <path d="M60 12 L60 78" stroke={navy} strokeOpacity="0.18" strokeWidth="1.5" />
      </svg>

      <div className="text-center leading-none mt-2">
        <div
          className="font-semibold tracking-[0.34em] text-base md:text-lg pr-[0.34em]"
          style={{ color: navy }}
        >
          ROCCHIO
        </div>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span className="block h-px w-3 md:w-4" style={{ background: grey }} />
          <span
            className="tracking-[0.28em] text-[11px] md:text-[8px] pr-[0.28em]"
            style={{ color: grey }}
          >
            REAL ESTATE
          </span>
          <span className="block h-px w-3 md:w-4" style={{ background: grey }} />
        </div>
        <div
          className="tracking-[0.26em] text-[11px] md:text-[8px] mt-1 pr-[0.26em]"
          style={{ color: navy }}
        >
          SYNDICATIONS PARTNERS
        </div>
      </div>
    </div>
  );
}