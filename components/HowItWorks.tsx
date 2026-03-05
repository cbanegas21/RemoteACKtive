"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Tell Us Your Goals",
    description:
      "Share what you need in a free discovery call. We'll pinpoint exactly where remote talent saves you the most money and time.",
  },
  {
    number: "02",
    title: "We Get You Your People",
    description:
      "Our team hand-screens every candidate through a rigorous vetting process and delivers a shortlist of top-tier professionals.",
  },
  {
    number: "03",
    title: "We Get Them Onboarded",
    description:
      "We handle contracts, onboarding, and setup so your new team member hits the ground running — zero friction on your end.",
  },
  {
    number: "04",
    title: "Start Earning Money & Time Back",
    description:
      "Watch your costs drop and your calendar open up. Reinvest the savings into growing your business.",
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
      // Loop again 20s after the last step finishes revealing
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
      className="py-20"
      style={{ background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' }}
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            From Discovery to Delegation
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Four steps. Most clients are up and running in under two weeks.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">

          {/* Animated connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-white/10 z-0"
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
                      : "bg-black/20"
                  }`}
                >
                  <span className="text-2xl font-extrabold text-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-white text-sm leading-relaxed max-w-[200px] mx-auto">
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
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full btn-grad text-white text-base font-bold"
          >
            Want to Start Saving More Money and Time? Book a Discovery Call
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
