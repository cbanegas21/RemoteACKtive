"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const TEAL     = "#a8e8f5";
const MINT     = "#b8fce8";
const TEAL_RGB = "168,232,245";
const MINT_RGB = "184,252,232";

/* ─── Mini savings calculator ─── */
const roles = [
  { label: "Software Dev",  us: 110000, remote: 32000 },
  { label: "Designer",      us: 85000,  remote: 26000 },
  { label: "Sales Rep",     us: 75000,  remote: 22000 },
  { label: "Virtual Asst.", us: 55000,  remote: 14000 },
  { label: "Data Analyst",  us: 90000,  remote: 28000 },
];

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function SavingsCalc() {
  const [selected, setSelected] = useState(0);
  const role = roles[selected];
  const saved = role.us - role.remote;
  const pct = Math.round((saved / role.us) * 100);

  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-2 mb-5">
        {roles.map((r, i) => (
          <button
            key={r.label}
            onClick={() => setSelected(i)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200"
            style={
              i === selected
                ? { background: TEAL, color: "#04090f" }
                : {
                    background: `rgba(${TEAL_RGB},0.1)`,
                    border: `1px solid rgba(${TEAL_RGB},0.3)`,
                    color: TEAL,
                  }
            }
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>
            <span>US Hire / year</span>
            <span className="font-semibold text-white">{fmt(role.us)}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="h-full rounded-full" style={{ width: "100%", background: "rgba(255,255,255,0.18)" }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>
            <span>Remote ACKtive / year</span>
            <span className="font-semibold" style={{ color: MINT }}>{fmt(role.remote)}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(role.remote / role.us) * 100}%`,
                background: `linear-gradient(90deg, ${TEAL}, ${MINT})`,
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-between rounded-xl px-4 py-3"
        style={{ background: `rgba(${TEAL_RGB},0.07)`, border: `1px solid rgba(${TEAL_RGB},0.2)` }}
      >
        <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>You save per hire / year</span>
        <span className="text-lg font-black" style={{ color: MINT, fontFamily: "var(--font-heading)" }}>
          {fmt(saved)}{" "}
          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>({pct}%)</span>
        </span>
      </div>
    </div>
  );
}

/* ─── Spotlight glow ─── */
function useSpotlight(accentRgb: string) {
  const ref = useRef<HTMLDivElement>(null);
  const dark = `rgba(255,255,255,0.04)`;
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(${accentRgb},0.08), transparent 50%), rgba(255,255,255,0.04)`;
  };
  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.background = dark;
  };
  return { ref, handleMove, handleLeave };
}

/* ─── Supporting cards ─── */
const supporting = [
  {
    stat: "Top 5%",
    label: "Talent Quality",
    sub: "Rigorously Vetted",
    accent: MINT,
    accentRgb: MINT_RGB,
    desc: "6-step vetting: skills test, English, background check, culture-fit interview, and live evaluation.",
    points: ["Background-screened", "Culture-matched", "Skill-tested"],
  },
  {
    stat: "3–10",
    label: "Days to Hire",
    sub: "Fast Shortlist",
    accent: TEAL,
    accentRgb: TEAL_RGB,
    desc: "Skip months of sourcing. Your shortlist of pre-vetted candidates arrives in days, not quarters.",
    points: ["Pre-vetted pool", "Same-week starts"],
  },
  {
    stat: "20+",
    label: "Countries",
    sub: "Global Reach",
    accent: MINT,
    accentRgb: MINT_RGB,
    desc: "Time-zone-aligned talent from the richest LATAM and global markets — ready to join your team.",
    points: ["Multi-timezone", "30+ placements"],
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function SmallCard({ card, delay }: { card: (typeof supporting)[0]; delay: number }) {
  const reveal = useReveal();
  const spotlight = useSpotlight(card.accentRgb);

  const bindRef = (node: HTMLDivElement | null) => {
    (reveal.ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    (spotlight.ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  return (
    <div
      ref={bindRef}
      className="relative rounded-2xl overflow-hidden flex flex-col p-6 lg:p-7 cursor-default"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid rgba(${card.accentRgb},0.2)`,
        boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
        transform: reveal.visible ? "translateY(0)" : "translateY(20px)",
        opacity: reveal.visible ? 1 : 0,
        transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.6s ease ${delay}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
      }}
      onMouseMove={(e) => {
        spotlight.handleMove(e);
        (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${card.accentRgb},0.45)`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 32px rgba(${card.accentRgb},0.15)`;
      }}
      onMouseLeave={(e) => {
        spotlight.handleLeave();
        (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${card.accentRgb},0.2)`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 20px rgba(0,0,0,0.3)";
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${card.accent}88, transparent)` }} />

      <div
        className="font-black leading-none mb-1"
        style={{ fontSize: "clamp(34px,4.5vw,48px)", color: card.accent, fontFamily: "var(--font-heading)" }}
      >
        {card.stat}
      </div>
      <div className="font-bold text-base mb-0.5 text-white">{card.label}</div>
      <div className="text-xs font-semibold mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>{card.sub}</div>

      <div className="h-px mb-4" style={{ background: `rgba(${card.accentRgb},0.2)` }} />

      <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>{card.desc}</p>

      <ul className="space-y-1.5 mt-auto">
        {card.points.map((p) => (
          <li key={p} className="flex items-center gap-2 text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: card.accent }} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhyChooseUs() {
  const heroReveal = useReveal();
  const heroSpotlight = useSpotlight(TEAL_RGB);

  const bindHeroRef = (node: HTMLDivElement | null) => {
    (heroReveal.ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    (heroSpotlight.ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  return (
    <section
      id="why"
      className="relative overflow-hidden py-16"
      style={{ background: "#04090f" }}
    >
      {/* Gradient blobs background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            filter: 'blur(60px)',
            ['--color-1' as string]: '87,197,207',
            ['--color-2' as string]: '79,255,176',
            ['--color-3' as string]: '168,223,240',
            ['--color-4' as string]: '57,139,87',
            ['--color-5' as string]: '11,23,39',
          } as React.CSSProperties}
        >
          <div className="absolute animate-first opacity-70" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-1),0.5) 0, rgba(var(--color-1),0) 50%) no-repeat' }} />
          <div className="absolute animate-second opacity-70" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-2),0.5) 0, rgba(var(--color-2),0) 50%) no-repeat', transformOrigin: 'calc(50% - 300px) center' }} />
          <div className="absolute animate-third opacity-70" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-3),0.4) 0, rgba(var(--color-3),0) 50%) no-repeat', transformOrigin: 'calc(50% + 300px) center' }} />
          <div className="absolute animate-fourth opacity-60" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-4),0.4) 0, rgba(var(--color-4),0) 50%) no-repeat', transformOrigin: 'calc(50% - 150px) center' }} />
          <div className="absolute animate-fifth opacity-50" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-5),0.4) 0, rgba(var(--color-5),0) 50%) no-repeat', transformOrigin: 'calc(50% - 600px) calc(50% + 600px)' }} />
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Header */}
        <div className="mb-10">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] mb-4 text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Built different.{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${TEAL} 0%, ${MINT} 100%)` }}
            >
              Priced fairly.
            </span>
          </h2>
          <p className="text-lg max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            Four reasons fast-growing companies choose Remote ACKtive over agencies, job boards, and freelance platforms.
          </p>
        </div>

        {/* ── HERO CARD ── */}
        <div
          ref={bindHeroRef}
          className="relative rounded-2xl overflow-hidden mb-4 cursor-default"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid rgba(${TEAL_RGB},0.2)`,
            boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
            transform: heroReveal.visible ? "translateY(0)" : "translateY(24px)",
            opacity: heroReveal.visible ? 1 : 0,
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseMove={(e) => {
            heroSpotlight.handleMove(e);
            (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${TEAL_RGB},0.4)`;
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 40px rgba(${TEAL_RGB},0.12)`;
          }}
          onMouseLeave={(e) => {
            heroSpotlight.handleLeave();
            (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${TEAL_RGB},0.2)`;
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 20px rgba(0,0,0,0.4)";
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${TEAL}88, ${MINT}55, transparent)` }} />

          {/* Ghost number */}
          <div
            className="absolute bottom-0 right-0 font-black select-none pointer-events-none"
            style={{
              fontSize: "clamp(90px, 14vw, 180px)",
              color: `rgba(${TEAL_RGB},0.06)`,
              fontFamily: "var(--font-heading)",
              lineHeight: 0.8,
            }}
            aria-hidden="true"
          >
            70
          </div>

          <div className="relative z-10 grid md:grid-cols-2">
            {/* Left — stat + copy */}
            <div className="p-7 lg:p-10 flex flex-col justify-center border-b md:border-b-0 md:border-r" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div
                className="font-black leading-none mb-2"
                style={{ fontSize: "clamp(40px, 6vw, 64px)", color: TEAL, fontFamily: "var(--font-heading)" }}
              >
                Up to 70%
              </div>
              <div className="font-bold text-lg mb-1 text-white">Average Cost Savings</div>
              <div className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>vs equivalent US hires</div>

              <div className="h-px mb-5" style={{ background: `rgba(${TEAL_RGB},0.2)` }} />

              <p className="text-sm leading-relaxed max-w-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                Replace $80–120k/yr US roles with top-tier remote professionals at a fraction of the cost.
              </p>

              <div className="mt-4 pl-3 py-0.5" style={{ borderLeft: `2px solid ${MINT}` }}>
                <span className="font-bold text-sm" style={{ color: MINT }}>
                  Without sacrificing a single bit of quality.
                </span>
              </div>
            </div>

            {/* Right — calculator */}
            <div className="p-7 lg:p-10 flex flex-col justify-center">
              <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                See your savings
              </div>
              <div className="font-bold text-base mb-0.5 text-white">Pick a role to compare</div>
              <SavingsCalc />
            </div>
          </div>
        </div>

        {/* ── 3 SUPPORTING CARDS ── */}
        <div className="grid sm:grid-cols-3 gap-4">
          {supporting.map((card, i) => (
            <SmallCard key={card.label} card={card} delay={i * 120} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/book-a-call"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 50%, #b8fce8 100%)",
              color: "#04090f",
            }}
          >
            Start Saving Today
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
