"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/app/lib/blog";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-4 h-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  "Hiring Strategy":    "bg-[#57C5CF]/10 text-[#57C5CF] border-[#57C5CF]/30",
  "Remote Work":        "bg-[#4FFFB0]/10 text-[#4FFFB0] border-[#4FFFB0]/30",
  "Global Outsourcing": "bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/30",
  "Team Management":    "bg-[#378B57]/10 text-[#378B57] border-[#378B57]/30",
  "Country Guides":     "bg-purple-400/10 text-purple-400 border-purple-400/30",
  "Finance & Growth":   "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
  "Global Hiring":      "bg-sky-400/10 text-sky-400 border-sky-400/30",
};
function categoryPill(cat: string) {
  return CATEGORY_COLORS[cat] ?? "bg-[#57C5CF]/10 text-[#57C5CF] border-[#57C5CF]/30";
}

/* ─── Reading progress bar ─────────────────────────────────────────────────── */
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 transition-all duration-100"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, #57C5CF 0%, #4FFFB0 100%)",
      }}
    />
  );
}

/* ─── Table of contents ────────────────────────────────────────────────────── */
function TableOfContents({ sections }: { sections: { h2: string }[] }) {
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    const headings = sections.map((_, i) =>
      document.getElementById(`section-${i}`)
    );

    function onScroll() {
      const scrollY = window.scrollY + 120;
      let current = 0;
      headings.forEach((el, i) => {
        if (el && el.offsetTop <= scrollY) current = i;
      });
      setActive(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="rounded-2xl bg-[#1E2430] border border-white/10 p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-0.5 h-4 rounded-full bg-[#57C5CF]" />
        <span className="text-[#57C5CF] text-xs font-bold tracking-widest uppercase">
          Contents
        </span>
      </div>
      <ol className="space-y-2.5">
        {sections.map((s, i) => (
          <li key={i}>
            <a
              href={`#section-${i}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(`section-${i}`);
                if (el) {
                  window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
                }
              }}
              className={`flex items-start gap-2 text-sm leading-snug transition-colors duration-150 ${
                active === i
                  ? "text-[#57C5CF] font-semibold"
                  : "text-white/50 hover:text-white/80 font-medium"
              }`}
            >
              <span
                className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full transition-colors duration-150 ${
                  active === i ? "bg-[#57C5CF]" : "bg-white/20"
                }`}
              />
              {s.h2}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ─── FAQ Accordion ────────────────────────────────────────────────────────── */
function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="mb-16" aria-label="Frequently Asked Questions">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-0.5 flex-1 max-w-[40px]" style={{ background: "linear-gradient(90deg, #57C5CF, transparent)" }} />
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-[#57C5CF]/40 bg-[#1E2430]"
                  : "border-white/10 bg-[#1E2430]/60 hover:border-white/20"
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span className="text-white font-bold text-base leading-snug pr-2">
                  {item.q}
                </span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isOpen
                      ? "bg-[#57C5CF] rotate-45"
                      : "bg-white/10"
                  }`}
                >
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              {/* Smooth accordion */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="px-6 pb-5">
                    <div className="h-px bg-white/5 mb-4" />
                    <p className="text-white/70 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Social share buttons ─────────────────────────────────────────────────── */
function SocialShare({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://remoteacktive.com/blog/${slug}`;

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-3">
      <span className="text-white/40 text-xs font-bold tracking-widest uppercase">
        Share
      </span>

      {/* Twitter / X */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#57C5CF]/50 hover:bg-[#57C5CF]/10 transition-all duration-200"
      >
        {/* X logo */}
        <svg className="w-3.5 h-3.5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#57C5CF]/50 hover:bg-[#57C5CF]/10 transition-all duration-200"
      >
        <svg className="w-3.5 h-3.5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* Copy link */}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-200 ${
          copied
            ? "border-[#4FFFB0]/60 bg-[#4FFFB0]/10"
            : "hover:border-[#57C5CF]/50 hover:bg-[#57C5CF]/10"
        }`}
      >
        {copied ? (
          <svg className="w-3.5 h-3.5 text-[#4FFFB0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
      </button>

      {copied && (
        <span className="text-[#4FFFB0] text-xs font-semibold">Copied!</span>
      )}
    </div>
  );
}

/* ─── Newsletter CTA ───────────────────────────────────────────────────────── */
function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: email.trim(),
          formType: "newsletter",
          description: "Newsletter subscription from blog article",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else if (res.status === 429) {
        setStatus("error");
        setErrorMsg("Too many requests. Please try again later.");
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection.");
    }
  }

  return (
    <div
      className="rounded-2xl border border-[#57C5CF]/20 p-8 md:p-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d1f35 0%, #0F1926 60%, #0a2020 100%)",
      }}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-64 h-64 opacity-20"
        style={{
          background: "radial-gradient(circle, #4FFFB0 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-0.5 h-5 rounded-full bg-[#4FFFB0]" />
          <span className="text-[#4FFFB0] text-xs font-bold tracking-widest uppercase">
            Weekly Insights
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
          Get weekly insights on remote hiring
        </h3>
        <p className="text-white/60 text-sm mb-6 max-w-md">
          No spam. Just practical tips on building your remote team, saving on
          hiring costs, and scaling with global talent.
        </p>

        {status === "success" ? (
          <div className="flex items-center gap-3 bg-[#4FFFB0]/10 border border-[#4FFFB0]/30 rounded-xl px-5 py-4">
            <svg className="w-5 h-5 text-[#4FFFB0] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[#4FFFB0] font-semibold text-sm">
              You&apos;re subscribed! We&apos;ll be in touch soon.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#57C5CF]/50 focus:border-[#57C5CF]/50 transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-grad text-white font-bold px-6 py-3 rounded-xl text-sm flex-shrink-0 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Subscribing…
                </>
              ) : (
                <>Subscribe →</>
              )}
            </button>
          </form>
        )}

        {status === "error" && errorMsg && (
          <p className="mt-3 text-red-400 text-xs font-medium">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}

/* ─── Main article client component ───────────────────────────────────────── */
interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function ArticleClient({ post, relatedPosts }: Props) {
  return (
    <>
      <ReadingProgressBar />

      <div
        className="min-h-screen"
        style={{ background: "linear-gradient(to bottom, #0f1f2e 0%, #0F1926 100%)" }}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: "linear-gradient(90deg, #57C5CF 0%, #378B57 50%, #4FFFB0 100%)",
          }}
        />

        <div className="pt-24 pb-20 px-6">
          <div className="max-w-7xl mx-auto">

            {/* ── Breadcrumb ─────────────────────────────────────────── */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm text-white/50 font-medium mb-10"
            >
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white/70 truncate max-w-[240px]">{post.h1}</span>
            </nav>

            {/* ── Two-column layout: article + sidebar ───────────────── */}
            <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 xl:gap-16 items-start">

              {/* ── MAIN COLUMN ──────────────────────────────────────── */}
              <div className="min-w-0">

                {/* Article header */}
                <header className="mb-10">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span
                      className={`border text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${categoryPill(post.category)}`}
                    >
                      {post.category}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
                    {post.h1}
                  </h1>

                  <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    {/* Author */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#57C5CF] to-[#378B57] flex items-center justify-center text-white text-xs font-bold">
                        RA
                      </div>
                      <span className="text-white/70 text-sm font-medium">
                        Remote ACKtive Team
                      </span>
                    </div>

                    <span className="text-white/20">·</span>

                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{post.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Share row */}
                  <SocialShare title={post.h1} slug={post.slug} />

                  {/* Divider */}
                  <div
                    className="mt-6 h-px w-full"
                    style={{
                      background: "linear-gradient(90deg, rgba(87,197,207,0.3) 0%, transparent 100%)",
                    }}
                  />
                </header>

                {/* HERO_IMAGE_PLACEHOLDER */}

                {/* ── Article body ───────────────────────────────────── */}
                <article className="mb-16">
                  {post.sections.map((section, idx) => (
                    <div
                      key={idx}
                      id={`section-${idx}`}
                      className="mb-12 scroll-mt-24"
                    >
                      {/* H2 with teal left accent bar */}
                      <div className="flex items-start gap-3 mb-5">
                        <div
                          className="flex-shrink-0 w-1 rounded-full mt-1"
                          style={{
                            background: "linear-gradient(to bottom, #57C5CF, #4FFFB0)",
                            height: "calc(1.5em + 8px)",
                          }}
                        />
                        <h2
                          className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-snug"
                        >
                          {section.h2}
                        </h2>
                      </div>

                      {section.body.map((para, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-white/75 text-base md:text-lg leading-8 mb-4"
                        >
                          {para}
                        </p>
                      ))}

                      {section.bullets && section.bullets.length > 0 && (
                        <div className="mt-5 rounded-xl bg-[#1E2430] border border-white/8 p-5 md:p-6">
                          <ul className="space-y-3">
                            {section.bullets.map((item, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-3">
                                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#4FFFB0]/15 flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-[#4FFFB0]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                                <span className="text-white/80 text-base leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </article>

                {/* ── Mid-article CTA ────────────────────────────────── */}
                <div
                  className="rounded-2xl p-8 md:p-10 mb-16 border border-[#57C5CF]/15 relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #0D1F35 0%, #0F1926 55%, #0A2020 100%)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 right-0 w-48 h-48 opacity-20"
                    style={{
                      background: "radial-gradient(circle, #57C5CF 0%, transparent 70%)",
                      transform: "translate(30%, -30%)",
                    }}
                  />
                  <div className="relative z-10 text-center">
                    <p className="text-[#57C5CF] text-xs font-bold tracking-widest uppercase mb-3">
                      See your savings
                    </p>
                    <h2 className="text-xl md:text-2xl font-extrabold text-white mb-3">
                      Find Out How Much You Could Save in 30 Minutes
                    </h2>
                    <p className="text-white/60 text-sm max-w-md mx-auto mb-6">
                      Book a free discovery call and we&apos;ll show you exactly which
                      roles to hire first and how much you&apos;ll save.
                    </p>
                    <Link
                      href="/book-a-call"
                      className="inline-flex items-center gap-2 btn-grad text-white font-bold px-7 py-3.5 rounded-full text-sm"
                    >
                      Book a Free Strategy Call
                      <ArrowRight />
                    </Link>
                  </div>
                </div>

                {/* ── FAQ ────────────────────────────────────────────── */}
                {post.faq.length > 0 && (
                  <FaqAccordion items={post.faq} />
                )}

                {/* ── Newsletter CTA ─────────────────────────────────── */}
                <div className="mb-16">
                  <NewsletterCTA />
                </div>

                {/* ── Related articles ───────────────────────────────── */}
                {relatedPosts.length > 0 && (
                  <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-0.5 w-8 rounded-full" style={{ background: "linear-gradient(90deg, #57C5CF, transparent)" }} />
                      <h2 className="text-xl font-extrabold text-white">
                        Related Articles
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {relatedPosts.map((other) => (
                        <Link
                          key={other.slug}
                          href={`/blog/${other.slug}`}
                          className="group flex flex-col rounded-xl border border-white/10 bg-[#1E2430] hover:border-[#57C5CF]/40 transition-all duration-300 p-5 overflow-hidden"
                        >
                          <span className="text-[#57C5CF] text-xs font-bold uppercase tracking-wide mb-2">
                            {other.category}
                          </span>
                          <h3 className="text-white text-sm font-bold leading-snug group-hover:text-[#57C5CF] transition-colors duration-200 mb-3 flex-1">
                            {other.h1}
                          </h3>
                          <span className="text-[#4FFFB0] text-xs font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                            Read article <ArrowRight className="w-3 h-3" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* ── Back to blog ────────────────────────────────────── */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-white/50 font-medium hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blog
                  </Link>

                  <Link
                    href="/book-a-call"
                    className="inline-flex items-center gap-2 btn-grad text-white font-bold px-5 py-2.5 rounded-full text-sm"
                  >
                    Book a Call <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
              {/* END MAIN COLUMN */}

              {/* ── SIDEBAR ──────────────────────────────────────────── */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <TableOfContents sections={post.sections} />

                  {/* Quick CTA card */}
                  <div
                    className="rounded-2xl border border-[#4FFFB0]/20 p-6"
                    style={{
                      background: "linear-gradient(135deg, #0d1f35 0%, #0F1926 100%)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-0.5 h-4 rounded-full bg-[#4FFFB0]" />
                      <span className="text-[#4FFFB0] text-xs font-bold tracking-widest uppercase">
                        Free Strategy Call
                      </span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      Learn exactly how much you could save by switching to remote talent from LATAM.
                    </p>
                    <Link
                      href="/book-a-call"
                      className="flex items-center justify-center gap-2 btn-grad text-white font-bold px-4 py-3 rounded-xl text-sm w-full"
                    >
                      Book a Free Call <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </aside>
              {/* END SIDEBAR */}

            </div>
            {/* END TWO-COLUMN LAYOUT */}

          </div>
        </div>
      </div>
    </>
  );
}
