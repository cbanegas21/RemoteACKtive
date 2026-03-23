"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageSquare, Users, CheckSquare, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tell Us Your Goals",
    description:
      "Share what you need in a free discovery call. We'll pinpoint exactly where remote talent saves you the most money and time.",
    accentColor: "#57C5CF",
  },
  {
    number: "02",
    icon: Users,
    title: "We Get You Your People",
    description:
      "Our team hand-screens every candidate through a rigorous vetting process and delivers a shortlist of top-tier professionals.",
    accentColor: "#4FFFB0",
  },
  {
    number: "03",
    icon: CheckSquare,
    title: "We Get Them Onboarded",
    description:
      "We handle contracts, onboarding, and setup so your new team member hits the ground running — zero friction on your end.",
    accentColor: "#57C5CF",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Start Earning Money & Time Back",
    description:
      "Watch your costs drop and your calendar open up. Reinvest the savings into growing your business.",
    accentColor: "#4FFFB0",
  },
];

export default function HowItWorks() {
  const [visibleCount, setVisibleCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    const runSequence = () => {
      clearTimers();
      setVisibleCount(0);
      steps.forEach((_, i) => {
        const t = setTimeout(() => setVisibleCount(i + 1), 100 + i * 280);
        timersRef.current.push(t);
      });
      const lastStepDelay = 100 + (steps.length - 1) * 280;
      const loopTimer = setTimeout(runSequence, lastStepDelay + 20000);
      timersRef.current.push(loopTimer);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runSequence();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24"
      style={{ background: "linear-gradient(to right, #2C5364, #203A43, #0F2027)" }}
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-5">
            <span
              className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Simple Process
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            From Discovery to Delegation
          </h2>
          <p
            className="text-lg text-white/70 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Four steps. Most clients are up and running in under two weeks.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative">

          {/* Animated connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[52px] left-[calc(12.5%-16px)] right-[calc(12.5%-16px)] h-px bg-white/8 z-0"
          >
            <div
              className="h-full transition-all duration-700 ease-out"
              style={{
                width:
                  visibleCount >= steps.length
                    ? "100%"
                    : `${(visibleCount / steps.length) * 100}%`,
                background:
                  "linear-gradient(90deg, #248B93 0%, #57C5CF 50%, #4FFFB0 100%)",
              }}
            />
          </div>

          {/* Step cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isVisible = visibleCount > i;

              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col transition-all duration-500 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {/* Faded giant step number — behind card */}
                  <div
                    className="absolute -top-5 left-4 text-[96px] font-extrabold leading-none select-none pointer-events-none z-0"
                    style={{
                      color: isVisible ? step.accentColor : "transparent",
                      opacity: isVisible ? 0.07 : 0,
                      fontFamily: "var(--font-heading)",
                      transition: "opacity 0.6s ease-out",
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>

                  {/* Numbered badge — sits on the connector line */}
                  <div className="flex justify-center mb-5 relative z-10">
                    <div
                      className={`w-[104px] h-[104px] rounded-full flex items-center justify-center transition-all duration-500 ${
                        isVisible ? "shadow-lg" : ""
                      }`}
                      style={{
                        background: isVisible
                          ? `linear-gradient(135deg, ${step.accentColor}22 0%, ${step.accentColor}10 100%)`
                          : "rgba(255,255,255,0.04)",
                        border: `2px solid ${isVisible ? step.accentColor + "50" : "rgba(255,255,255,0.08)"}`,
                        boxShadow: isVisible
                          ? `0 0 0 6px ${step.accentColor}12, 0 12px 32px ${step.accentColor}20`
                          : "none",
                      }}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <Icon
                          className="w-6 h-6"
                          style={{ color: isVisible ? step.accentColor : "rgba(255,255,255,0.2)" }}
                        />
                        <span
                          className="text-xs font-bold tabular-nums"
                          style={{
                            color: isVisible ? step.accentColor : "rgba(255,255,255,0.2)",
                            fontFamily: "var(--font-heading)",
                          }}
                        >
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div
                    className="relative z-10 flex-1 rounded-2xl p-6 border transition-all duration-500"
                    style={{
                      background: isVisible
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(255,255,255,0.02)",
                      borderColor: isVisible
                        ? `${step.accentColor}30`
                        : "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(8px)",
                      boxShadow: isVisible
                        ? `0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 ${step.accentColor}15`
                        : "none",
                    }}
                  >
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-6 right-6 h-px rounded-full transition-all duration-500"
                      style={{
                        background: isVisible
                          ? `linear-gradient(90deg, transparent, ${step.accentColor}60, transparent)`
                          : "transparent",
                      }}
                    />

                    <h3
                      className="text-white font-bold text-base mb-2.5 leading-snug"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-white/60 text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/book-a-call"
            className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full btn-grad text-white text-base font-bold shadow-xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Want to Start Saving More Money and Time? Book a Discovery Call
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </a>
        </div>

      </div>
    </section>
  );
}
