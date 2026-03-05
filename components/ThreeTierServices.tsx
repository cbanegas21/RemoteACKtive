"use client";
import { Check, Star, ArrowRight } from "lucide-react";
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
      cta: "GET STARTED",
      onClick: () => handleGetStarted("hire-only"),
      highlighted: false,
    },
    {
      name: "Recruit + Manage",
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
      cta: "GET STARTED",
      onClick: () => handleGetStarted("hire-manage"),
      highlighted: true,
    },
  ];

  return (
    <section
      id="services"
      className="py-20"
      style={{
        background: "linear-gradient(to right, #2C5364, #203A43, #0F2027)",
      }}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
              Our Packages
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Choose Your Perfect Package
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            From recruitment to ongoing management, we have the right solution
            for your business
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                tier.highlighted
                  ? "ring-2 ring-[#4FFFB0]/60 shadow-2xl shadow-[#4FFFB0]/10"
                  : "ring-1 ring-white/10 hover:ring-[#57C5CF]/40"
              }`}
              style={{
                background:
                  "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
              }}
            >
              {/* Top accent bar for highlighted */}
              {tier.highlighted && (
                <div className="h-1 w-full bg-gradient-to-r from-[#4FFFB0] via-[#57C5CF] to-[#4FFFB0]" />
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Badge */}
                {tier.badge && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Name + best for */}
                <h3 className="text-2xl font-extrabold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-[#4FFFB0] text-sm font-semibold mb-3">
                  Best for: {tier.bestFor}
                </p>
                <p className="text-white text-sm leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Divider */}
                <div className="h-px w-full bg-white/10 mb-6" />

                {/* Features */}
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">
                  What&apos;s included
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#4FFFB0]" />
                      <span className="text-sm text-white">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={tier.onClick}
                  className="w-full py-3.5 px-6 rounded-full font-bold text-sm transition-all duration-300 btn-grad text-white flex items-center justify-center gap-2"
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Decision helper */}
        <div className="text-center mt-10">
          <p className="text-white text-sm">
            Not sure which one is right?{" "}
            <a
              href="/book-a-call"
              className="text-[#57C5CF] font-semibold hover:text-[#4DD0E1] transition-colors underline underline-offset-2"
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
