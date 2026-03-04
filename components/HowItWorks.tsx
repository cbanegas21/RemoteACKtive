"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Get free, tailored insights",
    description:
      "Tell us your goals in a complimentary call. We'll map exactly where remote talent drives the biggest impact for your business.",
  },
  {
    number: "02",
    title: "We recruit only the best",
    description:
      "Our team runs every candidate through a 6-step vetting gauntlet and hands you a shortlist of pre-qualified professionals.",
  },
  {
    number: "03",
    title: "Onboard with ease",
    description:
      "We handle payroll, contracts, onboarding, and performance tracking — your new hire is productive from day one.",
  },
  {
    number: "04",
    title: "Get time back",
    description:
      "Delegate the operational grind and reclaim your calendar for the high-leverage work only you can do.",
  },
];

export default function HowItWorks() {
  const [visibleCount, setVisibleCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, i) => {
            setTimeout(() => setVisibleCount(i + 1), i * 280);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 bg-[#F7FAFB]"
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            From Discovery to Delegation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four steps. Most clients are up and running in under two weeks.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">

          {/* Animated connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gray-200 z-0"
          >
            <div
              className="h-full bg-gradient-to-r from-[#248B93] via-[#57C5CF] to-[#4FFFB0] transition-all duration-700 ease-out"
              style={{
                width:
                  visibleCount >= steps.length
                    ? "100%"
                    : `${(visibleCount / steps.length) * 100}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`flex flex-col items-center text-center transition-all duration-500 ease-out ${
                  visibleCount > i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Numbered circle */}
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg transition-all duration-500 ${
                    visibleCount > i
                      ? "bg-gradient-to-br from-[#248B93] to-[#1A5538] shadow-[0_8px_24px_rgba(36,139,147,0.35)]"
                      : "bg-gray-100"
                  }`}
                >
                  <span
                    className={`text-2xl font-extrabold transition-colors duration-500 ${
                      visibleCount > i ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="/book-a-call"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full btn-gradient text-[#0F1926] text-base font-bold shadow-lg hover:scale-105 transition-transform"
          >
            Book a Discovery Call
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
