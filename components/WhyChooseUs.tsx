"use client";
import { DollarSign, UserCheck, Zap, Globe } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    stat: "Up to 70%",
    statLabel: "cost savings vs. U.S. hires",
    title: "Cost-Effective Solutions",
    description:
      "Replace six-figure salaries with globally competitive rates — same output, a fraction of the cost. Transparent pricing, zero hidden fees.",
    proof: ["Transparent pricing", "No hidden fees", "Flex scale"],
    color: "teal" as const,
  },
  {
    icon: UserCheck,
    stat: "Top 5%",
    statLabel: "of applicants make the cut",
    title: "Handpicked Professionals",
    description:
      "Every hire clears a 6-step vetting gauntlet — skills tests, reference checks, and culture-fit evaluation before they reach you.",
    proof: ["Background-screened", "Culture-matched", "Performance-tracked"],
    color: "mint" as const,
  },
  {
    icon: Zap,
    stat: "3–10 Days",
    statLabel: "from kickoff to first hire",
    title: "Lightning-Fast Onboarding",
    description:
      "Pre-vetted talent pool means you go from intake call to signed offer in under two weeks — not months.",
    proof: ["Pre-vetted pool", "Fewer interview rounds", "Same-week starts"],
    color: "teal" as const,
  },
  {
    icon: Globe,
    stat: "18+",
    statLabel: "countries in our network",
    title: "Truly Global Reach",
    description:
      "Tap into cross-cultural talent across LATAM, SE Asia, and beyond for round-the-clock productivity and regional expertise.",
    proof: ["Multi-timezone", "Regional expertise", "500+ placed"],
    color: "mint" as const,
  },
];

const palette = {
  teal: {
    iconBg: "bg-[#57C5CF]/15",
    iconColor: "text-[#57C5CF]",
    statColor: "text-[#57C5CF]",
    border: "border-[#57C5CF]/20 hover:border-[#57C5CF]/50",
    accentHex: "#57C5CF",
    tagClass:
      "bg-[#57C5CF]/10 border border-[#57C5CF]/25 text-[#57C5CF]",
  },
  mint: {
    iconBg: "bg-[#4FFFB0]/15",
    iconColor: "text-[#4FFFB0]",
    statColor: "text-[#4FFFB0]",
    border: "border-[#4FFFB0]/20 hover:border-[#4FFFB0]/50",
    accentHex: "#4FFFB0",
    tagClass:
      "bg-[#4FFFB0]/10 border border-[#4FFFB0]/25 text-[#4FFFB0]",
  },
};

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-20 bg-[#0F1926]">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
              Why We&apos;re Different
            </span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Why Choose Remote ACKtive?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We make hiring global talent simple, affordable, and stress-free —
            so you can focus on growing.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            const c = palette[benefit.color];

            return (
              <div
                key={benefit.title}
                className={`group relative overflow-hidden rounded-2xl border bg-[#1E2430] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${c.border}`}
              >
                {/* Top colour accent bar */}
                <div
                  className="h-0.5 w-full flex-shrink-0"
                  style={{
                    background: `linear-gradient(90deg, ${c.accentHex} 0%, transparent 80%)`,
                  }}
                />

                <div className="p-6 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110 ${c.iconBg}`}
                  >
                    <Icon className={`w-6 h-6 ${c.iconColor}`} />
                  </div>

                  {/* Big stat */}
                  <p
                    className={`text-4xl font-extrabold leading-none mb-1 ${c.statColor}`}
                  >
                    {benefit.stat}
                  </p>
                  <p className="text-white/35 text-xs font-semibold uppercase tracking-wider mb-4">
                    {benefit.statLabel}
                  </p>

                  {/* Title */}
                  <h3 className="text-white font-bold text-base mb-3 leading-snug">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/55 text-sm leading-relaxed mb-5 flex-1">
                    {benefit.description}
                  </p>

                  {/* Proof chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {benefit.proof.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.tagClass}`}
                      >
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
