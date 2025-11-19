"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Section from "./Section";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = useMemo(
    () => [
      {
        slug: "timezones",
        question: "What time zones and hours do offshore professionals work?",
        answer:
          "Our offshore professionals work flexible hours and can accommodate most time zones. We'll match you with talent based on your preferred working hours and ensure overlap with your core business hours for seamless collaboration.",
      },
      {
        slug: "selection",
        question: "How do you select the best offshore talent?",
        answer:
          "We use a rigorous 6-step vetting process that includes skills assessment, English fluency testing, personality evaluation, reference checks, AI tool familiarity, and proven track record verification. Only the top candidates make it through to you.",
      },
      {
        slug: "language-barriers",
        question: "Are there any language barriers with offshore teams?",
        answer:
          "No. We only work with fluent English-speaking professionals who have excellent written and verbal communication skills. Language proficiency is a critical part of our screening process.",
      },
      {
        slug: "support",
        question: "What support do I get when I outsource with Remote ACKtive?",
        answer:
          "With our Full Remote ACKtive Experience package, you get end-to-end support including HR assistance, payment management, continuous training, performance monitoring, well-being programs, and access to our expert team for guidance on marketing, AI, SEO, and business operations.",
      },
      {
        slug: "cost",
        question: "How much does it cost to work with an offshore team?",
        answer:
          "Our pricing varies based on the role, experience level, and package you choose. On average, clients save 60-70% on operational costs compared to hiring locally. Contact us for a customized quote based on your specific needs.",
      },
      {
        slug: "not-happy",
        question: "What if I'm not happy with my outsourced talent?",
        answer:
          "We offer a 100% Client Satisfaction Guarantee. If your outsourced talent isn't the right fit, we'll pause your service and find you a replacement at zero additional cost. Plus, you'll get 1 week of free service to help you settle in with your new team member. This guarantee applies no matter what stage you're in.",
      },
      {
        slug: "role-types",
        question: "What types of roles can be outsourced to an offshore team?",
        answer:
          "We can help you hire for a wide range of roles including Sales & Business Development, Marketing & Brand Growth, Technical & IT Operations, Finance & Administration, Customer Experience, and Executive & Administrative Support. If you have a specific role in mind, we can likely find the right talent for you.",
      },
      {
        slug: "training",
        question: "Who provides training and ongoing support for offshore teams?",
        answer:
          "With our Full Remote ACKtive Experience and ACKtive Training Program packages, we provide continuous training, development programs, access to industry experts, and ongoing support to ensure your offshore team stays productive and up-to-date with the latest tools and best practices.",
      },
      {
        slug: "quality",
        question: "How do you ensure the quality of your hires?",
        answer:
          "Every candidate undergoes rigorous technical assessments, thorough reference checks, and culture-fit evaluations. We verify work history, test relevant skills, and conduct multiple interviews to ensure they meet our high standards before presenting them to you.",
      },
      {
        slug: "get-started",
        question: "How can I get started?",
        answer:
          "Simply book a discovery call through our website or contact form. We'll have a free strategy session to understand your needs, then begin sourcing candidates. You could be interviewing qualified professionals within 3-10 days.",
      },
      {
        slug: "part-time",
        question: "Can I hire outsourced talent on a part-time basis?",
        answer:
          "Absolutely! We offer flexible hiring arrangements including full-time, part-time, and project-based engagements. Whether you need 10 hours a week or 40 hours a week, we can match you with professionals who fit your specific requirements and budget.",
      },
      {
        slug: "scaling",
        question: "What if I need to scale my team quickly for an ongoing project?",
        answer:
          "We specialize in rapid team scaling. Our extensive talent network and streamlined vetting process allow us to quickly deploy multiple team members when you need them. We can help you scale up (or down) as your project demands change, with minimal onboarding friction.",
      },
      {
        slug: "offshore-benefits",
        question: "What are the benefits of hiring an offshore team?",
        answer:
          "Hiring offshore provides significant cost savings (typically 60-70% compared to local hires), access to a global talent pool, round-the-clock productivity across time zones, scalability without long-term commitments, and the ability to focus your local team on core strategic initiatives while offshore teams handle operational tasks.",
      },
      {
        slug: "start-timeline",
        question: "Once I decide who to hire, how soon can they start?",
        answer:
          "Once you've selected your ideal candidate, they can typically start within 1-2 weeks. This timeframe includes finalizing contracts, setting up equipment and systems access, and completing any necessary onboarding. In urgent situations, we can often accelerate this timeline to get your new team member working even sooner.",
      },
    ],
    []
  );

  // null = none open, -1 = all open, >=0 = that index open
  const [openIndex, setOpenIndex] = useState<number | null>(null); // ✅ Fixed: was 0, now null
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle URL hash on mount and scroll to FAQ if needed
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    
    // Check if it's a FAQ hash
    if (hash.startsWith("#faq")) {
      // Extract slug or number from hash
      const slugMatch = hash.match(/^#faq-(.+)$/);
      
      if (slugMatch) {
        const identifier = slugMatch[1];
        
        // Try to find by slug first
        let idx = faqs.findIndex((faq) => faq.slug === identifier);
        
        // Fallback to number (for backward compatibility)
        if (idx === -1 && !isNaN(Number(identifier))) {
          idx = Number(identifier);
        }
        
        // If valid index found, open it and scroll to it
        if (idx >= 0 && idx < faqs.length) {
          setOpenIndex(idx);
          
          // Smooth scroll to the FAQ section after a brief delay
          setTimeout(() => {
            faqRefs.current[idx]?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 100);
        } else if (hash === "#faq") {
          // Just scroll to FAQ section
          setTimeout(() => {
            const section = document.getElementById("faq");
            section?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync hash when state changes (only when user interacts)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    
    if (openIndex === null || openIndex === -1) {
      // Only clear hash if we're currently on a FAQ hash
      if (url.hash.startsWith("#faq-")) {
        url.hash = "#faq";
        history.replaceState(null, "", url.toString());
      }
    } else if (openIndex >= 0 && openIndex < faqs.length) {
      // Use slug instead of index for better URLs
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

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        // Focus next FAQ
        if (idx < faqs.length - 1) {
          const nextButton = document.getElementById(`faq-btn-${idx + 1}`);
          nextButton?.focus();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        // Focus previous FAQ
        if (idx > 0) {
          const prevButton = document.getElementById(`faq-btn-${idx - 1}`);
          prevButton?.focus();
        }
        break;
      case "Home":
        e.preventDefault();
        // Focus first FAQ
        const firstButton = document.getElementById(`faq-btn-0`);
        firstButton?.focus();
        break;
      case "End":
        e.preventDefault();
        // Focus last FAQ
        const lastButton = document.getElementById(`faq-btn-${faqs.length - 1}`);
        lastButton?.focus();
        break;
    }
  };

  // Split FAQs into two columns for desktop (7 questions each for 14 total)
  const leftColumnFaqs = faqs.slice(0, 7);
  const rightColumnFaqs = faqs.slice(7, 14);

  return (
    <Section id="faq" background="dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 text-lg">
            If you can't find the answer you're looking for, simply contact us and one of our friendly admin team will be in touch with you within 1 business day.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={expandAll}
              className="text-sm px-3 py-1.5 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-all duration-200"
              aria-label="Expand all FAQs"
            >
              Expand all
            </button>
            <button
              onClick={collapseAll}
              className="text-sm px-3 py-1.5 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-all duration-200"
              aria-label="Collapse all FAQs"
            >
              Collapse all
            </button>
          </div>
        </div>

        {/* Two-column layout on desktop, single column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4" role="list">
            {leftColumnFaqs.map((faq, idx) => {
              const open = isOpen(idx);
              return (
                <div
                  key={faq.slug}
                  ref={(el) => {
                    faqRefs.current[idx] = el;
                  }}
                  className="rounded-lg overflow-hidden transition-all duration-200
                    bg-[#1E2430] border border-white/10
                    hover:shadow-md hover:border-primary-orange/50 hover:bg-[#252b3a]"
                  role="listitem"
                >
                  <button
                    id={`faq-btn-${idx}`}
                    onClick={() => toggleFAQ(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${idx}`}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E2430]"
                  >
                    <span className="text-white font-semibold pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 text-primary-orange ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={`faq-panel-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="px-5 pb-5 pt-1 leading-relaxed text-gray-300">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4" role="list">
            {rightColumnFaqs.map((faq, idx) => {
              const actualIdx = idx + 7; // Offset by 7 for correct indexing
              const open = isOpen(actualIdx);
              return (
                <div
                  key={faq.slug}
                  ref={(el) => {
                    faqRefs.current[actualIdx] = el;
                  }}
                  className="rounded-lg overflow-hidden transition-all duration-200
                    bg-[#1E2430] border border-white/10
                    hover:shadow-md hover:border-primary-orange/50 hover:bg-[#252b3a]"
                  role="listitem"
                >
                  <button
                    id={`faq-btn-${actualIdx}`}
                    onClick={() => toggleFAQ(actualIdx)}
                    onKeyDown={(e) => handleKeyDown(e, actualIdx)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${actualIdx}`}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E2430]"
                  >
                    <span className="text-white font-semibold pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 text-primary-orange ${
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
                      open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="px-5 pb-5 pt-1 leading-relaxed text-gray-300">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}