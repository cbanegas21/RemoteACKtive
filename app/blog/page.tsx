import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/app/lib/blog";

export const metadata: Metadata = {
  title: "Remote Staffing Blog | Insights on Global Hiring & Outsourcing",
  description:
    "Expert articles on remote hiring, outsourcing strategy, cost savings, and building global teams. Learn how to scale smarter with Remote ACKtive.",
  alternates: {
    canonical: "https://remoteacktive.com/blog",
  },
  openGraph: {
    title: "Remote Staffing Blog | Remote ACKtive",
    description:
      "Expert articles on remote hiring, outsourcing strategy, cost savings, and building global teams.",
    url: "https://remoteacktive.com/blog",
    siteName: "Remote ACKtive",
    type: "website",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Hiring Strategy": "bg-[#57C5CF]/10 text-[#57C5CF] border-[#57C5CF]/30",
  "Remote Work": "bg-[#4FFFB0]/10 text-[#4FFFB0] border-[#4FFFB0]/30",
  "Global Outsourcing": "bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/30",
  "Team Management": "bg-[#378B57]/10 text-[#378B57] border-[#378B57]/30",
  "Country Guides": "bg-purple-400/10 text-purple-400 border-purple-400/30",
  "Finance & Growth": "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
};

function categoryStyle(cat: string) {
  return (
    CATEGORY_COLORS[cat] ?? "bg-[#57C5CF]/10 text-[#57C5CF] border-[#57C5CF]/30"
  );
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#0F1926]">
        {/* ── Top accent bar ── */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, #57C5CF 0%, #378B57 50%, #4FFFB0 100%)",
          }}
        />

        {/* ── Page header ── */}
        <div className="pt-24 pb-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block bg-[#57C5CF]/10 border border-[#57C5CF]/30 text-[#57C5CF] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              Insights &amp; Strategy
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              The Remote ACKtive Blog
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Practical guides on remote hiring, outsourcing strategy, global
              talent, and building high-performance distributed teams.
            </p>
          </div>
        </div>

        {/* ── Featured post ── */}
        <div className="px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl border border-white/10 bg-[#1E2430] hover:border-[#57C5CF]/40 transition-all duration-300 overflow-hidden"
            >
              <div
                className="h-1 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, #248B93 0%, #1A5538 50%, #4FFFB0 100%)",
                }}
              />
              <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#4FFFB0]/15 border border-[#4FFFB0]/40 text-[#4FFFB0] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                      Featured
                    </span>
                    <span
                      className={`border text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full ${categoryStyle(featured.category)}`}
                    >
                      {featured.category}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug group-hover:text-[#57C5CF] transition-colors duration-200 mb-4">
                    {featured.h1}
                  </h2>

                  <p className="text-white/60 text-base leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center gap-3 text-white/40 text-sm">
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>

                {/* Right: decorative teaser card */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-full max-w-xs rounded-xl bg-[#0F1926] border border-white/8 p-6">
                    <div className="text-[#57C5CF] text-xs font-bold tracking-widest uppercase mb-3">
                      Key Insight
                    </div>
                    <p className="text-white/65 text-sm leading-relaxed">
                      {featured.sections[0]?.body[0]?.slice(0, 140)}…
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-[#4FFFB0] text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                      Read article
                      <svg
                        className="w-4 h-4"
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
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* ── All articles grid ── */}
        <div className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-8">
              All Articles
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-xl border border-white/10 bg-[#1E2430] hover:border-[#57C5CF]/40 hover:bg-[#1E2430]/80 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className="h-1 w-full flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(90deg, #248B93 0%, #1A5538 100%)",
                    }}
                  />
                  <div className="flex flex-col flex-1 p-6">
                    <span
                      className={`self-start border text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-4 ${categoryStyle(post.category)}`}
                    >
                      {post.category}
                    </span>

                    <h3 className="text-white font-bold text-lg leading-snug group-hover:text-[#57C5CF] transition-colors duration-200 mb-3 flex-1">
                      {post.h1}
                    </h3>

                    <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-white/35 text-xs">
                        {post.date} · {post.readTime}
                      </div>
                      <span className="text-[#4FFFB0] text-xs font-semibold group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                        Read
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA banner ── */}
        <div className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <div
              className="rounded-2xl p-10 md:p-14 text-center border border-[#57C5CF]/15"
              style={{
                background:
                  "linear-gradient(135deg, #0D1F35 0%, #0F1926 55%, #0A2020 100%)",
              }}
            >
              <p className="text-[#57C5CF] text-xs font-bold tracking-widest uppercase mb-4">
                Ready to act?
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Stop overpaying for talent.
              </h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
                Save up to 70% on hiring costs and build a world-class remote
                team in 3–10 days.
              </p>
              <Link
                href="/book-a-call"
                className="inline-flex items-center gap-2 bg-[#4FFFB0] text-[#0F1926] font-bold px-8 py-4 rounded-xl hover:bg-[#3de8a0] transition-colors duration-200 text-base"
              >
                Book a Free Strategy Call
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
