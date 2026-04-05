const items = [
  "SAVE UP TO 70%",
  "30+ PLACEMENTS",
  "4.9 / 5 RATED",
  "3–10 DAYS TO HIRE",
  "94% RETENTION RATE",
  "20+ COUNTRIES",
  "TOP 5% TALENT",
  "ZERO HIDDEN FEES",
];

const sep = "✦";

export default function MarqueeStrip() {
  // Triple the items for a seamless loop (we animate -33.33%)
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden py-3.5"
      style={{ background: "#a8e8f5" }}
      aria-hidden="true"
    >
      <div className="animate-marquee-text whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 mx-6"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="text-[#090F0D] text-[11px] font-black tracking-[0.2em] uppercase">
              {item}
            </span>
            <span className="text-[#090F0D]/35 text-[10px]">{sep}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
