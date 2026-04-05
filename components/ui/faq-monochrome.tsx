"use client";
// Saved from design-inspo — used as reference for card glow + aurora pattern in FAQ.tsx
// Original: faq-monocrhome.tsx

import React, { useEffect, useMemo, useState } from "react";

const INTRO_STYLE_ID = "faq1-animations";

const faqs = [
  {
    question: "How do you decide which problems to solve first?",
    answer:
      "We map opportunities across impact, feasibility, and effort, then prototype the riskiest assumption within 72 hours to make sure we are shipping momentum, not guesswork.",
    meta: "Discovery",
  },
  {
    question: "What does collaboration look like once we start?",
    answer:
      "A dedicated trio of design, engineering, and strategy meets daily in a shared async dashboard. Decisions are recorded in-line, so the team, stakeholders, and audit trail stay perfectly aligned.",
    meta: "Collaboration",
  },
];

const palettes = {
  dark: {
    surface: "bg-neutral-950 text-neutral-100",
    panel: "bg-neutral-900/50",
    border: "border-white/10",
    heading: "text-white",
    muted: "text-neutral-400",
    iconRing: "border-white/20",
    iconSurface: "bg-white/5",
    icon: "text-white",
    toggle: "border-white/20 text-white",
    toggleSurface: "bg-white/10",
    glow: "rgba(255, 255, 255, 0.08)",
    aurora: "radial-gradient(ellipse 50% 100% at 10% 0%, rgba(226, 232, 240, 0.15), transparent 65%), #000000",
    shadow: "shadow-[0_36px_140px_-60px_rgba(10,10,10,0.95)]",
    overlay: "linear-gradient(130deg, rgba(255,255,255,0.04) 0%, transparent 65%)",
  },
};

export function FAQ1() {
  const [introReady, setIntroReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const palette = palettes.dark;

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(INTRO_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = INTRO_STYLE_ID;
    style.innerHTML = `
      @keyframes faq1-fade-up {
        0% { transform: translate3d(0, 20px, 0); opacity: 0; filter: blur(6px); }
        60% { filter: blur(0); }
        100% { transform: translate3d(0, 0, 0); opacity: 1; filter: blur(0); }
      }
      .faq1-fade { opacity: 0; transform: translate3d(0, 24px, 0); filter: blur(12px); transition: opacity 700ms ease, transform 700ms ease, filter 700ms ease; }
      .faq1-fade--ready { animation: faq1-fade-up 860ms cubic-bezier(0.22, 0.68, 0, 1) forwards; }
    `;
    document.head.appendChild(style);
    return () => { if (style.parentNode) style.remove(); };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") { setIntroReady(true); return; }
    const frame = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") { setHasEntered(true); return; }
    let timeout: number;
    const onLoad = () => { timeout = window.setTimeout(() => setHasEntered(true), 120) as unknown as number; };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => { window.removeEventListener("load", onLoad); window.clearTimeout(timeout); };
  }, []);

  const setCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--faq-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--faq-y", `${event.clientY - rect.top}px`);
  };

  const clearCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    event.currentTarget.style.removeProperty("--faq-x");
    event.currentTarget.style.removeProperty("--faq-y");
  };

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-colors duration-700 ${palette.surface}`}>
      <div className="absolute inset-0 z-0" style={{ background: palette.aurora }} />
      <section className={`relative z-10 mx-auto flex max-w-4xl flex-col gap-12 px-6 py-24 ${hasEntered ? "faq1-fade--ready" : "faq1-fade"}`}>
        <ul className="space-y-4">
          {faqs.map((item, index) => {
            const open = activeIndex === index;
            return (
              <li
                key={item.question}
                className={`group relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500 ${palette.border} ${palette.panel} ${palette.shadow}`}
                onMouseMove={setCardGlow}
                onMouseLeave={clearCardGlow}
              >
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  style={{ background: `radial-gradient(240px circle at var(--faq-x, 50%) var(--faq-y, 50%), ${palette.glow}, transparent 70%)` }}
                />
                <button
                  type="button"
                  onClick={() => setActiveIndex(prev => prev === index ? -1 : index)}
                  className="relative flex w-full items-start gap-6 px-8 py-7 text-left"
                >
                  <span className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${palette.iconRing} ${palette.iconSurface}`}>
                    <svg className={`h-5 w-5 transition-transform duration-500 ${palette.icon} ${open ? "rotate-45" : ""}`} viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div className="flex flex-1 flex-col gap-4">
                    <h2 className={`text-lg font-medium leading-tight ${palette.heading}`}>{item.question}</h2>
                    <div className={`overflow-hidden text-sm leading-relaxed transition-[max-height] duration-500 ease-out ${open ? "max-h-64" : "max-h-0"} ${palette.muted}`}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default FAQ1;
