"use client";
import Image from "next/image";
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
    image: "/images/why-us/cost-effective.png",
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
    image: "/images/why-us/handpicked.png",
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
    image: "/images/why-us/speedy.png",
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
    image: "/images/why-us/global.png",
  },
];

const palette = {
  teal: {
    iconBg: "bg-[#57C5CF]/15",
    iconColor: "text-[#57C5CF]",
    statColor: "text-[#57C5CF]",
    border: "border-[#57C5CF]/30",
    accentHex: "#57C5CF",
    tagClass: "bg-[#57C5CF]/10 border border-[#57C5CF]/25 text-[#57C5CF]",
  },
  mint: {
    iconBg: "bg-[#4FFFB0]/15",
    iconColor: "text-[#4FFFB0]",
    statColor: "text-[#4FFFB0]",
    border: "border-[#4FFFB0]/30",
    accentHex: "#4FFFB0",
    tagClass: "bg-[#4FFFB0]/10 border border-[#4FFFB0]/25 text-[#4FFFB0]",
  },
};

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-20" style={{ background: 'linear-gradient(to right, #78ffd6, #007991)' }}>
      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-black/10 border border-black/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-black tracking-wide uppercase">
              Why We&apos;re Different
            </span>
          </div>
          <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Why Choose Remote ACKtive?
          </h2>
          <p className="text-black text-lg max-w-2xl mx-auto">
            We make hiring global talent simple, affordable, and stress-free —
            so you can focus on growing.
          </p>
        </div>

        {/* ── Alternating rows ── */}
        <div className="space-y-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            const c = palette[benefit.color];
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={benefit.title}
                className={`group flex flex-col md:flex-row items-center gap-0 rounded-2xl border bg-[#1E2430] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${c.border} ${isReversed ? "md:flex-row-reverse" : ""}`}
              >
                {/* Left accent bar (top on mobile) */}
                <div
                  className="w-full h-1 md:w-1 md:h-auto md:self-stretch flex-shrink-0"
                  style={{ background: c.accentHex }}
                />

                {/* Image panel */}
                <div className="relative w-full md:w-44 h-40 md:h-auto md:self-stretch flex-shrink-0 overflow-hidden">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    sizes="(min-width: 768px) 176px, 100vw"
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1E2430]/60 to-transparent md:block hidden" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8">
                  {/* Icon + stat row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 ${c.iconBg}`}>
                      <Icon className={`w-5 h-5 ${c.iconColor}`} />
                    </div>
                    <div>
                      <span className={`text-3xl font-extrabold leading-none ${c.statColor}`}>
                        {benefit.stat}
                      </span>
                      <span className="ml-2 text-white text-xs font-semibold uppercase tracking-wider">
                        {benefit.statLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-white font-bold text-lg mb-2 leading-snug">
                    {benefit.title}
                  </h3>

                  <p className="text-white text-sm leading-relaxed mb-4">
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
