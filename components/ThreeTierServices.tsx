"use client";
import { Check } from "lucide-react";
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
      name: "Recruitment-Only Package",
      description: "Ideal for teams ready to manage talent independently",
      features: [
        "Single upfront investment",
        "30-day satisfaction replacement guarantee",
        "Comprehensive skills assessment",
        "Behavioral and culture fit evaluation",
        "Complete interview facilitation",
        "Initial integration assistance",
      ],
      cta: "BOOK A DISCOVERY CALL",
      onClick: () => handleGetStarted("hire-only"),
      highlighted: false,
      checkColor: "text-primary-teal",
      buttonStyle: "bg-primary-teal text-black border-2 border-primary-teal hover:bg-primary-cyan hover:text-black",
    },
    {
      name: "Full Remote ACKtive Experience",
      badge: "⭐ MOST POPULAR",
      description: "Complete hiring, management, and development solution",
      features: [
        "All Recruitment-Only features included",
        "Full-service hiring and team integration",
        "Complete HR administration and payroll processing",
        "Ongoing professional development programs",
        "Employee wellness and engagement initiatives",
        "Performance recognition systems",
        "Enterprise-grade security and productivity platforms",
      ],
      cta: "BOOK A DISCOVERY CALL",
      onClick: () => handleGetStarted("hire-manage"),
      highlighted: true,
      checkColor: "text-white",
      buttonStyle: "bg-[#4DD0E1] text-black hover:bg-[#57C5CF] hover:text-black hover:scale-105 shadow-lg shadow-cyan-500/30",
    },
    {
      name: "ACKtive Training Program",
      badge: "NEW",
      description: "Elevate your current remote workforce",
      features: [
        "Designed for companies with existing remote teams",
        "Interactive monthly skill-building sessions",
        "Direct access to specialists in operations and marketing",
        "Collaborative learning community",
        "Custom team engagement events",
        "Multi-enrollment savings: 10% off for 2+ participants",
      ],
      cta: "LEARN MORE",
      onClick: () => handleGetStarted("hire-only"),
      highlighted: false,
      checkColor: "text-primary-teal",
      buttonStyle: "bg-primary-teal text-black border-2 border-primary-teal hover:bg-primary-cyan hover:text-black",
    },
  ];

  return (
    <section id="services" className="py-20 bg-background-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Perfect Package
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From recruitment to ongoing management and training, we have the right solution for your business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                tier.highlighted
                  ? "bg-gradient-primary shadow-2xl scale-105 md:scale-110 border-4 border-primary-gold"
                  : "bg-background-darkCard shadow-lg hover:shadow-xl border-2 border-primary-teal/20"
              }`}
            >
              {tier.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap ${
                  tier.highlighted ? "bg-primary-gold text-white" : "bg-primary-teal text-black"
                }`}>
                  {tier.badge}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-3 ${tier.highlighted ? "text-white" : "text-white"}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm ${tier.highlighted ? "text-white/90" : "text-gray-300"}`}>
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${tier.highlighted ? "text-white" : tier.checkColor}`} />
                    <span className={`text-sm ${tier.highlighted ? "text-white" : "text-gray-300"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={tier.onClick}
                className={`w-full py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg ${tier.buttonStyle}`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
