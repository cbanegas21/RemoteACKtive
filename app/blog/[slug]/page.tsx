import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts, getBlogPost, getAllSlugs } from "@/app/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `https://remoteacktive.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://remoteacktive.com/blog/${post.slug}`,
      siteName: "Remote ACKtive",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Build related posts list from relatedSlugs
  const relatedPosts = post.relatedSlugs
    .map((s) => getBlogPost(s))
    .filter(Boolean);

  // FAQPage schema for Google rich results
  const faqSchema = post.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      }
    : null;

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.h1,
    description: post.metaDescription,
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "Remote ACKtive",
      url: "https://remoteacktive.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://remoteacktive.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Header />

      {/* Structured data */}
      <Script
        id={`article-schema-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <Script
          id={`faq-schema-${post.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen" style={{ background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' }}>
        {/* Top accent */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, #57C5CF 0%, #378B57 50%, #4FFFB0 100%)",
          }}
        />

        {/* Content wrapper */}
        <div className="pt-24 pb-20 px-6">
          <div className="max-w-3xl mx-auto">

            {/* ── Breadcrumb ── */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm text-white/70 font-medium mb-10"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white truncate max-w-[200px]">{post.h1}</span>
            </nav>

            {/* ── Article header ── */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="bg-[#57C5CF]/10 border border-[#57C5CF]/30 text-[#57C5CF] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-white font-medium text-sm">{post.date}</span>
                <span className="text-white/50 text-sm">·</span>
                <span className="text-white font-medium text-sm">{post.readTime}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
                {post.h1}
              </h1>

              <p className="text-lg text-white font-medium leading-relaxed mb-8">
                {post.excerpt}
              </p>

              <div
                className="h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(87,197,207,0.3) 0%, transparent 100%)",
                }}
              />
            </header>

            {/* ── Article body ── */}
            <article className="mb-14">
              {post.sections.map((section, idx) => (
                <div key={idx} className="mb-10">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug">
                    {section.h2}
                  </h2>

                  {section.body.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-white font-medium text-base leading-relaxed mb-4"
                    >
                      {para}
                    </p>
                  ))}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-4 space-y-3">
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
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          <span className="text-white font-medium text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </article>

            {/* ── Mid-article CTA ── */}
            <div
              className="rounded-2xl p-8 md:p-10 mb-14 text-center border border-[#57C5CF]/15"
              style={{
                background:
                  "linear-gradient(135deg, #0D1F35 0%, #0F1926 55%, #0A2020 100%)",
              }}
            >
              <p className="text-[#57C5CF] text-xs font-bold tracking-widest uppercase mb-3">
                See your savings
              </p>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mb-3">
                Find Out How Much You Could Save in 30 Minutes
              </h2>
              <p className="text-white font-medium text-sm max-w-md mx-auto mb-6">
                Book a free discovery call and we&apos;ll show you exactly which roles to hire first and how much you&apos;ll save.
              </p>
              <Link
                href="/book-a-call"
                className="inline-flex items-center gap-2 btn-grad text-white font-bold px-7 py-3.5 rounded-full text-sm"
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

            {/* ── FAQ section ── */}
            {post.faq.length > 0 && (
              <section className="mb-14" aria-label="Frequently Asked Questions">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {post.faq.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/10 bg-[#1E2430] p-6"
                    >
                      <h3 className="text-white font-bold mb-3 leading-snug">
                        {item.q}
                      </h3>
                      <p className="text-white font-medium text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Related articles ── */}
            {relatedPosts.length > 0 && (
              <section className="mb-14">
                <h2 className="text-lg font-bold text-white mb-5">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.map((other) => {
                    if (!other) return null;
                    return (
                      <Link
                        key={other.slug}
                        href={`/blog/${other.slug}`}
                        className="group block rounded-xl border border-white/10 bg-[#1E2430] hover:border-[#57C5CF]/40 transition-all duration-300 p-5"
                      >
                        <span className="text-[#57C5CF] text-xs font-semibold uppercase tracking-wide">
                          {other.category}
                        </span>
                        <h3 className="text-white text-sm font-bold mt-2 mb-3 leading-snug group-hover:text-[#57C5CF] transition-colors duration-200">
                          {other.h1}
                        </h3>
                        <span className="text-[#4FFFB0] text-xs font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                          Read article
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
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── Back to blog ── */}
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-white/70 font-medium hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
