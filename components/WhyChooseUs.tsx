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
      gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
      border: "border-blue-500/20 hover:border-blue-500/50",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      accentBg: "bg-blue-500/5",
      dotColor: "text-blue-500",
      badgeBg: "bg-blue-500/10 border-blue-500/20",
      badgeText: "text-blue-600 dark:text-blue-400",
    },
    purple: {
      gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
      border: "border-purple-500/20 hover:border-purple-500/50",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-600 dark:text-purple-400",
      accentBg: "bg-purple-500/5",
      dotColor: "text-purple-500",
      badgeBg: "bg-purple-500/10 border-purple-500/20",
      badgeText: "text-purple-600 dark:text-purple-400",
    },
    yellow: {
      gradient: "from-yellow-500/10 via-yellow-500/5 to-transparent",
      border: "border-yellow-500/20 hover:border-yellow-500/50",
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      accentBg: "bg-yellow-500/5",
      dotColor: "text-yellow-500",
      badgeBg: "bg-yellow-500/10 border-yellow-500/20",
      badgeText: "text-yellow-600 dark:text-yellow-400",
    },
    green: {
      gradient: "from-green-500/10 via-green-500/5 to-transparent",
      border: "border-green-500/20 hover:border-green-500/50",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-600 dark:text-green-400",
      accentBg: "bg-green-500/5",
      dotColor: "text-green-500",
      badgeBg: "bg-green-500/10 border-green-500/20",
      badgeText: "text-green-600 dark:text-green-400",
    },
  };

  return (
    <Section id="why">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-gray-900 dark:text-white text-4xl md:text-5xl font-bold mb-4">
          Why Choose Remote ACKtive?
        </h2>
        <p className="text-gray-600 dark:text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
          We make hiring global talent simple, affordable, and stress-free
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          const colors = colorClasses[benefit.color];

          return (
            <div
              key={benefit.title}
              className={`
                group relative overflow-hidden rounded-2xl border-2 
                ${colors.border}
                bg-white dark:bg-panel
                p-8 
                transition-all duration-300
                hover:shadow-2xl hover:shadow-${benefit.color}-500/10
                hover:-translate-y-1
              `}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-50`} />

              {/* Image - Top */}
              <div className="relative z-10 mb-6">
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={benefit.image}
                    alt={benefit.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`
                  inline-flex items-center justify-center
                  w-16 h-16 rounded-xl
                  ${colors.iconBg}
                  mb-6
                  transition-transform duration-300
                  group-hover:scale-110 group-hover:rotate-3
                `}>
                  <Icon className={`w-8 h-8 ${colors.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-gray-900 dark:text-white text-2xl font-bold mb-2">
                  {benefit.title}
                </h3>

                {/* Tagline */}
                <div className={`
                  inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                  ${colors.badgeBg}
                  border ${colors.badgeBg.replace('/10', '/20')}
                  mb-6
                `}>
                  <span className={`text-xs font-semibold ${colors.badgeText}`}>
                    {benefit.tagline}
                  </span>
                </div>

                {/* Benefits List */}
                <ul className="space-y-3 mt-6">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={`
                        ${colors.dotColor}
                        mt-1.5 text-lg font-bold
                        transition-transform duration-300
                        group-hover:scale-125
                      `}>
                        •
                      </span>
                      <span className="text-gray-700 dark:text-white/80 leading-relaxed text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative Corner Element */}
              <div className={`
                absolute -bottom-8 -right-8 w-32 h-32 rounded-full
                ${colors.accentBg}
                blur-2xl
                transition-all duration-500
                group-hover:scale-150
              `} />
            </div>
          );
        })}
      </div>
    </Section>
  );
}