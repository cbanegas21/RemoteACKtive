"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Section from "./Section";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = useMemo(
    () => [
      {
        slug: "quality",
        question: "How do you ensure the quality of your hires?",
        answer:
          "Every candidate undergoes rigorous technical assessments, thorough reference checks, and culture-fit evaluations. We verify work history, test relevant skills, and conduct multiple interviews to ensure they meet our high standards before presenting them to you.",
      },
      {
        slug: "part-time",
        question: "Can I hire remote workers on a part-time basis?",
        answer:
          "Absolutely! We offer flexible engagement models including full-time, part-time, and contract positions. Whether you need 10 hours a week or 40, we can match you with professionals who fit your schedule and budget.",
      },
      {
        slug: "locations",
        question: "Can I hire remote workers from specific countries or time zones?",
        answer:
          "Yes. We have access to talent across multiple regions and can prioritize candidates from specific countries or time zones based on your needs. Just let us know your preferences during the intake call.",
      },
      {
        slug: "language",
        question: "Are remote workers proficient in English or other languages?",
        answer:
          "Language proficiency is part of our vetting process. Most of our candidates have strong English communication skills, and we can also source multilingual professionals if your business requires additional languages.",
      },
      {
        slug: "get-started",
        question: "How can I get started?",
        answer:
          "Simply reach out through our contact form or schedule a call. We'll have an intake session to understand your needs, then begin sourcing candidates. You could be interviewing qualified professionals within days.",
      },
      {
        slug: "timeline",
        question: "How long does hiring usually take?",
        answer:
          "Our typical timeline is 3-10 days from intake to offer, depending on role complexity and your availability for interviews. We maintain a pre-vetted talent pool to accelerate the process without sacrificing quality.",
      },
      {
        slug: "payroll",
        question: "Do you handle payroll in every country?",
        answer:
          "We work with trusted payroll and compliance partners globally to ensure legal employment in most countries. During our intake call, we'll confirm we can support your preferred locations.",
      },
      {
        slug: "contract-length",
        question: "Is there a minimum contract length?",
        answer:
          "We're flexible! While we recommend longer engagements for better ROI and team stability, we can accommodate various contract lengths based on your business needs. Discuss your requirements with us to find the best fit.",
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

  return (
    <Section id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Everything you need to know about working with us
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={expandAll}
              className="text-sm px-3 py-1.5 rounded-lg border border-white/20 bg-white/60 text-gray-900 hover:bg-white/80 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition-all duration-200"
              aria-label="Expand all FAQs"
            >
              Expand all
            </button>
            <button
              onClick={collapseAll}
              className="text-sm px-3 py-1.5 rounded-lg border border-white/20 bg-white/60 text-gray-900 hover:bg-white/80 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition-all duration-200"
              aria-label="Collapse all FAQs"
            >
              Collapse all
            </button>
          </div>
        </div>

        <div className="space-y-4" role="list">
          {faqs.map((faq, idx) => {
            const open = isOpen(idx);
            return (
              <div
                key={faq.slug}
                ref={(el) => {
                  faqRefs.current[idx] = el;
                }}
                className="rounded-lg overflow-hidden transition-all duration-200
                  bg-white dark:bg-panel 
                  border border-gray-200 dark:border-white/10
                  hover:shadow-md dark:hover:border-white/20"
                role="listitem"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleFAQ(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${idx}`}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink"
                >
                  <span className="text-gray-900 dark:text-white font-semibold pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 text-gray-500 dark:text-gray-400 ${
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
                    <div className="px-5 pb-5 pt-1 leading-relaxed text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helpful hint */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          Use arrow keys to navigate between questions
        </p>
      </div>
    </Section>
  );
}