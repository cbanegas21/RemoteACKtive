"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Direction-aware hover logic (from design-inspo/cards/direction-aware-hover.tsx)
type Direction = "top" | "right" | "bottom" | "left";

function getDirection(
  e: React.MouseEvent<HTMLDivElement>,
  el: HTMLDivElement
): Direction {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  const angle = (Math.atan2(y, x) * 180) / Math.PI;
  if (angle > -45 && angle <= 45) return "right";
  if (angle > 45 && angle <= 135) return "bottom";
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

// ─── Step data
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

// ─── Single step card
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
      {/* ── Always-visible base layer ── */}
      <div className="h-full min-h-[300px] p-8 md:p-10 flex flex-col justify-between select-none">
        {/* Ghost number watermark */}
        <span
          aria-hidden="true"
          className="absolute -bottom-6 -right-3 font-black leading-none pointer-events-none"
          style={{ fontSize: "9rem", color: step.accent, opacity: 0.055 }}
        >
          {step.number}
        </span>

        {/* Step label */}
        <span
          className="text-[11px] font-black tracking-[0.28em] uppercase"
          style={{ color: step.accent + "70" }}
        >
          Step {step.number}
        </span>

        {/* Title + tagline */}
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
            {step.title}
          </h3>
          <p className="text-sm text-white/55">{step.tagline}</p>
        </div>
      </div>

      {/* ── Direction-aware hover overlay ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl p-8 md:p-10 flex flex-col justify-between"
            style={{
              background: `linear-gradient(135deg, rgba(4,9,15,0.96) 0%, rgba(9,15,13,0.94) 100%)`,
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
              <p className="text-sm text-white/80 leading-relaxed mb-5">
                {step.description}
              </p>
              <div className="flex flex-col gap-2.5">
                {step.bullets.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-white/70"
                  >
                    <span
                      className="mt-0.5 flex-shrink-0 text-base leading-none"
                      style={{ color: step.accent }}
                    >
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

// ─── Section
export default function HowItWorks() {
  const beamsCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = beamsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Beam = { x: number; y: number; width: number; speed: number; opacity: number; hue: number };
    const beams: Beam[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      width: Math.random() * 2 + 0.5,
      speed: Math.random() * 1 + 0.3,
      opacity: Math.random() * 0.12 + 0.03,
      hue: [180, 190, 165, 175][Math.floor(Math.random() * 4)],
    }));

    let rafId = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const b of beams) {
        b.y -= b.speed;
        if (b.y < -canvas.height * 0.5) {
          b.y = canvas.height + 100;
          b.x = Math.random() * canvas.width;
        }
        const grad = ctx.createLinearGradient(b.x, b.y, b.x, b.y - canvas.height * 0.6);
        grad.addColorStop(0, `hsla(${b.hue},80%,70%,0)`);
        grad.addColorStop(0.4, `hsla(${b.hue},80%,70%,${b.opacity})`);
        grad.addColorStop(1, `hsla(${b.hue},80%,70%,0)`);
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x, b.y - canvas.height * 0.6);
        ctx.strokeStyle = grad;
        ctx.lineWidth = b.width;
        ctx.stroke();
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: '#0b1117' }}
    >
      {/* Beams background */}
      <canvas
        ref={beamsCanvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
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
