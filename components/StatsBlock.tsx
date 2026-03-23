"use client";

import { useRef, useEffect } from "react";
import { Users, Star, ShieldCheck, Globe, ArrowRight } from "lucide-react";

interface StatConfig {
  icon: typeof Users;
  value: string;
  label: string;
  detail: string;
  color: string;
  animateTo: number | null;
  suffix: string;
  prefix: string;
}

const stats: StatConfig[] = [
  {
    icon: Users,
    value: "30+",
    label: "Successful Placements",
    detail: "Professionals placed and thriving globally",
    color: "#57C5CF",
    animateTo: 30,
    suffix: "+",
    prefix: "",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Client Rating",
    detail: "Consistently rated by every client we've worked with",
    color: "#F5A623",
    animateTo: null,
    suffix: "",
    prefix: "",
  },
  {
    icon: ShieldCheck,
    value: "94%",
    label: "Retention After 12 Months",
    detail: "Our placements stay — vetted to last",
    color: "#4FFFB0",
    animateTo: 94,
    suffix: "%",
    prefix: "",
  },
  {
    icon: Globe,
    value: "20+",
    label: "Countries Covered",
    detail: "Global talent, carefully handpicked for your team",
    color: "#378B57",
    animateTo: 20,
    suffix: "+",
    prefix: "",
  },
];

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function StatsBlock() {
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          runCountUp();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function runCountUp() {
    const duration = 1500;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);

      stats.forEach((stat, i) => {
        const el = valueRefs.current[i];
        if (!el) return;
        if (stat.animateTo === null) {
          el.textContent = stat.value;
          return;
        }
        const current = Math.round(eased * stat.animateTo);
        el.textContent = `${stat.prefix}${current}${progress >= 1 ? stat.suffix : ""}`;
      });

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Ensure final values are exact
        stats.forEach((stat, i) => {
          const el = valueRefs.current[i];
          if (el) el.textContent = stat.value;
        });
      }
    }

    requestAnimationFrame(tick);
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 overflow-hidden relative"
      style={{ background: "linear-gradient(to right, #243B55, #141E30)" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(87,197,207,0.07) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Top ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(87,197,207,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#4FFFB0]/10 border border-[#4FFFB0]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FFFB0] animate-pulse" />
            <span className="text-sm font-bold text-[#4FFFB0] tracking-wide uppercase">
              Real Results
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Small Team.{" "}
            <span className="text-[#57C5CF]">Proven Results.</span>
          </h2>
          <p
            className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Every number here is a real client, a real hire, a real outcome.
            We&apos;re building our track record — one win at a time.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative text-center p-7 rounded-2xl transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: `1px solid ${stat.color}20`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${stat.color}50`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px ${stat.color}15, 0 0 0 1px ${stat.color}30`;
                  (e.currentTarget as HTMLDivElement).style.background = `rgba(255,255,255,0.05)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${stat.color}20`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 inset-x-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}70, transparent)`,
                  }}
                />

                {/* Bottom ambient glow on hover */}
                <div
                  className="absolute bottom-0 inset-x-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${stat.color}10 0%, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-13 h-13 rounded-2xl mb-5 mx-auto transition-transform duration-300 group-hover:scale-110"
                  style={{
                    width: "52px",
                    height: "52px",
                    backgroundColor: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`,
                    boxShadow: `0 0 16px ${stat.color}10`,
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: stat.color }}
                  />
                </div>

                {/* Animated number */}
                <div
                  className="text-5xl md:text-6xl font-black mb-2 leading-none tabular-nums transition-transform duration-300 group-hover:scale-105"
                  style={{
                    color: stat.color,
                    fontFamily: "var(--font-heading)",
                    textShadow: `0 0 30px ${stat.color}40`,
                  }}
                >
                  <span
                    ref={(el) => {
                      valueRefs.current[index] = el;
                    }}
                  >
                    {/* starts empty — filled by countUp or immediately if no animation */}
                    {stat.animateTo === null ? stat.value : "0"}
                  </span>
                </div>

                {/* Label */}
                <div
                  className="text-white font-bold text-sm md:text-base mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.label}
                </div>

                {/* Detail */}
                <div
                  className="text-white/55 text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {stat.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom trust line + CTA */}
        <div className="text-center mt-16">
          <p
            className="text-white/60 text-sm mb-7 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Started in 2024 — these aren&apos;t projections. They&apos;re our real track record, and we&apos;re just getting started.
          </p>
          <a
            href="/book-a-call"
            className="inline-flex items-center gap-2 btn-grad text-white font-bold px-8 py-3.5 rounded-full text-sm transition-transform duration-200 hover:scale-105"
          >
            Tell Us Your Success Story and Let Us Be Part of It
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
