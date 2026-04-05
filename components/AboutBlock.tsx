"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HandwritingText } from "@/components/ui/HandwritingText";
import Link from "next/link";

const TEAL      = "#a8e8f5";
const MINT      = "#b8fce8";
const TEAL_RGB  = "168,232,245";
const MINT_RGB  = "184,252,232";
const TEAL_TEXT = "#a8e8f5";
const MINT_TEXT = "#b8fce8";

// ─── Founders / Values
const founders = [
  { initials: "A", name: "Andre" },
  { initials: "C", name: "Carlos" },
  { initials: "K", name: "Kevin" },
];

const values = [
  "Transparency", "Excellence", "Speed",
  "Partnership", "Growth", "Trust",
  "Results", "People", "Impact",
];

const valueAccents  = [TEAL_TEXT, MINT_TEXT, TEAL_TEXT, MINT_TEXT, TEAL_TEXT, MINT_TEXT, TEAL_TEXT, MINT_TEXT, TEAL_TEXT];
const valueSizes    = [
  "text-3xl md:text-4xl",
  "text-xl md:text-2xl",
  "text-4xl md:text-5xl",
  "text-2xl md:text-3xl",
  "text-5xl md:text-6xl",
  "text-xl md:text-2xl",
  "text-3xl md:text-4xl",
  "text-2xl md:text-3xl",
  "text-4xl md:text-5xl",
];
const valueOpacity  = ["0.9", "0.5", "0.7", "0.9", "0.6", "0.8", "0.5", "0.9", "0.7"];

// ─── Process steps
const STEPS = [
  {
    number: "01",
    title: "Tell Us Your Needs",
    tagline: "Free discovery call. No commitment.",
    description:
      "We start with a free discovery call to understand exactly what you're looking for — the role, the skills, the team culture, and the timeline. The more context you give us, the better we match.",
    bullets: [
      "Define role requirements and must-have skills",
      "Specify team size and management structure",
      "Share culture fit and communication preferences",
    ],
    accent: "#a8e8f5",
  },
  {
    number: "02",
    title: "We Find Your Team",
    tagline: "Top 5% — vetted, tested, ready.",
    description:
      "Our recruiters tap into a vetted LATAM talent network across 20+ countries. Every candidate goes through a rigorous 6-step screening — English fluency, technical skills, timezone alignment, and work ethic.",
    bullets: [
      "6-step vetting — only top 5% advance",
      "Sourced from 20+ countries across LATAM",
      "Shortlist delivered in 3–10 business days",
    ],
    accent: "#b8fce8",
  },
  {
    number: "03",
    title: "You Meet Candidates",
    tagline: "Interview on your schedule. You choose.",
    description:
      "You interview our shortlisted candidates directly. Run a test project if you'd like. We stay in the loop to help you evaluate fit — then you make the final call with full confidence.",
    bullets: [
      "Live interviews on your schedule",
      "Optional paid test projects to validate skills",
      "You make the final hiring decision",
    ],
    accent: "#a8e8f5",
  },
  {
    number: "04",
    title: "They Start Working",
    tagline: "Productive from day one.",
    description:
      "We handle contracts, onboarding paperwork, and setup so your new team member hits the ground running. You get ongoing support from us for the life of the placement.",
    bullets: [
      "Contracts and compliance handled end-to-end",
      "Structured first-week onboarding plan",
      "Ongoing support + replacement guarantee",
    ],
    accent: "#b8fce8",
  },
] as const;

// ─── Direction-aware hover
type Direction = "top" | "right" | "bottom" | "left";

function getDirection(e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement): Direction {
  const rect  = el.getBoundingClientRect();
  const x     = e.clientX - rect.left - rect.width / 2;
  const y     = e.clientY - rect.top - rect.height / 2;
  const angle = (Math.atan2(y, x) * 180) / Math.PI;
  if (angle > -45 && angle <= 45)  return "right";
  if (angle > 45 && angle <= 135)  return "bottom";
  if (angle > -135 && angle <= -45) return "top";
  return "left";
}

function getSlideOrigin(direction: Direction): { x: number; y: number } {
  switch (direction) {
    case "top":    return { x: 0,    y: -100 };
    case "bottom": return { x: 0,    y: 100  };
    case "left":   return { x: -100, y: 0    };
    case "right":  return { x: 100,  y: 0    };
  }
}

// ─── Step card with direction-aware hover
function StepCard({ step }: { step: (typeof STEPS)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [dir, setDir] = useState<Direction>("top");

  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    setDir(getDirection(e, cardRef.current));
    setHovered(true);
  };

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    setDir(getDirection(e, cardRef.current));
    setHovered(false);
  };

  const origin = getSlideOrigin(dir);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl min-h-[300px] cursor-default"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${step.accent}18`,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Always-visible base layer */}
      <div className="h-full min-h-[300px] p-8 md:p-10 flex flex-col justify-between select-none">
        <span
          aria-hidden="true"
          className="absolute -bottom-6 -right-3 font-black leading-none pointer-events-none"
          style={{ fontSize: "9rem", color: step.accent, opacity: 0.055 }}
        >
          {step.number}
        </span>

        <span
          className="text-[11px] font-black tracking-[0.28em] uppercase"
          style={{ color: step.accent + "70" }}
        >
          Step {step.number}
        </span>

        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
            {step.title}
          </h3>
          <p className="text-sm text-white/55">{step.tagline}</p>
        </div>
      </div>

      {/* Direction-aware hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl p-8 md:p-10 flex flex-col justify-between"
            style={{
              background: "linear-gradient(135deg, rgba(4,9,15,0.96) 0%, rgba(9,15,13,0.94) 100%)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: `1px solid ${step.accent}35`,
            }}
            initial={{ x: `${origin.x}%`, y: `${origin.y}%`, opacity: 0 }}
            animate={{ x: "0%", y: "0%", opacity: 1 }}
            exit={{ x: `${origin.x}%`, y: `${origin.y}%`, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span
              className="text-[11px] font-black tracking-[0.28em] uppercase"
              style={{ color: step.accent }}
            >
              Step {step.number}
            </span>

            <div>
              <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-5">{step.description}</p>
              <div className="flex flex-col gap-2.5">
                {step.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="mt-0.5 flex-shrink-0 text-base leading-none" style={{ color: step.accent }}>
                      ✓
                    </span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AboutBlock() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ background: "#04090f" }}
    >
      {/* ─── Gradient blobs background ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            filter: "blur(60px)",
            ["--color-1" as string]: "87,197,207",
            ["--color-2" as string]: "79,255,176",
            ["--color-3" as string]: "168,223,240",
            ["--color-4" as string]: "57,139,87",
            ["--color-5" as string]: "11,23,39",
          } as React.CSSProperties}
        >
          <div className="absolute animate-first opacity-70" style={{ top: "calc(50% - 300px)", left: "calc(50% - 300px)", width: 600, height: 600, background: "radial-gradient(circle at center, rgba(var(--color-1),0.5) 0, rgba(var(--color-1),0) 50%) no-repeat" }} />
          <div className="absolute animate-second opacity-70" style={{ top: "calc(50% - 300px)", left: "calc(50% - 300px)", width: 600, height: 600, background: "radial-gradient(circle at center, rgba(var(--color-2),0.5) 0, rgba(var(--color-2),0) 50%) no-repeat", transformOrigin: "calc(50% - 300px) center" }} />
          <div className="absolute animate-third opacity-70" style={{ top: "calc(50% - 300px)", left: "calc(50% - 300px)", width: 600, height: 600, background: "radial-gradient(circle at center, rgba(var(--color-3),0.4) 0, rgba(var(--color-3),0) 50%) no-repeat", transformOrigin: "calc(50% + 300px) center" }} />
          <div className="absolute animate-fourth opacity-60" style={{ top: "calc(50% - 300px)", left: "calc(50% - 300px)", width: 600, height: 600, background: "radial-gradient(circle at center, rgba(var(--color-4),0.4) 0, rgba(var(--color-4),0) 50%) no-repeat", transformOrigin: "calc(50% - 150px) center" }} />
          <div className="absolute animate-fifth opacity-50" style={{ top: "calc(50% - 300px)", left: "calc(50% - 300px)", width: 600, height: 600, background: "radial-gradient(circle at center, rgba(var(--color-5),0.4) 0, rgba(var(--color-5),0) 50%) no-repeat", transformOrigin: "calc(50% - 600px) calc(50% + 600px)" }} />
        </div>
      </div>

      {/* ══ STORY SECTION ══ */}
      <div className="relative z-10 container mx-auto px-6 max-w-6xl py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — Story */}
          <div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-7"
              style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}
            >
              Built by founders who{" "}
              <br className="hidden sm:block" />
              <HandwritingText color={TEAL_TEXT} rx={10} delay={0.4}>
                felt the pain.
              </HandwritingText>
            </h2>

            {/* Founder avatars */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex -space-x-3">
                {founders.map((f, i) => (
                  <div
                    key={f.initials}
                    className="h-11 w-11 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${TEAL}, ${MINT})`,
                      color:      "#04090f",
                      zIndex:     founders.length - i,
                      boxShadow:  "0 0 0 2px #04090f",
                      fontFamily: "var(--font-heading)",
                    }}
                    title={f.name}
                  >
                    {f.initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#ffffff", fontFamily: "var(--font-body)" }}>
                  Andre, Carlos &amp; Kevin
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
                  Co-Founders, Remote ACKtive
                </p>
              </div>
            </div>

            <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>
              Andre, Carlos, and Kevin spent years building distributed teams before
              founding Remote ACKtive. They knew the frustration firsthand —{" "}
              <span className="font-bold" style={{ color: TEAL_TEXT }}>
                overpriced agencies, hiring cycles that dragged for months,
              </span>{" "}
              and candidates who looked great on paper but disappeared after week two.
            </p>

            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>
              So they built what they wished existed: a lean, rigorous staffing partner
              that treats every hire like a long-term investment. Today Remote ACKtive
              connects businesses worldwide with{" "}
              <span className="font-bold" style={{ color: MINT_TEXT }}>
                pre-vetted, high-performing remote professionals
              </span>{" "}
              — in under two weeks.
            </p>

            {/* Stats strip */}
            <div
              className="flex gap-8 mt-10 pt-8"
              style={{ borderTop: `1px solid rgba(${TEAL_RGB},0.25)` }}
            >
              {[
                { value: "30+",   label: "Placements",    color: TEAL_TEXT },
                { value: "94%",   label: "Retention Rate", color: MINT_TEXT },
                { value: "4.9/5", label: "Client Rating",  color: TEAL_TEXT },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-3xl font-black leading-none tabular-nums"
                    style={{ color: s.color, fontFamily: "var(--font-heading)" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Mission / Vision + Values */}
          <div className="flex flex-col gap-10">

            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(${TEAL_RGB},0.3)`,
              }}
            >
              <p
                className="text-[10px] font-black tracking-[0.35em] uppercase mb-3"
                style={{ color: TEAL_TEXT, fontFamily: "var(--font-body)" }}
              >
                Our Mission
              </p>
              <div className="pl-4" style={{ borderLeft: `2px solid ${TEAL}` }}>
                <p
                  className="text-lg md:text-xl font-bold leading-snug"
                  style={{ color: "#ffffff", fontFamily: "var(--font-body)" }}
                >
                  To make world-class remote talent accessible, affordable, and
                  effortless — so great companies can focus on what they do best.
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(${MINT_RGB},0.35)`,
              }}
            >
              <p
                className="text-[10px] font-black tracking-[0.35em] uppercase mb-3"
                style={{ color: MINT_TEXT, fontFamily: "var(--font-body)" }}
              >
                Our Vision
              </p>
              <div className="pl-4" style={{ borderLeft: `2px solid ${MINT}` }}>
                <p
                  className="text-lg md:text-xl font-bold leading-snug"
                  style={{ color: "#ffffff", fontFamily: "var(--font-body)" }}
                >
                  A world where every company can harness global talent — unrestricted
                  by geography, time zones, or budget.
                </p>
              </div>
            </div>

            <div className="h-px" style={{ background: `rgba(${TEAL_RGB},0.25)` }} />

            {/* Word cloud */}
            <div>
              <p
                className="text-[10px] font-black tracking-[0.35em] uppercase mb-6"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}
              >
                Core Values
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 items-baseline">
                {values.map((v, i) => (
                  <span
                    key={v}
                    className={`font-black leading-none ${valueSizes[i]}`}
                    style={{
                      color:      valueAccents[i],
                      opacity:    valueOpacity[i],
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Section divider ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* ══ HOW IT WORKS SECTION ══ */}
      <div id="how-it-works" className="relative z-10 container mx-auto px-6 max-w-6xl py-20 md:py-28">

        {/* Header */}
        <div className="mb-14 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-5">
            Four steps.{" "}
            <span
              className="block"
              style={{
                backgroundImage: "linear-gradient(90deg, #a8e8f5, #b8fce8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              One great hire.
            </span>
          </h2>
          <p className="text-white/45 text-base md:text-lg max-w-lg leading-relaxed">
            Most clients are up and running with their new hire in under two weeks. Hover each step to see what happens.
          </p>
        </div>

        {/* 2 × 2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/book-a-call"
            className="rounded-full px-8 py-3.5 font-bold text-sm inline-block text-[#04090f] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 50%, #b8fce8 100%)" }}
          >
            Start the Process →
          </Link>
          <span className="text-white/25 text-sm">No commitment required</span>
        </div>

      </div>
    </section>
  );
}
