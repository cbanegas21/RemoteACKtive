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
      description: "Perfect for companies who want to manage their own talent",
      features: [
        "One-time fee",
        "30-day free replacement guarantee",
        "Skills screening",
        "Personality testing",
        "Interview coordination",
        "Onboarding support",
      ],
      cta: "BOOK A DISCOVERY CALL",
      onClick: () => handleGetStarted("hire-only"),
      highlighted: false,
      checkColor: "text-primary-teal",
      buttonStyle: "bg-white text-primary-teal border-2 border-primary-teal hover:bg-primary-teal hover:text-white",
    },
    {
      name: "Full Remote ACKtive Experience",
      badge: "⭐ MOST POPULAR",
      description: "End-to-end recruitment, onboarding, and ongoing management",
      features: [
        "Everything in Recruitment-Only package",
        "End-to-end recruitment & onboarding",
        "HR-related tasks, payment management & administrative support",
        "Continuous training & development for outsourced talent",
        "Well-being & support systems",
        "Recognition & rewards program",
        "Data security & productivity tools",
      ],
      cta: "BOOK A DISCOVERY CALL",
      onClick: () => handleGetStarted("hire-manage"),
      highlighted: true,
      checkColor: "text-white",
      buttonStyle: "bg-white text-primary-gold hover:bg-primary-gold hover:text-white hover:scale-105",
    },
    {
      name: "ACKtive Training Program",
      badge: "NEW",
      description: "Upskill your existing offshore team",
      features: [
        "Best for businesses that already have an offshore team",
        "Live monthly upskill training",
        "Access to industry experts (Operations & Marketing)",
        "Community & peer support",
        "Exclusive team-building activities",
        "Discount: 10% off when enrolling 2+ remote talents",
      ],
      cta: "LEARN MORE",
      onClick: () => handleGetStarted("hire-only"),
      highlighted: false,
      checkColor: "text-primary-teal",
      buttonStyle: "bg-white text-primary-teal border-2 border-primary-teal hover:bg-primary-teal hover:text-white",
    },
  ];

  return (
    <section id="services" className="py-20 bg-background-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Package
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  : "bg-white shadow-lg hover:shadow-xl border-2 border-primary-teal/20"
              }`}
            >
              {tier.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap ${
                  tier.highlighted ? "bg-primary-gold text-white" : "bg-primary-teal text-white"
                }`}>
                  {tier.badge}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-3 ${tier.highlighted ? "text-white" : "text-gray-900"}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm ${tier.highlighted ? "text-white/90" : "text-gray-600"}`}>
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${tier.highlighted ? "text-white" : tier.checkColor}`} />
                    <span className={`text-sm ${tier.highlighted ? "text-white" : "text-gray-700"}`}>
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
