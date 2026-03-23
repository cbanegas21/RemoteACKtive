"use client";
import { ShieldCheck, RefreshCw, Clock, ArrowRight, Award } from "lucide-react";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Free replacement, guaranteed",
    description:
      "If anyone on your remote team underperforms, we find you a better-matched professional at zero extra charge.",
    accentColor: "#57C5CF",
    glowColor: "rgba(87,197,207,0.18)",
    borderColor: "rgba(87,197,207,0.22)",
    hoverBorderColor: "rgba(87,197,207,0.5)",
    iconBg: "rgba(87,197,207,0.12)",
    number: "01",
  },
  {
    icon: RefreshCw,
    title: "Complimentary transition week",
    description:
      "You get one full week of service at no cost while we onboard your replacement — no gaps, no downtime.",
    accentColor: "#4FFFB0",
    glowColor: "rgba(79,255,176,0.18)",
    borderColor: "rgba(79,255,176,0.22)",
    hoverBorderColor: "rgba(79,255,176,0.5)",
    iconBg: "rgba(79,255,176,0.12)",
    number: "02",
  },
  {
    icon: Clock,
    title: "Lifetime commitment",
    description:
      "This promise covers every hire, from your first team member to your tenth — for the entire life of our partnership.",
    accentColor: "#57C5CF",
    glowColor: "rgba(87,197,207,0.18)",
    borderColor: "rgba(87,197,207,0.22)",
    hoverBorderColor: "rgba(87,197,207,0.5)",
    iconBg: "rgba(87,197,207,0.12)",
    number: "03",
  },
];

export default function GuaranteeSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to right, #2C5364, #203A43, #0F2027)" }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(87,197,207,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-[#57C5CF]" />
            <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
              Our Promise
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            100% Satisfaction,{" "}
            <span className="text-[#4FFFB0]">No Exceptions</span>
          </h2>
          <p
            className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We stand behind every placement. If it&apos;s not right, we make it
            right — immediately and at no cost to you.
          </p>
        </div>

        {/* Guarantee cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {guarantees.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: `1px solid ${g.borderColor}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${g.hoverBorderColor}`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px ${g.glowColor}, 0 0 0 1px ${g.hoverBorderColor}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${g.borderColor}`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Top accent line */}
                <div
                  className="h-0.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${g.accentColor} 0%, transparent 80%)`,
                  }}
                />

                <div className="p-8">
                  {/* Step number — ghost */}
                  <div
                    className="absolute top-6 right-7 text-6xl font-black leading-none select-none pointer-events-none"
                    style={{ color: `${g.accentColor}08` }}
                  >
                    {g.number}
                  </div>

                  {/* Icon badge */}
                  <div
                    className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: g.iconBg,
                      border: `1px solid ${g.borderColor}`,
                      boxShadow: `0 0 20px ${g.glowColor}`,
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: g.accentColor }}
                    />
                    {/* Inner glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${g.accentColor}20 0%, transparent 70%)`,
                      }}
                    />
                  </div>

                  <h3
                    className="text-white font-bold text-xl mb-3 leading-snug"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {g.title}
                  </h3>
                  <p
                    className="text-white/70 text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {g.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lifetime Guarantee seal strip */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(79,255,176,0.2)",
          }}
        >
          {/* Subtle mint glow behind strip */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 100% at 10% 50%, rgba(79,255,176,0.06) 0%, transparent 70%)",
            }}
          />
          {/* Top accent */}
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(79,255,176,0.6) 0%, rgba(87,197,207,0.3) 50%, transparent 100%)",
            }}
          />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7">
            {/* Seal + text */}
            <div className="flex items-center gap-5">
              {/* Warranty seal graphic */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(79,255,176,0.15) 0%, rgba(79,255,176,0.04) 70%)",
                    border: "2px solid rgba(79,255,176,0.4)",
                    boxShadow: "0 0 24px rgba(79,255,176,0.2)",
                  }}
                >
                  <Award className="w-7 h-7 text-[#4FFFB0]" />
                </div>
                {/* Outer ring pulse */}
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    border: "1px solid rgba(79,255,176,0.2)",
                    animationDuration: "3s",
                  }}
                />
              </div>

              <div>
                <p
                  className="text-white font-extrabold text-xl leading-tight mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Lifetime Guarantee
                </p>
                <p
                  className="text-white/65 text-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Every hire, every contract, covered —{" "}
                  <span className="text-[#4FFFB0] font-semibold">forever.</span>
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="/book-a-call"
              className="inline-flex items-center gap-2 btn-grad text-white font-bold px-7 py-3.5 rounded-full text-sm whitespace-nowrap flex-shrink-0 transition-transform duration-200 hover:scale-105"
            >
              Claim Your Risk-Free Hire
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
