"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useFormContext } from "./FormContext";

/* ─── Canvas Dot Grid ─── */
function CanvasDots({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const dotsRef = useRef<Array<{ x: number; y: number; opacity: number; target: number }>>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const spacing = 28;

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      dotsRef.current = [];
      for (let x = spacing / 2; x < canvas.width; x += spacing)
        for (let y = spacing / 2; y < canvas.height; y += spacing)
          dotsRef.current.push({ x, y, opacity: 0.1, target: 0.1 });
    };

    init();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const d of dotsRef.current) {
        if (mouseRef.current.active) {
          const dist = Math.sqrt((d.x - mouseRef.current.x) ** 2 + (d.y - mouseRef.current.y) ** 2);
          d.target = dist < 70 ? 0.8 : dist < 140 ? 0.3 : 0.1;
        } else {
          d.target = 0.1;
        }
        d.opacity += (d.target - d.opacity) * 0.12;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = d.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", init);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}

// Light accent (fills/gradients), dark accent (text/borders on white cards)
const TEAL_L = "#a8e8f5";
const MINT_L = "#b8fce8";
const TEAL_D = "#0a6b7a";
const MINT_D = "#0a7a55";

const tiers = [
  {
    accentLight: MINT_L,
    accentDark:  MINT_D,
    accentRgb:   "184,252,232",
    featured:    false,
    name:        "Remote Outsourcing",
    tagline:     "You pay their salary. Nothing else.",
    desc:        "We find, vet, place, and handle all payroll for your remote hire. You manage their work.",
    salaryHighlight: "Your only cost is their monthly salary.",
    highlight:   "No recruitment fee. No markup. Just talent.",
    features: [
      "Talent sourcing & screening",
      "Cultural & language assessment",
      "Full interview facilitation",
      "Payroll & payments handled by us",
      "Lifetime replacement guarantee",
      "Onboarding assistance",
    ],
    cta:      "Start Hiring",
    formType: "hire-only" as const,
  },
  {
    accentLight: TEAL_L,
    accentDark:  TEAL_D,
    accentRgb:   "168,232,245",
    featured:    true,
    name:        "Full Service Staffing",
    tagline:     "We run it. You grow.",
    desc:        "We hire and run your remote team end-to-end. HR, payroll, performance, compliance — all handled. You just get results.",
    highlight:   "Completely hands-free. Focus on your business.",
    features: [
      "Everything in Remote Outsourcing",
      "HR administration & compliance",
      "Ongoing performance management",
      "Employee wellness programs",
      "Dedicated account manager",
      "Enterprise security & tooling",
    ],
    cta:      "Get Full Service",
    formType: "hire-manage" as const,
  },
];

function useSpotlight(accentRgb: string) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(${accentRgb},0.06), transparent 50%), rgba(13,31,45,0.88)`;
  };
  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.background = "rgba(13,31,45,0.88)";
  };
  return { ref, handleMove, handleLeave };
}

function TierCard({ tier, delay }: { tier: (typeof tiers)[0]; delay: number }) {
  const { setFormType } = useFormContext();
  const spotlight = useSpotlight(tier.accentRgb);
  const [visible, setVisible] = useState(false);

  const bindRef = (node: HTMLDivElement | null) => {
    (spotlight.ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (node && !visible) {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
        { threshold: 0.15 }
      );
      obs.observe(node);
    }
  };

  const handleCta = () => {
    setFormType(tier.formType);
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={bindRef}
      className="relative rounded-2xl overflow-hidden flex flex-col cursor-default"
      style={{
        background: "rgba(13,31,45,0.88)",
        border: `1px solid rgba(${tier.accentRgb},${tier.featured ? "0.3" : "0.18"})`,
        boxShadow: tier.featured
          ? "0 4px 24px rgba(0,0,0,0.35)"
          : "0 2px 12px rgba(0,0,0,0.25)",
        transform: visible ? "translateY(0)" : "translateY(28px)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.65s ease ${delay}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
      }}
      onMouseMove={(e) => {
        spotlight.handleMove(e);
        (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${tier.accentRgb},${tier.featured ? "0.5" : "0.35"})`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 50px rgba(${tier.accentRgb},0.18)`;
      }}
      onMouseLeave={(e) => {
        spotlight.handleLeave();
        (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${tier.accentRgb},${tier.featured ? "0.3" : "0.18"})`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = tier.featured
          ? "0 4px 24px rgba(0,0,0,0.35)"
          : "0 2px 12px rgba(0,0,0,0.25)";
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background: tier.featured
            ? `linear-gradient(90deg, transparent, ${tier.accentLight}99, transparent)`
            : `linear-gradient(90deg, transparent, ${tier.accentLight}55, transparent)`,
        }}
      />

      {/* Canvas dot grid */}
      <CanvasDots color={tier.accentLight} />

      <div className="relative z-10 p-5 sm:p-8 lg:p-10 flex flex-col flex-1">

        {/* Name + tagline */}
        <div
          className="font-black leading-tight mb-2"
          style={{ fontSize: "clamp(24px,3vw,32px)", fontFamily: "var(--font-heading)", color: "#ffffff" }}
        >
          {tier.name}
        </div>
        <div className="font-bold text-base mb-5" style={{ color: tier.accentLight }}>
          {tier.tagline}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-3" style={{ color: "#ffffff" }}>
          {tier.desc}
        </p>

        {/* Salary highlight (first card only) */}
        {"salaryHighlight" in tier && (
          <div className="pl-3 py-1 mb-3" style={{ borderLeft: `2px solid ${tier.accentLight}` }}>
            <span className="text-sm font-bold" style={{ color: tier.accentLight }}>
              {(tier as typeof tier & { salaryHighlight: string }).salaryHighlight}
            </span>
          </div>
        )}

        {/* Main highlight callout */}
        <div className="pl-3 py-1 mb-6" style={{ borderLeft: `2px solid rgba(${tier.accentRgb},0.4)` }}>
          <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
            {tier.highlight}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: `rgba(${tier.accentRgb},0.12)` }} />

        {/* Features */}
        <ul className="space-y-3 flex-1 mb-8">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm">
              <Check
                className="flex-shrink-0 mt-0.5"
                style={{ color: tier.accentLight, width: 15, height: 15 }}
                strokeWidth={2.5}
              />
              <span style={{ color: "#ffffff" }}>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {tier.featured ? (
          <button
            onClick={handleCta}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 100%)",
              color: "#04090f",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            {tier.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleCta}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-sm transition-all duration-300"
            style={{
              border: `1.5px solid rgba(${tier.accentRgb},0.4)`,
              color: tier.accentLight,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = `rgba(${tier.accentRgb},0.06)`;
              (e.currentTarget as HTMLButtonElement).style.borderColor = `rgba(${tier.accentRgb},0.7)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.borderColor = `rgba(${tier.accentRgb},0.4)`;
            }}
          >
            {tier.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function ThreeTierServices() {
  return (
    <section
      id="services"
      className="relative overflow-hidden py-16"
      style={{ background: "linear-gradient(to right, #FFFDE4, #005AA7)" }}
    >
      <div className="container mx-auto px-6 max-w-4xl relative z-10">

        {/* Header */}
        <div className="mb-12">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] mb-6"
            style={{ color: "#000000", fontFamily: "var(--font-heading)" }}
          >
            Same talent.
            <span className="block w-fit px-3 py-1 mt-4" style={{ background: "rgba(13,31,45,0.88)" }}>
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(135deg, ${TEAL_L} 0%, ${MINT_L} 100%)` }}
              >
                Your level of support.
              </span>
            </span>
          </h2>

          <div
            className="inline-flex flex-col gap-1 pl-4 py-1 mb-2"
            style={{ borderLeft: `2px solid ${MINT_D}` }}
          >
            <span className="font-bold text-lg leading-snug" style={{ color: "#000000" }}>
              Remote Outsourcing saves you up to 70% vs a US hire.
            </span>
            <span className="text-sm font-medium" style={{ color: "rgba(0,0,0,0.72)" }}>
              Full Service adds full management on top — still a fraction of building a local team.
            </span>
          </div>
        </div>

        {/* 2-column cards */}
        <div className="grid md:grid-cols-2 gap-5 items-stretch">
          {tiers.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} delay={i * 120} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8">
          <p className="text-sm" style={{ color: "rgba(0,0,0,0.72)" }}>
            Still not sure?{" "}
            <a
              href="/book-a-call"
              className="font-semibold transition-colors"
              style={{ color: TEAL_D }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = MINT_D)}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = TEAL_D)}
            >
              Book a free 30-min call and we&apos;ll figure it out together →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
