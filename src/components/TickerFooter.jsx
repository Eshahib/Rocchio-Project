const ITEMS = [
  "ROCCHIO AUM $4.2B",
  "ACTIVE DEALS 07",
  "INVESTORS 1,840",
  "AVG. NET IRR 18.4%",
  "CO-OP RETURN 2024 +22.1%",
  "DISTRIBUTIONS YTD $312M",
  "MULTIFAMILY INDEX ▲ 1.4%",
  "INDUSTRIAL INDEX ▲ 2.8%",
  "OFFICE VACANCY ▼ 0.6%",
  "CAP RATE EXPANSION +40bps",
];

/**
 * Interactive Ticker Footer — a persistent scrolling band at the very bottom of the
 * viewport displaying firm metrics and real estate market indices.
 */
export default function TickerFooter() {
  const stream = [...ITEMS, ...ITEMS];
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 min-h-8 bg-foreground text-background overflow-hidden hidden md:flex items-center border-t border-highlight/30"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="ticker-track">
        {stream.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[11px] uppercase tracking-[0.18em] px-6 flex items-center gap-6"
          >
            {item}
            <span className="text-highlight/70">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}