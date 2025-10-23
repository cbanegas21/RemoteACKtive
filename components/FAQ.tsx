"use client";
import { useEffect, useMemo, useState } from "react";
import Section from "./Section";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = useMemo(
    () => [
      {
        question: "How do you ensure the quality of your hires?",
        answer:
          "Every candidate undergoes rigorous technical assessments, thorough reference checks, and culture-fit evaluations. We verify work history, test relevant skills, and conduct multiple interviews to ensure they meet our high standards before presenting them to you.",
      },
      {
        question: "Can I hire remote workers on a part-time basis?",
        answer:
          "Absolutely! We offer flexible engagement models including full-time, part-time, and contract positions. Whether you need 10 hours a week or 40, we can match you with professionals who fit your schedule and budget.",
      },
      {
        question: "Can I hire remote workers from specific countries or time zones?",
        answer:
          "Yes. We have access to talent across multiple regions and can prioritize candidates from specific countries or time zones based on your needs. Just let us know your preferences during the intake call.",
      },
      {
        question: "Are remote workers proficient in English or other languages?",
        answer:
          "Language proficiency is part of our vetting process. Most of our candidates have strong English communication skills, and we can also source multilingual professionals if your business requires additional languages.",
      },
      {
        question: "How can I get started?",
        answer:
          "Simply reach out through our contact form or schedule a call. We'll have an intake session to understand your needs, then begin sourcing candidates. You could be interviewing qualified professionals within days.",
      },
      {
        question: "How long does hiring usually take?",
        answer:
          "Our typical timeline is 3-10 days from intake to offer, depending on role complexity and your availability for interviews. We maintain a pre-vetted talent pool to accelerate the process without sacrificing quality.",
      },
      {
        question: "Do you handle payroll in every country?",
        answer:
          "We work with trusted payroll and compliance partners globally to ensure legal employment in most countries. During our intake call, we'll confirm we can support your preferred locations.",
      },
      {
        question: "Is there a minimum contract length?",
        answer:
          "We're flexible! While we recommend longer engagements for better ROI and team stability, we can accommodate various contract lengths based on your business needs. Discuss your requirements with us to find the best fit.",
      },
    ],
    []
  );

  // null = none open, -1 = all open, >=0 = that index open
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Open from hash on mount (e.g., #faq-3)
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const match = hash.match(/^#faq-(\d+)$/);
    if (match) {
      const idx = Number(match[1]);
      if (!Number.isNaN(idx) && idx >= 0 && idx < faqs.length) {
        setOpenIndex(idx);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync hash AFTER state changes (fixes the Router update error)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (openIndex === null || openIndex === -1) {
      url.hash = "";
    } else {
      url.hash = `#faq-${openIndex}`;
    }
    history.replaceState(null, "", url.toString());
  }, [openIndex]);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const expandAll = () => setOpenIndex(-1);
  const collapseAll = () => setOpenIndex(null);
  const isOpen = (idx: number) => openIndex === -1 || openIndex === idx;

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
              className="text-sm px-3 py-1.5 rounded-lg border border-white/20 bg-white/60 text-gray-900 hover:bg-white/80 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition"
            >
              Expand all
            </button>
            <button
              onClick={collapseAll}
              className="text-sm px-3 py-1.5 rounded-lg border border-white/20 bg-white/60 text-gray-900 hover:bg-white/80 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition"
            >
              Collapse all
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const open = isOpen(idx);
            return (
              <div
                key={idx}
                className="rounded-lg overflow-hidden transition
                  bg-white dark:bg-panel 
                  border border-gray-200 dark:border-white/10"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${idx}`}
                  className="w-full flex items-center justify-between p-5 text-left transition hover:bg-gray-50 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <span className="text-gray-900 dark:text-white font-semibold pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform text-gray-500 dark:text-gray-400 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  id={`faq-panel-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <div className="px-5 pb-5 leading-relaxed text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
