"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// ─── Categories
const CATEGORIES = {
  process: "Hiring Process",
  talent:  "Talent Quality",
  cost:    "Cost & Value",
  support: "Support & Scale",
} as const;

type CategoryKey = keyof typeof CATEGORIES;

// ─── FAQ data split by category
const FAQS: Record<CategoryKey, { slug: string; question: string; answer: string }[]> = {
  process: [
    {
      slug: "get-started",
      question: "How do I get the process started?",
      answer: "Book a free discovery call — it takes 30 minutes. We'll map out exactly where remote talent fits your business, walk you through the process, and start sourcing candidates immediately after. Most clients are interviewing pre-vetted professionals within 3–10 days.",
    },
    {
      slug: "start-timeline",
      question: "Once I pick someone, how long before they actually start?",
      answer: "Typically 1–2 weeks from selection to day one. That covers contract finalization, equipment setup, and onboarding. In urgent situations, we can often compress that timeline — just let us know upfront and we'll build it into the plan.",
    },
    {
      slug: "role-types",
      question: "What types of roles can I actually outsource?",
      answer: "Virtually any non-physical role. We place talent across Sales & Business Development, Marketing & Brand Growth, Technical & IT, Finance & Administration, Customer Experience, Creative Services, HR, and Executive Support. If you have a specific role in mind, reach out — we can almost certainly find the right person.",
    },
    {
      slug: "part-time",
      question: "I only need someone part-time — is that possible?",
      answer: "Absolutely. We offer full-time, part-time, and project-based arrangements. Whether you need 10 hours a week or 40, we'll match you with a professional whose schedule and capacity align with yours — no forced full-time commitments.",
    },
  ],
  talent: [
    {
      slug: "selection",
      question: "How do I know I'm getting the best talent, not just whoever's available?",
      answer: "Every candidate clears a 6-step gauntlet: skills assessments, English fluency testing, personality evaluation, reference verification, AI-tool familiarity, and a proven track record check. Only the top tier reach your shortlist — typically less than 5% of all applicants.",
    },
    {
      slug: "language-barriers",
      question: "Will there be communication issues with an overseas hire?",
      answer: "No. English fluency is a hard requirement in our vetting process — both written and verbal. We don't shortlist candidates who can't communicate clearly and confidently, so you'll never experience the friction that comes with weaker language skills.",
    },
    {
      slug: "timezones",
      question: "My team is in a different time zone — will collaboration still work?",
      answer: "Yes. Our professionals work flexible hours and are matched specifically to your preferred schedule. We ensure meaningful overlap with your core business hours so daily standups, async work, and real-time collaboration all flow without friction.",
    },
    {
      slug: "quality",
      question: "How do I know quality won't drop after the first few weeks?",
      answer: "We don't disappear after placement. Our team actively monitors performance, conducts periodic check-ins, and provides continuous development resources. If we see any issues early, we flag them and course-correct before they become a problem for you.",
    },
  ],
  cost: [
    {
      slug: "cost",
      question: "Is this actually cheaper than hiring locally, once I add everything up?",
      answer: "Consistently, yes. Our clients average 60–70% savings on total labor costs compared to equivalent U.S. hires — salary, overhead, benefits, and taxes included. Our cost comparison tool on this page breaks it down by role so you can see the real numbers before committing to anything.",
    },
    {
      slug: "offshore-benefits",
      question: "What's the real advantage over just hiring locally?",
      answer: "60–70% cost savings, access to a larger global talent pool, round-the-clock productivity across time zones, and the ability to scale without long-term overhead commitments. Your local team stays focused on high-leverage strategic work while remote professionals handle the operational load.",
    },
    {
      slug: "not-happy",
      question: "What if the hire turns out to be a bad fit?",
      answer: "We cover it. If your professional isn't working out, we pause your service, find you a better-matched replacement at zero extra charge, and give you one full week of service free while you transition. This guarantee applies at any stage of the engagement — no time limits, no fine print.",
    },
  ],
  support: [
    {
      slug: "support",
      question: "What kind of ongoing support do I actually get?",
      answer: "With our Full Remote ACKtive Experience, you get end-to-end support: HR assistance, payment management, continuous training, performance monitoring, well-being programs, and direct access to our team for guidance on marketing, AI tools, SEO, and operations.",
    },
    {
      slug: "training",
      question: "Who handles training and keeping my team sharp over time?",
      answer: "With our Full Remote ACKtive Experience, we provide continuous development programs, access to industry experts, and ongoing coaching to ensure your remote team stays productive and up-to-date with the latest tools and best practices — without you having to manage it.",
    },
    {
      slug: "scaling",
      question: "What if I need to ramp up quickly for a big project?",
      answer: "Rapid scaling is one of our strengths. Our pre-vetted talent pool and streamlined processes let us deploy multiple qualified team members quickly when demand spikes. We can scale up or down as your workload changes, with minimal onboarding friction.",
    },
  ],
};

// ─── Single FAQ accordion item
function FAQItem({ item }: { item: { slug: string; question: string; answer: string } }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--faq-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--faq-y", `${e.clientY - rect.top}px`);
  };

  const onMouseLeave = () => {
    cardRef.current?.style.removeProperty("--faq-x");
    cardRef.current?.style.removeProperty("--faq-y");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-0.5"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      {/* Mouse-follow glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: "radial-gradient(280px circle at var(--faq-x, 50%) var(--faq-y, 50%), rgba(168,232,245,0.09), transparent 70%)",
        }}
      />

      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        id={`faq-btn-${item.slug}`}
        aria-controls={`faq-panel-${item.slug}`}
        className="relative flex w-full items-start gap-3 sm:gap-5 px-4 sm:px-7 py-5 sm:py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a8e8f5] focus-visible:ring-inset"
      >
        {/* Animated + / × icon */}
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all duration-300 group-hover:scale-105">
          <span
            className={`pointer-events-none absolute inset-0 rounded-full border border-white/20 opacity-30 ${open ? "animate-ping" : ""}`}
          />
          <svg
            className={`relative h-4 w-4 text-white transition-transform duration-400 ${open ? "rotate-45" : "rotate-0"}`}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>

        <span className="flex-1 text-base font-semibold text-white leading-snug pt-1.5">
          {item.question}
        </span>
      </button>

      {/* Accordion panel — CSS grid trick for height:auto transition */}
      <div
        id={`faq-panel-${item.slug}`}
        role="region"
        aria-labelledby={`faq-btn-${item.slug}`}
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="px-4 sm:px-7 pb-5 sm:pb-6 text-sm text-white leading-relaxed sm:pl-[4.75rem]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main section
export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("process");
  const categoryKeys = Object.keys(CATEGORIES) as CategoryKey[];

  return (
    <section id="faq" className="relative overflow-hidden py-24 md:py-32" style={{ background: '#04090f' }}>
      {/* Gradient blobs background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            filter: 'blur(60px)',
            ['--color-1' as string]: '87,197,207',
            ['--color-2' as string]: '79,255,176',
            ['--color-3' as string]: '168,223,240',
            ['--color-4' as string]: '57,139,87',
            ['--color-5' as string]: '11,23,39',
          } as React.CSSProperties}
        >
          <div className="absolute animate-first opacity-70" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-1),0.5) 0, rgba(var(--color-1),0) 50%) no-repeat' }} />
          <div className="absolute animate-second opacity-70" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-2),0.5) 0, rgba(var(--color-2),0) 50%) no-repeat', transformOrigin: 'calc(50% - 300px) center' }} />
          <div className="absolute animate-third opacity-70" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-3),0.4) 0, rgba(var(--color-3),0) 50%) no-repeat', transformOrigin: 'calc(50% + 300px) center' }} />
          <div className="absolute animate-fourth opacity-60" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-4),0.4) 0, rgba(var(--color-4),0) 50%) no-repeat', transformOrigin: 'calc(50% - 150px) center' }} />
          <div className="absolute animate-fifth opacity-50" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-5),0.4) 0, rgba(var(--color-5),0) 50%) no-repeat', transformOrigin: 'calc(50% - 600px) calc(50% + 600px)' }} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-4xl">

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Every question you have —{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #a8e8f5, #b8fce8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              answered.
            </span>
          </h2>
          <p className="text-white text-lg max-w-xl leading-relaxed">
            Real questions from real clients, answered honestly. Still on the fence?{" "}
            <Link href="/book-a-call" className="text-[#a8e8f5] font-semibold hover:underline">
              Book a free call
            </Link>{" "}
            and we&apos;ll answer them live.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className="rounded-full border px-5 py-2 text-sm font-bold transition-all duration-200"
              style={{
                borderColor: activeCategory === key ? "transparent" : "rgba(255,255,255,0.15)",
                color: activeCategory === key ? "#04090f" : "rgba(255,255,255,0.7)",
                background: activeCategory === key ? "linear-gradient(90deg, #a8e8f5, #b8fce8)" : "transparent",
              }}
            >
              {CATEGORIES[key]}
            </button>
          ))}
        </div>

        {/* FAQ list — CSS fade on tab change */}
        <div key={activeCategory} className="space-y-3 animate-fade-up">
          {FAQS[activeCategory].map((item) => (
            <FAQItem key={item.slug} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/book-a-call"
            className="rounded-full px-8 py-3.5 font-bold text-sm inline-block text-[#04090f] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 50%, #b8fce8 100%)" }}
          >
            Book a Free Call →
          </Link>
          <span className="text-white text-sm">
            Still have questions? We answer everything on the call.
          </span>
        </div>

      </div>
    </section>
  );
}
