"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

/* Derive cover image from coverImage field, or slug-based path as fallback */
function getCoverImage(post: BlogPost): string | null {
  if (post.coverImage) return post.coverImage;
  return `/images/blog/${post.slug}.png`;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Hiring Strategy":    "bg-[#b8fce8]/10 text-[#b8fce8] border-[#b8fce8]/30",
  "Remote Work":        "bg-[#a8e8f5]/10 text-[#a8e8f5] border-[#a8e8f5]/30",
  "Global Outsourcing": "bg-[#a8e8f5]/10 text-[#a8e8f5] border-[#a8e8f5]/30",
  "Team Management":    "bg-[#b8fce8]/10 text-[#b8fce8] border-[#b8fce8]/30",
  "Country Guides":     "bg-[#a8e8f5]/10 text-[#a8e8f5] border-[#a8e8f5]/30",
  "Finance & Growth":   "bg-[#b8fce8]/10 text-[#b8fce8] border-[#b8fce8]/30",
  "Global Hiring":      "bg-[#a8e8f5]/10 text-[#a8e8f5] border-[#a8e8f5]/30",
};
function categoryPill(cat: string) {
  return CATEGORY_COLORS[cat] ?? "bg-[#b8fce8]/10 text-[#b8fce8] border-[#b8fce8]/30";
}

/* ─── Abstract cover art (fallback) ────────────────────────────────────────── */
function AbstractCover({
  category,
  title,
  className,
}: {
  category: string;
  title: string;
  className?: string;
}) {
  const barColors: Record<string, string> = {
    "Hiring Strategy":    "#b8fce8",
    "Remote Work":        "#a8e8f5",
    "Team Management":    "#b8fce8",
    "Global Hiring":      "#a8e8f5",
    "Finance & Growth":   "#b8fce8",
    "Global Outsourcing": "#a8e8f5",
    "Country Guides":     "#b8fce8",
  };
  const gradients: Record<string, string> = {
    "Hiring Strategy":    "linear-gradient(135deg, #0a1f1a 0%, #0d2b24 60%, #051510 100%)",
    "Remote Work":        "linear-gradient(135deg, #091828 0%, #0d2035 60%, #071422 100%)",
    "Team Management":    "linear-gradient(135deg, #0f1a14 0%, #152212 60%, #091205 100%)",
    "Global Hiring":      "linear-gradient(135deg, #090e1f 0%, #0d1530 60%, #050d1a 100%)",
    "Finance & Growth":   "linear-gradient(135deg, #0a1c14 0%, #0e2418 60%, #061008 100%)",
    "Global Outsourcing": "linear-gradient(135deg, #1a1208 0%, #221508 60%, #0d0902 100%)",
    "Country Guides":     "linear-gradient(135deg, #120d2a 0%, #1a1040 60%, #0d091e 100%)",
  };
  const bar = barColors[category] ?? "#b8fce8";
  const bg  = gradients[category] ?? gradients["Hiring Strategy"];
  const letter = title.charAt(0).toUpperCase();

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ background: bg }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${bar}25 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${bar}12 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontSize: "clamp(90px, 20vw, 200px)",
          fontWeight: 900,
          color: `${bar}07`,
          fontFamily: "var(--font-heading)",
          lineHeight: 1,
        }}
      >
        {letter}
      </div>
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${bar} 0%, ${bar}00 70%)` }}
      />
      <div className="absolute bottom-3 left-4">
        <span
          className="text-[10px] font-black tracking-[0.25em] uppercase"
          style={{ color: `${bar}70` }}
        >
          {category}
        </span>
      </div>
    </div>
  );
}

/* ─── Hero cover image with fallback ───────────────────────────────────────── */
function HeroCoverImage({ post }: { post: BlogPost }) {
  const [imgError, setImgError] = useState(false);
  const src = getCoverImage(post);

  if (!src || imgError) {
    return (
      <AbstractCover
        category={post.category}
        title={post.h1}
        className="w-full h-64 md:h-80 rounded-2xl mb-10"
      />
    );
  }

  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
      <Image
        src={src}
        alt={post.h1}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

/* ─── Reading progress bar ─────────────────────────────────────────────────── */
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
      );
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 transition-all duration-100"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, #a8e8f5 0%, #b8fce8 100%)",
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
      className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(168,232,245,0.15)", backdropFilter: "blur(8px)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-0.5 h-4 rounded-full bg-[#a8e8f5]" />
        <span className="text-[#a8e8f5] text-xs font-bold tracking-widest uppercase">
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
                  ? "text-[#a8e8f5] font-semibold"
                  : "text-white/50 hover:text-white font-medium"
              }`}
            >
              <span
                className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full transition-colors duration-150 ${
                  active === i ? "bg-[#a8e8f5]" : "bg-white/20"
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
        <div
          className="h-0.5 flex-1 max-w-[40px] rounded-full"
          style={{ background: "linear-gradient(90deg, #a8e8f5, transparent)" }}
        />
        <h2 className="text-2xl md:text-3xl font-bold text-white">
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
                  ? "border-[#a8e8f5]/40 bg-[#a8e8f5]/5"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
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
                    isOpen ? "bg-[#a8e8f5] rotate-45" : "bg-white/10"
                  }`}
                >
                  <svg
                    className={`w-3 h-3 ${isOpen ? "text-white" : "text-white/60"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="px-6 pb-5">
                    <div className="h-px bg-white/10 mb-4" />
                    <p className="text-white/75 text-sm leading-relaxed">
                      {item.a}
                    </p>
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
      <span className="text-white/50 text-xs font-bold tracking-widest uppercase">
        Share
      </span>

      {/* X / Twitter */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
        className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center hover:border-[#a8e8f5]/50 hover:bg-[#a8e8f5]/10 transition-all duration-200"
      >
        <svg className="w-3.5 h-3.5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center hover:border-[#a8e8f5]/50 hover:bg-[#a8e8f5]/10 transition-all duration-200"
      >
        <svg className="w-3.5 h-3.5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* Copy link */}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className={`w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center transition-all duration-200 ${
          copied
            ? "border-[#a8e8f5]/60 bg-[#a8e8f5]/10"
            : "hover:border-[#a8e8f5]/50 hover:bg-[#a8e8f5]/10"
        }`}
      >
        {copied ? (
          <svg
            className="w-3.5 h-3.5 text-[#a8e8f5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg
            className="w-3.5 h-3.5 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        )}
      </button>

      {copied && (
        <span className="text-[#a8e8f5] text-xs font-semibold">Copied!</span>
      )}
    </div>
  );
}

/* ─── Newsletter CTA ───────────────────────────────────────────────────────── */
function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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
    <div className="rounded-2xl border border-[#a8e8f5]/20 p-8 md:p-10 relative overflow-hidden bg-[#04090f]">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-64 h-64 opacity-10"
        style={{
          background: "radial-gradient(circle, #a8e8f5 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-0.5 h-5 rounded-full bg-[#a8e8f5]" />
          <span className="text-[#a8e8f5] text-xs font-bold tracking-widest uppercase">
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
          <div className="flex items-center gap-3 bg-[#a8e8f5]/10 border border-[#a8e8f5]/30 rounded-xl px-5 py-4">
            <svg
              className="w-5 h-5 text-[#a8e8f5] flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[#a8e8f5] font-semibold text-sm">
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
              className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#a8e8f5]/50 focus:border-[#a8e8f5]/50 transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="font-bold px-6 py-3 rounded-xl text-sm flex-shrink-0 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 50%, #b8fce8 100%)", color: "#04090f" }}
            >
              {status === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
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
          <p className="mt-3 text-red-500 text-xs font-medium">{errorMsg}</p>
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

      <div className="min-h-screen bg-[#04090f]">
        {/* Top teal accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: "linear-gradient(90deg, #a8e8f5 0%, #b8fce8 50%, #a8e8f5 100%)",
          }}
        />

        <div className="pt-24 pb-20 px-6">
          <div className="max-w-7xl mx-auto">

            {/* ── Breadcrumb ─────────────────────────────────────────── */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm text-white/50 font-medium mb-10"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <svg
                className="w-3 h-3 opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <svg
                className="w-3 h-3 opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white/70 truncate max-w-[240px]">{post.h1}</span>
            </nav>

            {/* ── Two-column layout: article + sidebar ───────────────── */}
            <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 xl:gap-16 items-start">

              {/* ── MAIN COLUMN ──────────────────────────────────────── */}
              <div className="min-w-0">

                {/* Article header */}
                <header className="mb-8">
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
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a8e8f5] to-[#b8fce8] flex items-center justify-center text-white text-xs font-bold">
                        RA
                      </div>
                      <span className="text-white/70 text-sm font-medium">
                        Remote ACKtive Team
                      </span>
                    </div>

                    <span className="text-white/30">·</span>

                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{post.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
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
                      background:
                        "linear-gradient(90deg, rgba(168,232,245,0.3) 0%, transparent 100%)",
                    }}
                  />
                </header>

                {/* ── Hero cover image (above article body) ──────────── */}
                <HeroCoverImage post={post} />

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
                          className="flex-shrink-0 w-1 rounded-full mt-1 bg-[#a8e8f5]"
                          style={{ height: "calc(1.5em + 8px)" }}
                        />
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug">
                          {section.h2}
                        </h2>
                      </div>

                      {section.body.map((para, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-white/80 text-base md:text-lg leading-relaxed mb-4"
                        >
                          {para}
                        </p>
                      ))}

                      {section.bullets && section.bullets.length > 0 && (
                        <div className="mt-5 rounded-xl p-5 md:p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <ul className="space-y-3">
                            {section.bullets.map((item, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-3">
                                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#a8e8f5]/15 flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-[#a8e8f5]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </span>
                                <span className="text-white/80 text-base leading-relaxed">
                                  {item}
                                </span>
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
                  className="rounded-2xl p-8 md:p-10 mb-16 relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(168,232,245,0.15)",
                  }}
                >
                  <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #a8e8f5, #b8fce8, transparent)" }} />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 right-0 w-64 h-64 opacity-10"
                    style={{
                      background: "radial-gradient(circle, #b8fce8 0%, transparent 70%)",
                      transform: "translate(30%, -30%)",
                    }}
                  />
                  <div className="relative z-10 text-center">
                    <p className="text-[#a8e8f5] text-xs font-bold tracking-widest uppercase mb-3">
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
                      className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-[#04090f] transition-all hover:scale-[1.02]"
                      style={{ background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 50%, #b8fce8 100%)" }}
                    >
                      Book a Free Strategy Call
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* ── FAQ ────────────────────────────────────────────── */}
                {post.faq.length > 0 && <FaqAccordion items={post.faq} />}

                {/* ── Newsletter CTA ─────────────────────────────────── */}
                <div className="mb-16">
                  <NewsletterCTA />
                </div>

                {/* ── Related articles ───────────────────────────────── */}
                {relatedPosts.length > 0 && (
                  <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="h-0.5 w-8 rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #a8e8f5, transparent)",
                        }}
                      />
                      <h2 className="text-xl font-bold text-white">
                        Related Articles
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {relatedPosts.map((other) => (
                        <Link
                          key={other.slug}
                          href={`/blog/${other.slug}`}
                          className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#a8e8f5]/40 transition-all duration-300 p-5 overflow-hidden"
                        >
                          <span className="text-[#a8e8f5] text-xs font-bold uppercase tracking-wide mb-2">
                            {other.category}
                          </span>
                          <h3 className="text-white text-sm font-bold leading-snug group-hover:text-[#a8e8f5] transition-colors duration-200 mb-3 flex-1">
                            {other.h1}
                          </h3>
                          <span className="text-[#a8e8f5] text-xs font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
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
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to Blog
                  </Link>

                  <Link
                    href="/book-a-call"
                    className="inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-full text-sm transition-all hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 50%, #b8fce8 100%)", color: "#04090f" }}
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
                    className="rounded-2xl p-6"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(168,232,245,0.15)",
                    }}
                  >
                    <div className="h-px w-full mb-4" style={{ background: "linear-gradient(90deg, #a8e8f5, transparent)" }} />
                    <span className="text-[#a8e8f5] text-xs font-bold tracking-widest uppercase">
                      Free Strategy Call
                    </span>
                    <p className="text-white/70 text-sm leading-relaxed mt-2 mb-4">
                      Learn exactly how much you could save by switching to
                      remote talent from LATAM.
                    </p>
                    <Link
                      href="/book-a-call"
                      className="flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold w-full text-[#04090f] transition-all hover:scale-[1.02]"
                      style={{ background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 50%, #b8fce8 100%)" }}
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
