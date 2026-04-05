"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { HandwritingUnderline } from "@/components/ui/HandwritingText";

const TEAL     = "#a8e8f5";
const MINT     = "#b8fce8";
const TEAL_RGB = "168,232,245";
const MINT_RGB = "184,252,232";

const rows = [
  { category: "Time to Hire",            them: "Weeks or months",                 us: "3–10 days" },
  { category: "Cost Transparency",       them: "Hidden markups 50–100%",          us: "Flat-fee, no surprises" },
  { category: "Talent Quality",          them: "Whoever's available",             us: "Top 5%, hand-screened" },
  { category: "Post-Hire Support",       them: "Gone after placement",            us: "Lifetime partnership" },
  { category: "Custom Fit",              them: "One-size-fits-all packages",      us: "Matched to your business" },
  { category: "Performance Monitoring",  them: "Zero follow-through",             us: "Ongoing check-ins & tracking" },
];

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

function ScoreRow({
  row,
  index,
  revealed,
}: {
  row: (typeof rows)[0];
  index: number;
  revealed: boolean;
}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (revealed) {
      setTimeout(() => setChecked(true), index * 110 + 300);
    }
  }, [revealed, index]);

  return (
    <div
      className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8 transition-all duration-500"
      style={{
        borderTop:       "1px solid rgba(255,255,255,0.07)",
        opacity:         revealed ? 1 : 0,
        transform:       revealed ? "translateY(0)" : "translateY(10px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Left — Them */}
      <div className="py-3 flex items-center gap-3 md:gap-4">
        {/* X mark */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: checked ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.05)",
            border:     checked ? "1px solid rgba(239,68,68,0.45)" : "1px solid rgba(255,255,255,0.12)",
            boxShadow:  checked ? "0 0 12px rgba(239,68,68,0.15)" : "none",
          }}
        >
          <span
            className="font-black text-sm transition-all duration-300"
            style={{ color: checked ? "rgb(220,38,38)" : "rgba(255,255,255,0.25)" }}
          >
            ✕
          </span>
        </div>
        <p
          className="text-xs md:text-sm leading-snug"
          style={{
            color:                   checked ? "rgb(252,165,165)" : "rgba(255,255,255,0.75)",
            fontFamily:              "var(--font-body)",
            textDecorationLine:      checked ? "line-through" : "none",
            textDecorationColor:     "rgba(239,68,68,0.5)",
            textDecorationThickness: "1px",
            transition:              "color 0.3s ease",
          }}
        >
          {row.them}
        </p>
      </div>

      {/* Center — Category */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0 text-center px-2">
        <span
          className="text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase whitespace-nowrap"
          style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)" }}
        >
          {row.category}
        </span>
        <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Right — Us */}
      <div className="py-3 flex items-center justify-end gap-3 md:gap-4">
        <p
          className="text-xs md:text-sm leading-snug font-semibold text-right"
          style={{ color: "#ffffff", fontFamily: "var(--font-body)" }}
        >
          {row.us}
        </p>
        {/* Check mark */}
        <div
          className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            background: checked ? `rgba(${TEAL_RGB},0.12)` : "rgba(255,255,255,0.05)",
            border:     checked ? `1px solid rgba(${TEAL_RGB},0.45)` : "1px solid rgba(255,255,255,0.12)",
            boxShadow:  checked ? `0 0 16px rgba(${TEAL_RGB},0.18)` : "none",
          }}
        >
          <span
            className="font-black text-sm md:text-base transition-all duration-500"
            style={{ color: checked ? TEAL : "rgba(255,255,255,0.25)" }}
          >
            ✓
          </span>
        </div>
      </div>
    </div>
  );
}

export default function WhatMakesUsDifferent() {
  const { ref, visible } = useReveal(0.1);
  const [scoreVisible, setScoreVisible] = useState(false);

  useEffect(() => {
    if (visible) setTimeout(() => setScoreVisible(true), rows.length * 110 + 600);
  }, [visible]);

  return (
    <section
      id="difference"
      className="relative overflow-hidden py-10"
      style={{ background: "linear-gradient(to right, #FFFDE4, #005AA7)" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 70% 60%, rgba(${TEAL_RGB},0.06) 0%, transparent 65%)`,
        }}
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* Header */}
        <div className="mb-10">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "#000000" }}
          >
            Others vs.{" "}
            <HandwritingUnderline color={MINT} duration={1.0} delay={0.4}>
              <span className="inline rounded-md px-2 py-1" style={{ background: "rgba(13,31,45,0.88)" }}>
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: `linear-gradient(135deg, ${TEAL} 0%, ${MINT} 100%)` }}
                >
                  ACKtive.
                </span>
              </span>
            </HandwritingUnderline>
          </h2>

          <p className="text-base max-w-lg leading-relaxed" style={{ color: "rgba(0,0,0,0.72)", fontFamily: "var(--font-body)" }}>
            Six categories. One winner. You decide who you trust with your team.
          </p>
        </div>

        {/* Scoreboard card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border:    "1px solid rgba(255,255,255,0.08)",
            background: "rgba(13,31,45,0.88)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
          }}
        >
          {/* Score header */}
          <div className="grid grid-cols-[1fr_auto_1fr]" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Left team */}
            <div
              className="py-4 px-6 md:px-8 flex flex-col items-start gap-1"
              style={{ background: "rgba(239,68,68,0.08)" }}
            >
              <span
                className="text-[10px] font-black tracking-[0.25em] uppercase"
                style={{ color: "rgb(252,165,165)", fontFamily: "var(--font-body)" }}
              >
                Typical Agency
              </span>
              <span
                className="font-black leading-none"
                style={{
                  fontSize:   "clamp(40px,6vw,64px)",
                  color:      "rgba(252,165,165,0.5)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                0
              </span>
            </div>

            {/* VS divider */}
            <div
              className="flex items-center justify-center px-4 md:px-6"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", borderRight: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span
                className="text-xs font-black tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
              >
                VS
              </span>
            </div>

            {/* Right team */}
            <div
              className="py-6 px-6 md:px-8 flex flex-col items-end gap-1"
              style={{ background: `rgba(${TEAL_RGB},0.05)` }}
            >
              <span
                className="text-[10px] font-black tracking-[0.25em] uppercase"
                style={{ color: TEAL, fontFamily: "var(--font-body)" }}
              >
                Remote ACKtive
              </span>
              <span
                className="font-black leading-none"
                style={{
                  fontSize:   "clamp(40px,6vw,64px)",
                  color:      TEAL,
                  fontFamily: "var(--font-heading)",
                  textShadow: `0 0 30px rgba(${TEAL_RGB},0.25)`,
                }}
              >
                6
              </span>
            </div>
          </div>

          {/* Rows */}
          <div ref={ref} className="px-6 md:px-8">
            {rows.map((row, i) => (
              <ScoreRow key={i} row={row} index={i} revealed={visible} />
            ))}
          </div>

          {/* Final verdict */}
          <div
            className="px-6 md:px-8 py-4 flex items-center justify-between flex-wrap gap-4 transition-all duration-700"
            style={{
              borderTop:  `1px solid rgba(${TEAL_RGB},0.15)`,
              background: `rgba(${TEAL_RGB},0.05)`,
              opacity:    scoreVisible ? 1 : 0,
              transform:  scoreVisible ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `rgba(${TEAL_RGB},0.12)`, border: `1px solid rgba(${TEAL_RGB},0.35)` }}
              >
                <span className="text-sm font-black" style={{ color: TEAL }}>✓</span>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#ffffff", fontFamily: "var(--font-body)" }}>
                  Remote ACKtive wins 6 out of 6.
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
                  Every category. Every time.
                </p>
              </div>
            </div>
            <a
              href="/book-a-call"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, #ffffff 0%, #a8e8f5 100%)`,
                color:      "#04090f",
              }}
            >
              Book a Free Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
