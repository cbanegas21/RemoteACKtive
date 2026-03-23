import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPost, getAllSlugs } from "@/app/lib/blog";
import ArticleClient from "./ArticleClient";

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
      authors: ["Remote ACKtive"],
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: ["/images/og-image.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Build related posts list
  const relatedPosts = post.relatedSlugs
    .map((s) => getBlogPost(s))
    .filter((p): p is NonNullable<ReturnType<typeof getBlogPost>> => p !== undefined);

  // FAQPage schema
  const faqSchema =
    post.faq.length > 0
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
    author: {
      "@type": "Organization",
      name: "Remote ACKtive",
      url: "https://remoteacktive.com",
    },
    image: "https://remoteacktive.com/images/og-image.jpg",
    publisher: {
      "@type": "Organization",
      name: "Remote ACKtive",
      url: "https://remoteacktive.com",
      logo: {
        "@type": "ImageObject",
        url: "https://remoteacktive.com/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://remoteacktive.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Header />

      {/* ── Structured data (JSON-LD) ──────────────────────────────────── */}
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

      {/* ── Client component handles reading progress, ToC, FAQ, share ── */}
      <ArticleClient post={post} relatedPosts={relatedPosts} />

      <Footer />
    </>
  );
}
