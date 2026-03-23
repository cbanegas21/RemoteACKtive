"use client";
import { Check, Star, ArrowRight, Zap, Settings } from "lucide-react";
import { useFormContext } from "./FormContext";

export default function ThreeTierServices() {
  const { setFormType } = useFormContext();

  const handleGetStarted = (type: "hire-only" | "hire-manage") => {
    setFormType(type);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const tiers = [
    {
      name: "Recruitment-Only",
      icon: Zap,
      bestFor: "Teams ready to manage talent on their own",
      description:
        "We find, vet, and deliver top-tier candidates — you handle the rest.",
      features: [
        "Single upfront investment",
        "30-day satisfaction replacement guarantee",
        "Comprehensive skills assessment",
        "Behavioral and culture fit evaluation",
        "Complete interview facilitation",
        "Initial integration assistance",
      ],
      cta: "Get Started",
      onClick: () => handleGetStarted("hire-only"),
      highlighted: false,
      accentColor: "#57C5CF",
      iconBg: "rgba(87,197,207,0.12)",
      borderIdle: "rgba(87,197,207,0.2)",
      borderHover: "rgba(87,197,207,0.5)",
      checkColor: "#57C5CF",
    },
    {
      name: "Full Service Staffing",
      icon: Settings,
      badge: "MOST POPULAR",
      bestFor: "Businesses that want a fully managed remote team",
      description:
        "End-to-end hiring, management, and ongoing development — hands-free.",
      features: [
        "Everything in Recruitment-Only",
        "Full-service hiring and team integration",
        "Complete HR administration and payroll",
        "Ongoing professional development programs",
        "Employee wellness and engagement initiatives",
        "Performance recognition systems",
        "Enterprise-grade security and productivity platforms",
      ],
      cta: "Get Started",
      onClick: () => handleGetStarted("hire-manage"),
      highlighted: true,
      accentColor: "#4FFFB0",
      iconBg: "rgba(79,255,176,0.12)",
      borderIdle: "rgba(79,255,176,0.3)",
      borderHover: "rgba(79,255,176,0.7)",
      checkColor: "#4FFFB0",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(to right, #2C5364, #203A43, #0F2027)",
      }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(87,197,207,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
              Our Packages
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Choose Your Perfect Package
          </h2>
          <p
            className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            From recruitment to ongoing management, we have the right solution
            for your business.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className="relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: tier.highlighted
                    ? "rgba(15, 25, 38, 0.75)"
                    : "rgba(15, 25, 38, 0.6)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: `1px solid ${tier.borderIdle}`,
                  boxShadow: tier.highlighted
                    ? `0 0 0 1px ${tier.borderIdle}, 0 24px 60px rgba(79,255,176,0.08)`
                    : "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${tier.borderHover}`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px ${tier.borderHover}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${tier.borderIdle}`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = tier.highlighted
                    ? `0 0 0 1px ${tier.borderIdle}, 0 24px 60px rgba(79,255,176,0.08)`
                    : "none";
                }}
              >
                {/* Top accent bar — featured only */}
                {tier.highlighted && (
                  <div
                    className="h-0.5 w-full flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, #4FFFB0 40%, #57C5CF 70%, transparent 100%)",
                    }}
                  />
                )}

                <div className="p-8 flex flex-col flex-1">
                  {/* Badge */}
                  {tier.badge && (
                    <div className="mb-5">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest"
                        style={{
                          background:
                            "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                          color: "#fff",
                          boxShadow: "0 4px 14px rgba(245,158,11,0.35)",
                        }}
                      >
                        <Star className="w-3 h-3 fill-white" />
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  {/* Icon + tier name row */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: tier.iconBg,
                        border: `1px solid ${tier.borderIdle}`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: tier.accentColor }} />
                    </div>
                    <h3
                      className="text-2xl font-extrabold text-white"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {tier.name}
                    </h3>
                  </div>

                  {/* Best for pill */}
                  <div
                    className="inline-flex self-start items-center gap-1.5 rounded-full px-3 py-1 mb-4"
                    style={{
                      background: `${tier.accentColor}12`,
                      border: `1px solid ${tier.accentColor}25`,
                    }}
                  >
                    <span
                      className="text-xs font-semibold"
                      style={{ color: tier.accentColor }}
                    >
                      Best for: {tier.bestFor}
                    </span>
                  </div>

                  <p
                    className="text-white/70 text-sm leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {tier.description}
                  </p>

                  {/* Divider */}
                  <div
                    className="h-px w-full mb-6"
                    style={{
                      background: `linear-gradient(90deg, ${tier.accentColor}30 0%, transparent 100%)`,
                    }}
                  />

                  {/* Features label */}
                  <p
                    className="text-xs font-bold text-white/45 uppercase tracking-widest mb-4"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    What&apos;s included
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        {/* Custom checkmark */}
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                          style={{
                            background: `${tier.checkColor}18`,
                            border: `1px solid ${tier.checkColor}40`,
                          }}
                        >
                          <Check
                            className="w-3 h-3"
                            style={{ color: tier.checkColor }}
                            strokeWidth={3}
                          />
                        </div>
                        <span
                          className="text-sm text-white/85"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={tier.onClick}
                    className="w-full py-3.5 px-6 rounded-full font-bold text-sm btn-grad text-white flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decision helper */}
        <div className="text-center mt-10">
          <p
            className="text-white/65 text-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Not sure which one is right?{" "}
            <a
              href="/book-a-call"
              className="text-[#57C5CF] font-semibold hover:text-[#4FFFB0] transition-colors underline underline-offset-2"
            >
              Book a free call
            </a>{" "}
            and we&apos;ll help you decide.
          </p>
        </div>
      </div>
    </section>
  );
}
