"use client";

import { useRef, useEffect } from "react";
import { StatsBars } from "@/components/ui/statistics-card";
import { CobeGlobe } from "@/components/ui/cobe-globe-analytics";

// ─── Count-up hook
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function useCountUp(target: number | null, suffix = "", duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    if (target === null || done.current) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(easeOut(p) * target) + (p >= 1 ? suffix : "");
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix, duration]);
  return ref;
}

// ─── Comparison bar data
const COMPARISON_BARS = [
  { value: 18, label: "In-House",    delay: 0.1 },
  { value: 32, label: "Freelance",   delay: 0.2 },
  { value: 41, label: "Agency",      delay: 0.3 },
  {
    value: 95,
    label: "Remote ACKtive",
    highlight: true,
    highlightColor: "linear-gradient(180deg, #a8e8f5 0%, #b8fce8 100%)",
    delay: 0.45,
  },
];

export default function StatsBlock() {
  const placementsRef = useCountUp(30, "+");
  const retentionRef  = useCountUp(94, "%");
  const countriesRef  = useCountUp(20, "+");

  return (
    <section
      id="stats"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(to right, #FFFDE4, #005AA7)" }}
    >
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">

        {/* ── Compact stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-white/[0.08] rounded-2xl overflow-hidden mb-14">
          {[
            { label: "Successful Placements", value: null, display: placementsRef, raw: "30+", accent: "#a8e8f5" },
            { label: "Client Rating",         value: null, display: null,           raw: "4.9/5", accent: "#b8fce8" },
            { label: "Retention Rate",        value: null, display: retentionRef,   raw: "94%",   accent: "#a8e8f5" },
            { label: "Countries Covered",     value: null, display: countriesRef,   raw: "20+",   accent: "#b8fce8" },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-3.5 px-3 text-center"
              style={{ background: "rgba(13,31,45,0.88)" }}
            >
              <span
                className="text-xl font-black tabular-nums leading-none"
                style={{ color: s.accent }}
              >
                {s.display ? <span ref={s.display}>0</span> : s.raw}
              </span>
              <p className="text-[10px] mt-1 tracking-wide uppercase leading-tight" style={{ color: "rgba(255,255,255,0.6)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Differentiator headline ── */}
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-black leading-tight mb-3" style={{ color: "#000000" }}>
            The smarter way{" "}
            <span className="inline rounded-md px-2 py-1" style={{ background: "rgba(13,31,45,0.88)" }}>
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #a8e8f5, #b8fce8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                to hire globally.
              </span>
            </span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(0,0,0,0.72)" }}>
            We consistently outperform traditional hiring options on cost savings, speed, and retention.
            Our talent network spans all of LATAM — and your next hire is already there.
          </p>
        </div>

        {/* ── Two-column: chart left / globe right ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* LEFT: Comparison bars */}
          <div
            className="rounded-2xl p-7 flex flex-col"
            style={{
              background: "rgba(13,31,45,0.88)",
              border: "1px solid rgba(255,255,255,0.08)",
              minHeight: "320px",
            }}
          >
            <div className="mb-5">
              <p className="text-[11px] font-black tracking-[0.25em] uppercase" style={{ color: "#a8e8f5" }}>
                Value Score Comparison
              </p>
              <p className="font-bold mt-1" style={{ color: "#ffffff" }}>How we stack up</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                Cost efficiency · Speed · Retention · Quality
              </p>
            </div>
            <div className="flex-1">
              <StatsBars bars={COMPARISON_BARS} valueSuffix="%" />
            </div>
          </div>

          {/* RIGHT: COBE globe */}
          <div
            className="rounded-2xl p-4 sm:p-7 flex flex-col items-center justify-center"
            style={{
              background: "rgba(13,31,45,0.88)",
              border: "1px solid rgba(255,255,255,0.08)",
              minHeight: "320px",
            }}
          >
            <div className="w-full mb-4">
              <p className="text-[11px] font-black tracking-[0.25em] uppercase" style={{ color: "#b8fce8" }}>
                Live Talent Network
              </p>
              <p className="font-bold mt-1" style={{ color: "#ffffff" }}>40+ professionals across LATAM</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                Honduras · Colombia · Mexico · Argentina · Chile · Ecuador · Peru
              </p>
            </div>
            <CobeGlobe className="w-full max-w-[340px] mx-auto" speed={0.004} />
          </div>

        </div>
      </div>
    </section>
  );
}
