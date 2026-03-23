"use client";

import Link from "next/link";
import { useState } from "react";
import { blogPosts, type BlogPost } from "@/app/lib/blog";

const CATEGORIES = [
  "All",
  "Hiring Strategy",
  "Remote Work",
  "Team Management",
  "Global Hiring",
  "Finance & Growth",
  "Global Outsourcing",
  "Country Guides",
];

const CATEGORY_COLORS: Record<string, { pill: string; bar: string }> = {
  "Hiring Strategy":    { pill: "bg-[#57C5CF]/10 text-[#57C5CF] border-[#57C5CF]/30",        bar: "#57C5CF" },
  "Remote Work":        { pill: "bg-[#4FFFB0]/10 text-[#4FFFB0] border-[#4FFFB0]/30",        bar: "#4FFFB0" },
  "Global Outsourcing": { pill: "bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/30",        bar: "#F5A623" },
  "Team Management":    { pill: "bg-[#378B57]/10 text-[#378B57] border-[#378B57]/30",        bar: "#378B57" },
  "Country Guides":     { pill: "bg-purple-400/10 text-purple-400 border-purple-400/30",     bar: "#a78bfa" },
  "Finance & Growth":   { pill: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",  bar: "#34d399" },
  "Global Hiring":      { pill: "bg-sky-400/10 text-sky-400 border-sky-400/30",              bar: "#38bdf8" },
};

function categoryPill(cat: string) {
  return CATEGORY_COLORS[cat]?.pill ?? "bg-[#57C5CF]/10 text-[#57C5CF] border-[#57C5CF]/30";
}
function categoryBar(cat: string) {
  return CATEGORY_COLORS[cat]?.bar ?? "#57C5CF";
}

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

export default function BlogClientPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const [featured, ...rest] = blogPosts;

  const filteredRest =
    activeCategory === "All"
      ? rest
      : rest.filter((p) => p.category === activeCategory);

  const showFeatured =
    activeCategory === "All" || featured.category === activeCategory;

  // Only show categories that have posts
  const availableCategories = CATEGORIES.filter((c) => {
    if (c === "All") return true;
    return blogPosts.some((p) => p.category === c);
  });

  return (
    <div className="bg-[#0F1926] min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl py-14">

        {/* ── Category filter tabs ──────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-12">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#57C5CF] text-[#0F1926] border-[#57C5CF] shadow-lg shadow-[#57C5CF]/20"
                  : "bg-white/5 text-white/70 border-white/10 hover:border-[#57C5CF]/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Featured post ─────────────────────────────────────────── */}
        {showFeatured && (
          <div className="mb-14">
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-5">
              Featured Article
            </p>

            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl overflow-hidden border border-white/10 hover:border-[#57C5CF]/40 transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, #1a2e3a 0%, #1E2430 60%, #132025 100%)",
              }}
            >
              {/* Top gradient accent */}
              <div
                className="h-1 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, #57C5CF 0%, #378B57 50%, #4FFFB0 100%)",
                }}
              />

              <div className="p-8 md:p-12 grid md:grid-cols-5 gap-8 items-center">
                {/* Left: text — 3 cols */}
                <div className="md:col-span-3">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="bg-[#4FFFB0]/15 border border-[#4FFFB0]/40 text-[#4FFFB0] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                      Featured
                    </span>
                    <span
                      className={`border text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full ${categoryPill(featured.category)}`}
                    >
                      {featured.category}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight group-hover:text-[#57C5CF] transition-colors duration-200 mb-4">
                    {featured.h1}
                  </h2>

                  <p className="text-white/70 text-base leading-relaxed mb-6 max-w-lg">
                    {featured.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{featured.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{featured.readTime}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[#4FFFB0] font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                      Read article <ArrowRight />
                    </span>
                  </div>
                </div>

                {/* Right: key insight card — 2 cols */}
                <div className="hidden md:block md:col-span-2">
                  <div className="rounded-xl bg-[#0F1926]/80 border border-[#57C5CF]/15 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-[#57C5CF]" />
                      <span className="text-[#57C5CF] text-xs font-bold tracking-widest uppercase">
                        Key Insight
                      </span>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {featured.sections[0]?.body[0]?.slice(0, 180)}…
                    </p>
                    {featured.sections[0]?.bullets && featured.sections[0].bullets!.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {featured.sections[0].bullets!.slice(0, 3).map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                            <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#4FFFB0] flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ── Article grid ──────────────────────────────────────────── */}
        {filteredRest.length > 0 && (
          <div>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-6">
              {activeCategory === "All" ? "All Articles" : activeCategory}
              {" "}
              <span className="text-white/20 font-normal normal-case">
                ({filteredRest.length} article{filteredRest.length !== 1 ? "s" : ""})
              </span>
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-[#1E2430] hover:border-[#57C5CF]/40 hover:bg-[#1a2535] transition-all duration-300 overflow-hidden"
                >
                  {/* Category color accent bar */}
                  <div
                    className="h-0.5 w-full flex-shrink-0"
                    style={{
                      background: `linear-gradient(90deg, ${categoryBar(post.category)} 0%, transparent 80%)`,
                    }}
                  />

                  <div className="flex flex-col flex-1 p-6">
                    <span
                      className={`self-start border text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full mb-4 ${categoryPill(post.category)}`}
                    >
                      {post.category}
                    </span>

                    <h3 className="text-white font-bold text-lg leading-snug group-hover:text-[#57C5CF] transition-colors duration-200 mb-3 flex-1">
                      {post.h1}
                    </h3>

                    <p className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3 text-white/40 text-xs">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <span className="text-[#4FFFB0] text-xs font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                        Read Article →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredRest.length === 0 && !showFeatured && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">
              No articles in this category yet.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 text-[#57C5CF] text-sm font-semibold hover:underline"
            >
              View all articles →
            </button>
          </div>
        )}

        {/* ── CTA Banner ────────────────────────────────────────────── */}
        <div className="mt-20">
          <div
            className="rounded-2xl p-10 md:p-14 text-center border border-[#57C5CF]/15 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #0D1F35 0%, #0F1926 55%, #0A2020 100%)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 100%, #57C5CF22 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-5">
                <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
                  Ready to act?
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Stop overpaying for talent.
              </h2>
              <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
                Save up to 70% on hiring costs and build a world-class remote
                team in 3–10 days.
              </p>
              <Link
                href="/book-a-call"
                className="inline-flex items-center gap-2 btn-grad text-white font-bold px-8 py-4 rounded-full text-base"
              >
                Book a Free Strategy Call
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
