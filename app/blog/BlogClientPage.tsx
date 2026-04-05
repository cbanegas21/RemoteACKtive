"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { blogPosts, type BlogPost } from "@/app/lib/blog";

/* ─── Categories ────────────────────────────────────────────────────────────── */

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
  "Hiring Strategy":    { pill: "bg-[#b8fce8]/10 text-[#b8fce8] border-[#b8fce8]/30",       bar: "#b8fce8" },
  "Remote Work":        { pill: "bg-[#a8e8f5]/10 text-[#a8e8f5] border-[#a8e8f5]/30",       bar: "#a8e8f5" },
  "Global Outsourcing": { pill: "bg-[#a8e8f5]/10 text-[#a8e8f5] border-[#a8e8f5]/30",       bar: "#a8e8f5" },
  "Team Management":    { pill: "bg-[#b8fce8]/10 text-[#b8fce8] border-[#b8fce8]/30",       bar: "#b8fce8" },
  "Country Guides":     { pill: "bg-[#a8e8f5]/10 text-[#a8e8f5] border-[#a8e8f5]/30",       bar: "#a8e8f5" },
  "Finance & Growth":   { pill: "bg-[#b8fce8]/10 text-[#b8fce8] border-[#b8fce8]/30",       bar: "#b8fce8" },
  "Global Hiring":      { pill: "bg-[#a8e8f5]/10 text-[#a8e8f5] border-[#a8e8f5]/30",       bar: "#a8e8f5" },
};

function categoryPill(cat: string) {
  return CATEGORY_COLORS[cat]?.pill ?? "bg-[#b8fce8]/10 text-[#b8fce8] border-[#b8fce8]/30";
}
function categoryBar(cat: string) {
  return CATEGORY_COLORS[cat]?.bar ?? "#b8fce8";
}

/* Derive a cover image path from slug if coverImage is not set */
function getCoverImage(post: BlogPost): string | null {
  if (post.coverImage) return post.coverImage;
  return `/images/blog/${post.slug}.png`;
}

/* ─── Abstract gradient cover (fallback) ───────────────────────────────────── */
function AbstractCover({
  category,
  title,
  className,
}: {
  category: string;
  title: string;
  className?: string;
}) {
  const bar = categoryBar(category);
  const letter = title.charAt(0).toUpperCase();

  const gradients: Record<string, string> = {
    "Hiring Strategy":    "linear-gradient(135deg, #0a1f1a 0%, #0d2b24 60%, #051510 100%)",
    "Remote Work":        "linear-gradient(135deg, #091828 0%, #0d2035 60%, #071422 100%)",
    "Team Management":    "linear-gradient(135deg, #0f1a14 0%, #152212 60%, #091205 100%)",
    "Global Hiring":      "linear-gradient(135deg, #090e1f 0%, #0d1530 60%, #050d1a 100%)",
    "Finance & Growth":   "linear-gradient(135deg, #0a1c14 0%, #0e2418 60%, #061008 100%)",
    "Global Outsourcing": "linear-gradient(135deg, #1a1208 0%, #221508 60%, #0d0902 100%)",
    "Country Guides":     "linear-gradient(135deg, #120d2a 0%, #1a1040 60%, #0d091e 100%)",
  };
  const bg = gradients[category] ?? gradients["Hiring Strategy"];

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
          fontSize: "clamp(90px, 25vw, 200px)",
          fontWeight: 900,
          color: `${bar}07`,
          fontFamily: "var(--font-heading)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
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

/* ─── Card image with abstract fallback ─────────────────────────────────────── */
function CardImage({
  post,
  className,
  priority = false,
}: {
  post: BlogPost;
  className?: string;
  priority?: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const src = getCoverImage(post);

  if (!src || imgError) {
    return (
      <AbstractCover
        category={post.category}
        title={post.h1}
        className={className}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={src}
        alt={post.h1}
        fill
        priority={priority}
        className="object-cover"
        onError={() => setImgError(true)}
        sizes="(max-width: 768px) 100vw, 60vw"
      />
    </div>
  );
}

/* ─── Arrow icon ─────────────────────────────────────────────────────────────── */
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-4 h-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}

/* ─── Main component ────────────────────────────────────────────────────────── */
export default function BlogClientPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const [featured, ...rest] = blogPosts;

  const filteredRest =
    activeCategory === "All"
      ? rest
      : rest.filter((p) => p.category === activeCategory);

  const showFeatured =
    activeCategory === "All" || featured.category === activeCategory;

  const availableCategories = CATEGORIES.filter((c) => {
    if (c === "All") return true;
    return blogPosts.some((p) => p.category === c);
  });

  return (
    <div className="bg-[#04090f] min-h-screen">

      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="pt-36 pb-16 px-6 text-center relative overflow-hidden" style={{ background: "#04090f" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(168,232,245,0.08) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: "rgba(168,232,245,0.08)", border: "1px solid rgba(168,232,245,0.2)" }}>
            <span className="text-xs font-black tracking-[0.3em] uppercase" style={{ color: "#a8e8f5" }}>The Remote ACKtive Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Insights on Remote Hiring{" "}
            <span style={{ backgroundImage: "linear-gradient(90deg, #a8e8f5, #b8fce8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              &amp; LATAM Talent
            </span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Practical guides on remote hiring, outsourcing strategy, global talent,
            and building high-performance distributed teams.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl py-14">

        {/* ── Category filter pills ──────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-12">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#a8e8f5] text-[#090F0D] border-[#a8e8f5] shadow-lg shadow-[#a8e8f5]/20"
                  : "bg-transparent border-[#a8e8f5]/30 text-[#a8e8f5] hover:border-[#a8e8f5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Featured + secondary masonry layout ───────────────────────── */}
        {showFeatured && (
          <div className="mb-14">
            <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-5">
              Featured Article
            </p>

            <div className="grid md:grid-cols-5 gap-4 md:gap-6 items-stretch">

              {/* Featured post — large left card (~60%) */}
              <Link
                href={`/blog/${featured.slug}`}
                className="group md:col-span-3 rounded-2xl overflow-hidden cursor-pointer hover:scale-[0.98] hover:rotate-[0.3deg] transition-all duration-300 relative block"
                style={{ minHeight: "380px" }}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <CardImage
                    post={featured}
                    className="w-full h-full"
                    priority
                  />
                </div>

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.08) 100%)",
                  }}
                />

                {/* Content pinned to bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-[#a8e8f5]/20 border border-[#a8e8f5]/40 text-[#a8e8f5] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                      Featured
                    </span>
                    <span
                      className={`border text-[10px] font-bold tracking-wide uppercase px-3 py-1 rounded-full ${categoryPill(featured.category)}`}
                    >
                      {featured.category}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-tight mb-3 group-hover:text-[#a8e8f5] transition-colors duration-200">
                    {featured.h1}
                  </h2>

                  <div className="flex items-center gap-4">
                    <span className="text-white/60 text-sm">{featured.date}</span>
                    <span className="text-white/40 text-sm">·</span>
                    <span className="text-white/60 text-sm">{featured.readTime}</span>
                    <span className="inline-flex items-center gap-1.5 text-[#a8e8f5] text-sm font-semibold ml-auto group-hover:gap-2.5 transition-all duration-200">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Secondary stack — right column (~40%) */}
              {filteredRest.slice(0, 2).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group md:col-span-1 rounded-2xl overflow-hidden cursor-pointer hover:scale-[0.98] hover:rotate-[0.3deg] transition-all duration-300 relative flex flex-col"
                  style={{ minHeight: "180px" }}
                >
                  <div className="absolute inset-0">
                    <CardImage post={post} className="w-full h-full" />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.05) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <span
                      className={`border text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full mb-2 inline-block ${categoryPill(post.category)}`}
                    >
                      {post.category}
                    </span>
                    <h3 className="text-white font-bold text-sm leading-snug group-hover:text-[#a8e8f5] transition-colors duration-200">
                      {post.h1}
                    </h3>
                    <p className="text-white/50 text-xs mt-1">{post.readTime}</p>
                  </div>
                </Link>
              ))}

            </div>
          </div>
        )}

        {/* ── Remaining article grid ─────────────────────────────────────── */}
        {filteredRest.length > (showFeatured ? 2 : 0) && (
          <div>
            <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-6">
              {activeCategory === "All" ? "All Articles" : activeCategory}
              {" "}
              <span className="text-white/30 font-normal normal-case">
                ({filteredRest.length} article{filteredRest.length !== 1 ? "s" : ""})
              </span>
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showFeatured ? filteredRest.slice(2) : filteredRest).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer hover:scale-[0.98] hover:rotate-[0.3deg] transition-all duration-300 border border-white/8 hover:border-[#a8e8f5]/30"
                  style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)" }}
                >
                  {/* Card image / abstract cover */}
                  <div className="relative w-full aspect-[16/9] flex-shrink-0">
                    <CardImage
                      post={post}
                      className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <span
                      className={`self-start border text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full mb-3 ${categoryPill(post.category)}`}
                    >
                      {post.category}
                    </span>

                    <h3 className="text-white font-bold text-base leading-snug group-hover:text-[#a8e8f5] transition-colors duration-200 mb-2 flex-1">
                      {post.h1}
                    </h3>

                    <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2 text-white/50 text-xs">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <span className="text-[#a8e8f5] text-xs font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Empty state ────────────────────────────────────────────────── */}
        {filteredRest.length === 0 && !showFeatured && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">
              No articles in this category yet.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 text-[#a8e8f5] text-sm font-semibold hover:underline"
            >
              View all articles →
            </button>
          </div>
        )}

        {/* ── CTA Banner ────────────────────────────────────────────────── */}
        <div className="mt-20">
          <div
            className="rounded-2xl p-10 md:p-14 text-center border border-[#a8e8f5]/15 relative overflow-hidden"
            style={{
              background:
                "#04090f",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 100%, #a8e8f522 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#a8e8f5]/10 border border-[#a8e8f5]/20 rounded-full px-4 py-1.5 mb-5">
                <span className="text-sm font-bold text-[#a8e8f5] tracking-wide uppercase">
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
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                style={{ background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 50%, #b8fce8 100%)", color: "#04090f" }}
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
