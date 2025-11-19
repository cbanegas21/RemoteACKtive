"use client";
import Section from "./Section";
import Image from "next/image";
import { DollarSign, UserCheck, Zap, Globe } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Cost-Effective Solutions",
      tagline: "Save up to 60% on hiring costs",
      image: "/images/why-us/cost-effective.jpg",
      imageAlt: "Cost effective outsourcing",
      color: "blue",
      items: [
        "Fixed, globally competitive rates that keep your budget in check",
        "Flexible engagement—scale up or down to match your needs",
        "Comprehensive HR and onboarding support to cut overhead costs",
        "Transparent pricing with no hidden fees",
      ],
    },
    {
      icon: UserCheck,
      title: "Handpicked Professionals",
      tagline: "Top 5% talent only",
      image: "/images/why-us/handpicked.jpg",
      imageAlt: "Handpicked talent screening",
      color: "purple",
      items: [
        "Rigorous assessments and skill verification",
        "Thorough reference checks and background screening",
        "Culture fit evaluation to match your team dynamics",
        "Ongoing performance reviews to maintain quality",
      ],
    },
    {
      icon: Zap,
      title: "Speedy Onboarding",
      tagline: "Average 7 days to hire",
      image: "/images/why-us/speedy.jpg",
      imageAlt: "Fast onboarding process",
      color: "yellow",
      items: [
        "Typical timeline: 3–10 days from intake to offer",
        "Pre-vetted talent pool ready to interview",
        "Streamlined process with fewer rounds",
        "Instant alignment on tools, processes, and expectations",
      ],
    },
    {
      icon: Globe,
      title: "Global Perspective",
      tagline: "50+ countries covered",
      image: "/images/why-us/global.jpg",
      imageAlt: "Global remote team",
      color: "green",
      items: [
        "Access diverse viewpoints and cross-cultural innovation",
        "Round-the-clock productivity across time zones",
        "Tap into regional expertise and market knowledge",
        "Build a truly international, resilient team",
      ],
    },
  ];

  const colorClasses: Record<string, any> = {
    blue: {
      gradient: "from-[#57C5CF]/10 via-[#57C5CF]/5 to-transparent",
      border: "border-[#57C5CF]/20 hover:border-[#57C5CF]/50",
      iconBg: "bg-[#57C5CF]/10",
      iconColor: "text-[#57C5CF]",
      accentBg: "bg-[#57C5CF]/5",
      dotColor: "text-[#57C5CF]",
      badgeBg: "bg-[#57C5CF]/10 border-[#57C5CF]/20",
      badgeText: "text-[#57C5CF]",
    },
    purple: {
      gradient: "from-[#378B57]/10 via-[#378B57]/5 to-transparent",
      border: "border-[#378B57]/20 hover:border-[#378B57]/50",
      iconBg: "bg-[#378B57]/10",
      iconColor: "text-[#378B57]",
      accentBg: "bg-[#378B57]/5",
      dotColor: "text-[#378B57]",
      badgeBg: "bg-[#378B57]/10 border-[#378B57]/20",
      badgeText: "text-[#378B57]",
    },
    yellow: {
      gradient: "from-[#57C5CF]/10 via-[#57C5CF]/5 to-transparent",
      border: "border-[#57C5CF]/20 hover:border-[#57C5CF]/50",
      iconBg: "bg-[#57C5CF]/10",
      iconColor: "text-[#57C5CF]",
      accentBg: "bg-[#57C5CF]/5",
      dotColor: "text-[#57C5CF]",
      badgeBg: "bg-[#57C5CF]/10 border-[#57C5CF]/20",
      badgeText: "text-[#57C5CF]",
    },
    green: {
      gradient: "from-[#378B57]/10 via-[#378B57]/5 to-transparent",
      border: "border-[#378B57]/20 hover:border-[#378B57]/50",
      iconBg: "bg-[#378B57]/10",
      iconColor: "text-[#378B57]",
      accentBg: "bg-[#378B57]/5",
      dotColor: "text-[#378B57]",
      badgeBg: "bg-[#378B57]/10 border-[#378B57]/20",
      badgeText: "text-[#378B57]",
    },
  };

  return (
    <Section id="why" background="dark">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">
          Why Choose Remote ACKtive?
        </h2>
        <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto">
          We make hiring global talent simple, affordable, and stress-free
        </p>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          const colors = colorClasses[benefit.color];

          return (
            <div
              key={benefit.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-background-darkCard p-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-white/20"
            >
              {/* Image - Top */}
              <div className="relative z-10 mb-4 mx-auto" style={{ maxWidth: '150px' }}>
                <div className="relative w-full aspect-square rounded-full overflow-hidden bg-gray-800">
                  <Image
                    src={benefit.image}
                    alt={benefit.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F5A623]/10 mb-3 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-5 h-5 text-[#F5A623]" />
                </div>

                {/* Title */}
                <h3 className="text-white text-lg font-bold mb-2">
                  {benefit.title}
                </h3>

                {/* Tagline */}
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/20 mb-3">
                  <span className="text-xs font-semibold text-[#F5A623]">
                    {benefit.tagline}
                  </span>
                </div>

                {/* Benefits List */}
                <ul className="space-y-2 mt-3 text-left">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-primary-teal mt-0.5 text-base font-bold flex-shrink-0 transition-transform duration-300 group-hover:scale-125">
                        •
                      </span>
                      <span className="text-gray-300 leading-snug text-xs flex-1">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}