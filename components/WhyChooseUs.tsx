"use client";
import Image from "next/image";
import { DollarSign, UserCheck, Zap, Globe, CheckCircle2 } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    stat: "70%",
    statLabel: "average cost savings",
    statSub: "vs. equivalent U.S. hires",
    title: "Cost-Effective Solutions",
    description:
      "Replace six-figure salaries with globally competitive rates — same output, a fraction of the cost. Transparent pricing, zero hidden fees.",
    proof: ["Transparent pricing", "No hidden fees", "Flex scale"],
    color: "teal" as const,
    image: "/images/why-us/cost-effective.png",
    imageAlt: "Cost-effective remote staffing",
  },
  {
    icon: UserCheck,
    stat: "Top 5%",
    statLabel: "of applicants",
    statSub: "make it through our vetting",
    title: "Handpicked Professionals",
    description:
      "Every hire clears a 6-step vetting gauntlet — skills tests, reference checks, and culture-fit evaluation before they reach you.",
    proof: ["Background-screened", "Culture-matched", "Performance-tracked"],
    color: "mint" as const,
    image: "/images/why-us/handpicked.png",
    imageAlt: "Handpicked remote professionals",
  },
  {
    icon: Zap,
    stat: "3–10",
    statLabel: "days to your first hire",
    statSub: "from kickoff call to signed offer",
    title: "Lightning-Fast Onboarding",
    description:
      "Pre-vetted talent pool means you go from intake call to signed offer in under two weeks — not months.",
    proof: ["Pre-vetted pool", "Fewer interview rounds", "Same-week starts"],
    color: "teal" as const,
    image: "/images/why-us/speedy.png",
    imageAlt: "Fast remote hiring",
  },
  {
    icon: Globe,
    stat: "20+",
    statLabel: "countries in our network",
    statSub: "LATAM, SE Asia & beyond",
    title: "Truly Global Reach",
    description:
      "Tap into cross-cultural talent across LATAM, SE Asia, and beyond for round-the-clock productivity and regional expertise.",
    proof: ["Multi-timezone", "Regional expertise", "30+ placed"],
    color: "mint" as const,
    image: "/images/why-us/global.png",
    imageAlt: "Global remote talent network",
  },
];

const palette = {
  teal: {
    iconBg: "bg-[#57C5CF]/15",
    iconColor: "text-[#57C5CF]",
    statColor: "#57C5CF",
    glowColor: "rgba(87,197,207,0.35)",
    ringColor: "rgba(87,197,207,0.5)",
    accentHex: "#57C5CF",
    tagClass:
      "bg-[#57C5CF]/10 border border-[#57C5CF]/20 text-[#57C5CF]",
    dividerGrad:
      "linear-gradient(90deg, #57C5CF 0%, rgba(87,197,207,0.2) 60%, transparent 100%)",
  },
  mint: {
    iconBg: "bg-[#4FFFB0]/15",
    iconColor: "text-[#4FFFB0]",
    statColor: "#4FFFB0",
    glowColor: "rgba(79,255,176,0.3)",
    ringColor: "rgba(79,255,176,0.5)",
    accentHex: "#4FFFB0",
    tagClass:
      "bg-[#4FFFB0]/10 border border-[#4FFFB0]/20 text-[#4FFFB0]",
    dividerGrad:
      "linear-gradient(90deg, #4FFFB0 0%, rgba(79,255,176,0.2) 60%, transparent 100%)",
  },
};

export default function WhyChooseUs() {
  return (
    <section
      id="why"
      className="py-24"
      style={{ background: "linear-gradient(to right, #78ffd6, #007991)" }}
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-black/10 border border-black/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#0F1926] tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>
              Why We&apos;re Different
            </span>
          </div>
          <h2
            className="text-[#0F1926] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Why Choose Remote ACKtive?
          </h2>
          <p className="text-[#0F1926]/75 text-lg max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            We make hiring global talent simple, affordable, and stress-free —
            so you can focus on growing.
          </p>
        </div>

        {/* Alternating rows */}
        <div className="space-y-5">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            const c = palette[benefit.color];
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={benefit.title}
                className={`group relative flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_24px_64px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 ${
                  isReversed ? "md:flex-row-reverse" : ""
                }`}
                style={{ background: "rgba(13,26,45,0.92)", backdropFilter: "blur(12px)" }}
              >
                {/* Colored left/right accent edge */}
                <div
                  className={`absolute inset-y-0 w-1 flex-shrink-0 ${isReversed ? "right-0" : "left-0"}`}
                  style={{ background: c.accentHex }}
                />

                {/* Image panel with circular image */}
                <div
                  className={`relative flex items-center justify-center flex-shrink-0 bg-[#0A1628] px-10 py-8 md:py-0 md:min-h-[220px] md:w-56 ${
                    isReversed ? "md:pl-6 md:pr-10" : "md:pl-10 md:pr-6"
                  }`}
                >
                  {/* Ambient glow behind image */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(ellipse at center, ${c.glowColor} 0%, transparent 70%)`,
                    }}
                  />
                  {/* Circular image with glow ring */}
                  <div
                    className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      boxShadow: `0 0 0 3px rgba(255,255,255,0.06), 0 0 0 7px ${c.ringColor}, 0 12px 40px ${c.glowColor}`,
                    }}
                  >
                    <Image
                      src={benefit.image}
                      alt={benefit.imageAlt}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Vertical divider — desktop only */}
                <div
                  className="hidden md:block w-px self-stretch flex-shrink-0"
                  style={{
                    background: isReversed
                      ? `linear-gradient(180deg, transparent 0%, ${c.accentHex}40 40%, ${c.accentHex}40 60%, transparent 100%)`
                      : `linear-gradient(180deg, transparent 0%, ${c.accentHex}40 40%, ${c.accentHex}40 60%, transparent 100%)`,
                  }}
                />

                {/* Content area */}
                <div className="flex-1 px-8 py-8 md:py-9">
                  {/* Icon + stat block */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                    <div
                      className={`inline-flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 ${c.iconBg}`}
                    >
                      <Icon className={`w-5 h-5 ${c.iconColor}`} />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span
                          className="text-5xl md:text-6xl font-extrabold leading-none tabular-nums"
                          style={{ color: c.statColor, fontFamily: "var(--font-heading)" }}
                        >
                          {benefit.stat}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-white font-semibold text-sm leading-tight">
                            {benefit.statLabel}
                          </span>
                          <span className="text-white/50 text-xs">
                            {benefit.statSub}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Thin divider */}
                  <div
                    className="h-px w-full mb-5"
                    style={{ background: c.dividerGrad }}
                  />

                  <h3
                    className="text-white font-bold text-xl mb-2.5 leading-snug"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="text-white/70 text-sm leading-relaxed mb-5 max-w-xl"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {benefit.description}
                  </p>

                  {/* Proof chips — glassmorphism pill badges */}
                  <div className="flex flex-wrap gap-2">
                    {benefit.proof.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm ${c.tagClass}`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
