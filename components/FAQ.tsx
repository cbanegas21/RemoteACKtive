"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = useMemo(
    () => [
      {
        slug: "timezones",
        question: "My team is in a different time zone — will collaboration still work?",
        answer:
          "Yes. Our professionals work flexible hours and are matched specifically to your preferred schedule. We ensure meaningful overlap with your core business hours so daily standups, async work, and real-time collaboration all flow without friction.",
      },
      {
        slug: "selection",
        question: "How do I know I'm getting the best talent, not just whoever's available?",
        answer:
          "Every candidate clears a 6-step gauntlet: skills assessments, English fluency testing, personality evaluation, reference verification, AI-tool familiarity, and a proven track record check. Only the top tier reach your shortlist — typically less than 5% of all applicants.",
      },
      {
        slug: "language-barriers",
        question: "Will there be communication issues with an overseas hire?",
        answer:
          "No. English fluency is a hard requirement in our vetting process — both written and verbal. We don't shortlist candidates who can't communicate clearly and confidently, so you'll never experience the friction that comes with weaker language skills.",
      },
      {
        slug: "support",
        question: "What kind of ongoing support do I actually get?",
        answer:
          "With our Full Remote ACKtive Experience, you get end-to-end support: HR assistance, payment management, continuous training, performance monitoring, well-being programs, and direct access to our team for guidance on marketing, AI tools, SEO, and operations.",
      },
      {
        slug: "cost",
        question: "Is this actually cheaper than hiring locally, once I add everything up?",
        answer:
          "Consistently, yes. Our clients average 60–70% savings on total labor costs compared to equivalent U.S. hires — salary, overhead, benefits, and taxes included. Our cost comparison tool on this page breaks it down by role so you can see the real numbers before committing to anything.",
      },
      {
        slug: "not-happy",
        question: "What if the hire turns out to be a bad fit?",
        answer:
          "We cover it. If your professional isn't working out, we pause your service, find you a better-matched replacement at zero extra charge, and give you one full week of service free while you transition. This guarantee applies at any stage of the engagement — no time limits, no fine print.",
      },
      {
        slug: "role-types",
        question: "What types of work can I actually outsource through Remote ACKtive?",
        answer:
          "Virtually any non-physical role. We place talent across Sales & Business Development, Marketing & Brand Growth, Technical & IT, Finance & Administration, Customer Experience, Creative Services, HR, and Executive Support. If you have a specific role in mind, reach out — we can almost certainly find the right person.",
      },
      {
        slug: "training",
        question: "Who handles training and keeping my team sharp over time?",
        answer:
          "With our Full Remote ACKtive Experience, we provide continuous development programs, access to industry experts, and ongoing coaching to ensure your remote team stays productive and up-to-date with the latest tools and best practices — without you having to manage it.",
      },
      {
        slug: "quality",
        question: "How do I know quality won't drop after the first few weeks?",
        answer:
          "We don't disappear after placement. Our team actively monitors performance, conducts periodic check-ins, and provides continuous development resources. If we see any issues early, we flag them and course-correct before they become a problem for you.",
      },
      {
        slug: "get-started",
        question: "How do I get the process started?",
        answer:
          "Book a free discovery call — it takes 30 minutes. We'll map out exactly where remote talent fits your business, walk you through the process, and start sourcing candidates immediately after. Most clients are interviewing pre-vetted professionals within 3–10 days.",
      },
      {
        slug: "part-time",
        question: "I only need someone part-time — is that possible?",
        answer:
          "Absolutely. We offer full-time, part-time, and project-based arrangements. Whether you need 10 hours a week or 40, we'll match you with a professional whose schedule and capacity align with yours — no forced full-time commitments.",
      },
      {
        slug: "scaling",
        question: "What if I need to ramp up quickly for a big project?",
        answer:
          "Rapid scaling is one of our strengths. Our pre-vetted talent pool and streamlined processes let us deploy multiple qualified team members quickly when demand spikes. We can scale up or down as your workload changes, with minimal onboarding friction.",
      },
      {
        slug: "offshore-benefits",
        question: "What's the real advantage over just hiring locally?",
        answer:
          "60–70% cost savings, access to a larger global talent pool, round-the-clock productivity across time zones, and the ability to scale without long-term overhead commitments. Your local team stays focused on high-leverage strategic work while remote professionals handle the operational load.",
      },
      {
        slug: "start-timeline",
        question: "Once I pick someone, how long before they actually start?",
        answer:
          "Typically 1–2 weeks from selection to day one. That covers contract finalization, equipment setup, and onboarding. In urgent situations, we can often compress that timeline — just let us know upfront and we'll build it into the plan.",
      },
    ],
    []
  );

  // null = none open, -1 = all open, >=0 = that index open
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── URL hash sync on mount ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash.startsWith("#faq")) return;

    const slugMatch = hash.match(/^#faq-(.+)$/);
    if (slugMatch) {
      const identifier = slugMatch[1];
      let idx = faqs.findIndex((faq) => faq.slug === identifier);
      if (idx === -1 && !isNaN(Number(identifier))) idx = Number(identifier);

      if (idx >= 0 && idx < faqs.length) {
        setOpenIndex(idx);
        setTimeout(() => {
          faqRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      } else if (hash === "#faq") {
        setTimeout(() => {
          document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Write hash when selection changes ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (openIndex === null || openIndex === -1) {
      if (url.hash.startsWith("#faq-")) {
        url.hash = "#faq";
        history.replaceState(null, "", url.toString());
      }
    } else if (openIndex >= 0 && openIndex < faqs.length) {
      url.hash = `#faq-${faqs[openIndex].slug}`;
      history.replaceState(null, "", url.toString());
    }
  }, [openIndex, faqs]);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const expandAll = () => setOpenIndex(-1);
  const collapseAll = () => setOpenIndex(null);
  const isOpen = (idx: number) => openIndex === -1 || openIndex === idx;

  /* ── Keyboard navigation ── */
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        document.getElementById(`faq-btn-${idx + 1}`)?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        document.getElementById(`faq-btn-${idx - 1}`)?.focus();
        break;
      case "Home":
        e.preventDefault();
        document.getElementById("faq-btn-0")?.focus();
        break;
      case "End":
        e.preventDefault();
        document.getElementById(`faq-btn-${faqs.length - 1}`)?.focus();
        break;
    }
  };

  /* ── Two-column split ── */
  const leftFaqs = faqs.slice(0, 7);
  const rightFaqs = faqs.slice(7);

  /* ── Single FAQ item renderer ── */
  const renderItem = (faq: (typeof faqs)[0], actualIdx: number) => {
    const open = isOpen(actualIdx);
    return (
      <div
        key={faq.slug}
        ref={(el) => {
          faqRefs.current[actualIdx] = el;
        }}
        className="rounded-2xl overflow-hidden border bg-[#1E2430] border-white/8 hover:border-[#57C5CF]/40 transition-colors duration-200"
        role="listitem"
      >
        <button
          id={`faq-btn-${actualIdx}`}
          onClick={() => toggleFAQ(actualIdx)}
          onKeyDown={(e) => handleKeyDown(e, actualIdx)}
          aria-expanded={open}
          aria-controls={`faq-panel-${actualIdx}`}
          className="w-full flex items-center justify-between p-5 text-left gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#57C5CF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E2430]"
        >
          <span className="text-white font-semibold text-sm leading-snug">
            {faq.question}
          </span>
          <ChevronDown
            className={`w-4 h-4 flex-shrink-0 text-[#57C5CF] transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        <div
          id={`faq-panel-${actualIdx}`}
          role="region"
          aria-labelledby={`faq-btn-${actualIdx}`}
          className={`grid transition-all duration-300 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="px-5 pb-5 text-white text-sm leading-relaxed border-t border-white/8 pt-4">
              {faq.answer}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="faq" className="py-20" style={{ background: 'linear-gradient(to right, #135058, #F1F2B5)' }}>
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-black/10 border border-black/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-black tracking-wide uppercase">
              Got Questions?
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4 leading-tight">
            Every concern you have —{" "}
            <span className="text-[#0A3040]">answered.</span>
          </h2>
          <p className="text-black font-semibold text-lg max-w-2xl mx-auto mb-5">
            Real questions from real clients, answered honestly. Still on the
            fence? Book a free call and we&apos;ll answer them live.
          </p>
          <a
            href="/book-a-call"
            className="inline-flex items-center gap-2 btn-gradient text-[#0F1926] font-bold px-6 py-3 rounded-full text-sm shadow-md hover:shadow-lg mb-6"
          >
            Book a Free Call →
          </a>

          {/* Expand / Collapse controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={expandAll}
              aria-label="Expand all FAQs"
              className="text-sm font-bold px-4 py-2 rounded-lg border border-black/20 text-black hover:border-[#57C5CF]/40 hover:text-black transition-all duration-200"
            >
              Expand all
            </button>
            <button
              onClick={collapseAll}
              aria-label="Collapse all FAQs"
              className="text-sm font-bold px-4 py-2 rounded-lg border border-black/20 text-black hover:border-[#57C5CF]/40 hover:text-black transition-all duration-200"
            >
              Collapse all
            </button>
          </div>
        </div>

        {/* Two-column layout on desktop, single column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="space-y-3" role="list">
            {leftFaqs.map((faq, idx) => renderItem(faq, idx))}
          </div>
          {/* Right column */}
          <div className="space-y-3" role="list">
            {rightFaqs.map((faq, idx) => renderItem(faq, idx + 7))}
          </div>
        </div>

      </div>
    </section>
  );
}
