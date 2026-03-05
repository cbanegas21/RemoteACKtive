"use client";
import { useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";

const comparisons = [
  {
    them: "Months-long hiring cycles that stall your growth",
    us: "Pre-vetted professionals ready in 3–10 days",
  },
  {
    them: "Agency markups of 50–100% hidden in your invoice",
    us: "Transparent, flat-fee pricing — no surprise costs",
  },
  {
    them: "Generic talent pools with whoever's available",
    us: "Top 5% only — rigorously hand-screened candidates",
  },
  {
    them: "Disappear after placement, leaving you on your own",
    us: "Lifetime partnership with ongoing support & coaching",
  },
  {
    them: "One-size-fits-all packages that don't fit your needs",
    us: "Custom-matched talent aligned to your exact business",
  },
  {
    them: "Zero performance monitoring after the hire",
    us: "Continuous tracking, check-ins, and course-correction",
  },
];

export default function WhatMakesUsDifferent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          comparisons.forEach((_, i) => {
            timers.push(setTimeout(() => setVisibleCount(i + 1), 100 + i * 150));
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20"
      style={{ background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' }}
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
              The Difference
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            What Others Do.{" "}
            <span className="text-[#4FFFB0]">What We Do.</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Not all outsourcing partners are equal. Here&apos;s exactly how Remote ACKtive
            raises the bar — every time.
          </p>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-2 gap-4 mb-4 max-w-4xl mx-auto">
          <div className="rounded-xl bg-red-900/30 border border-red-500/30 px-5 py-3 text-center">
            <span className="text-red-400 font-bold text-sm uppercase tracking-wider">
              The Old Way
            </span>
          </div>
          <div className="rounded-xl bg-[#4FFFB0]/10 border border-[#4FFFB0]/30 px-5 py-3 text-center">
            <span className="text-[#4FFFB0] font-bold text-sm uppercase tracking-wider">
              The Remote ACKtive Way
            </span>
          </div>
        </div>

        {/* Comparison rows */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {comparisons.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-2 gap-4 transition-all duration-500 ${
                visibleCount > idx
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {/* Them */}
              <div className="flex items-start gap-3 rounded-xl bg-red-900/20 border border-red-500/20 px-5 py-4">
                <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm leading-relaxed font-bold">{row.them}</span>
              </div>
              {/* Us */}
              <div className="flex items-start gap-3 rounded-xl bg-[#4FFFB0]/8 border border-[#4FFFB0]/20 px-5 py-4">
                <Check className="w-5 h-5 text-[#4FFFB0] flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm leading-relaxed font-bold">{row.us}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/book-a-call"
            className="inline-flex items-center gap-2 btn-grad text-white font-bold px-8 py-4 rounded-full text-base"
          >
            Book a Free Discovery Call →
          </a>
        </div>

      </div>
    </section>
  );
}
