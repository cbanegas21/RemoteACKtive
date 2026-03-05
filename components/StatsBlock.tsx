"use client";

import { Users, Star, ShieldCheck, Globe } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Successful Placements",
    detail: "Professionals placed and thriving globally",
    color: "#57C5CF",
  },
  {
    icon: Star,
    value: "5/5",
    label: "Client Rating",
    detail: "Perfect satisfaction score — every single engagement",
    color: "#F5A623",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Retention After 12 Months",
    detail: "Our placements stay — vetted to last",
    color: "#4FFFB0",
  },
  {
    icon: Globe,
    value: "18+",
    label: "Countries Covered",
    detail: "Global talent, carefully handpicked for your team",
    color: "#378B57",
  },
];

export default function StatsBlock() {
  return (
    <section className="py-24 overflow-hidden relative" style={{ background: 'linear-gradient(to right, #243B55, #141E30)' }}>
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(87,197,207,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(87,197,207,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#4FFFB0]/10 border border-[#4FFFB0]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FFFB0] animate-pulse" />
            <span className="text-sm font-bold text-[#4FFFB0] tracking-wide uppercase">
              Real Results
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Small Team.{" "}
            <span className="text-[#57C5CF]">Proven Results.</span>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto leading-relaxed">
            Every number here is a real client, a real hire, a real outcome.
            We&apos;re building our track record — one win at a time.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative text-center p-7 rounded-2xl border border-white/8 bg-[#0D1A2D] hover:border-[#57C5CF]/40 hover:bg-[#0F1F35] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#57C5CF]/5"
              >
                {/* Top glow */}
                <div
                  className="absolute top-0 inset-x-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}60, transparent)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 mx-auto transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: stat.color }}
                  />
                </div>

                {/* Number */}
                <div
                  className="text-4xl md:text-5xl font-extrabold mb-2 leading-none transition-transform duration-300 group-hover:scale-105"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-white font-bold text-sm md:text-base mb-2">
                  {stat.label}
                </div>

                {/* Detail */}
                <div className="text-white text-xs leading-relaxed">
                  {stat.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom trust line + CTA */}
        <div className="text-center mt-14">
          <p className="text-white text-base mb-6 font-semibold">
            Yep, we started in 2024 — and these aren&apos;t projections. They&apos;re our real track record, and we&apos;re just getting started.
          </p>
          <a
            href="/book-a-call"
            className="inline-flex items-center gap-2 btn-grad text-white font-bold px-8 py-3.5 rounded-full text-sm"
          >
            Tell Us Your Success Story and Let Us Be Part of It
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
