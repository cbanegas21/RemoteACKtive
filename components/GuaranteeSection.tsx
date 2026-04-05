"use client";

import { SpotlightCard } from "@/components/ui/SpotlightCard";

const TEAL     = "#a8e8f5";
const MINT     = "#b8fce8";
const TEAL_RGB = "168,232,245";
const MINT_RGB = "184,252,232";

const guarantees = [
  {
    stat: "60-Day",
    title: "Replacement Guarantee",
    desc: "Doesn't work out within 60 days? We replace them at zero extra cost. No questions, no delays.",
    accent: MINT,
    accentRgb: MINT_RGB,
  },
  {
    stat: "$0",
    title: "Zero Setup Fees",
    desc: "No placement fees, no retainers, no lock-in. You only pay the talent's salary — transparent from day one.",
    accent: TEAL,
    accentRgb: TEAL_RGB,
  },
  {
    stat: "Named",
    title: "Dedicated Support",
    desc: "Your own account manager assigned before day one — guiding onboarding and check-ins for life.",
    accent: MINT,
    accentRgb: MINT_RGB,
  },
];

export default function GuaranteeSection() {
  return (
    <section
      id="guarantee"
      className="py-14 relative overflow-hidden"
      style={{ background: "linear-gradient(to right, #FFFDE4, #005AA7)" }}
    >
      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* Header */}
        <div className="mb-10">
          <h2
            className="text-3xl md:text-4xl font-black leading-tight mb-2"
            style={{ fontFamily: "var(--font-heading)", color: "#000000" }}
          >
            Every hire is{" "}
            <span className="inline rounded-md px-2 py-1" style={{ background: "rgba(13,31,45,0.88)" }}>
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(135deg, ${TEAL} 0%, ${MINT} 100%)` }}
              >
                backed by us.
              </span>
            </span>
          </h2>
          <p className="text-sm max-w-sm" style={{ color: "rgba(0,0,0,0.72)" }}>
            Three ironclad commitments. No fine print, no expiration.
          </p>
        </div>

        {/* 3 SpotlightCards */}
        <div className="grid md:grid-cols-3 gap-4">
          {guarantees.map((g) => (
            <div key={g.title} style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)", borderRadius: 0 }}>
            <SpotlightCard
              spotlightColor={`rgba(${g.accentRgb},0.12)`}
              spotlightBorderColor={g.accent}
              borderColor={`rgba(${g.accentRgb},0.25)`}
              background="rgba(13,31,45,0.88)"
              radius={0}
              className="p-6 flex flex-col"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${g.accent}88, transparent)` }}
              />

              {/* Stat */}
              <div
                className="font-black leading-none mb-1"
                style={{ fontSize: "clamp(28px,3.5vw,40px)", color: g.accent, fontFamily: "var(--font-heading)" }}
              >
                {g.stat}
              </div>

              <div className="font-bold text-sm mb-3" style={{ color: "#ffffff" }}>{g.title}</div>

              <div className="h-px mb-3" style={{ background: `rgba(${g.accentRgb},0.18)` }} />

              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{g.desc}</p>
            </SpotlightCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
