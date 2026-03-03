import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts, getPostBySlug, getAllSlugs, formatDate } from '@/lib/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: `${post.title} | Remote ACKtive Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://remoteacktive.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://remoteacktive.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#4FFFB0]/15 text-[#1A5538] border border-[#4FFFB0]/30">
                {post.category}
              </span>
              <span className="text-sm text-gray-400">{formatDate(post.date)}</span>
              <span className="text-sm text-gray-400">· {post.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
              {post.title}
            </h1>

            <p className="text-lg text-gray-600 mb-7 leading-relaxed">{post.excerpt}</p>

            {/* Author */}
            <div className="flex items-center gap-3 pb-8 border-b border-gray-100">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ background: post.author.avatarColor }}
              >
                {post.author.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.role}</p>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <article className="prose prose-lg prose-gray max-w-none">
            {post.sections.map((section, sIdx) => (
              <div key={sIdx} className="mb-8">
                {section.heading && (
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4 leading-snug">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-gray-700 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 space-y-2 pl-0 list-none">
                    {section.list.map((item, lIdx) => (
                      <li key={lIdx} className="flex items-start gap-3">
                        <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#4FFFB0]/20 flex items-center justify-center text-[#1A5538] text-xs font-bold">
                          ✓
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>

          {/* In-article CTA */}
          <div className="mt-14 mb-16 bg-[#0A1628] rounded-2xl px-8 py-10 text-center">
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-3">
              See Your Savings in 30 Minutes
            </h2>
            <p className="text-white/60 mb-6 text-sm max-w-md mx-auto">
              Book a free discovery call and we will show you exactly how much you could save on your next hire.
            </p>
            <Link
              href="/book-a-call"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-transparent text-[#4FFFB0] text-sm font-bold border-2 border-[#4FFFB0] hover:bg-[#4FFFB0] hover:text-black hover:scale-105 transition-all"
            >
              Book a Free Discovery Call
            </Link>
          </div>

          {/* More Articles */}
          {otherPosts.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-5">More Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {otherPosts.map((other) => (
                  <Link key={other.slug} href={`/blog/${other.slug}`} className="group block">
                    <div className="bg-[#F7FAFB] rounded-2xl border border-gray-200 p-5 hover:border-[#57C5CF]/40 hover:shadow-md transition-all">
                      <span className="text-xs text-gray-500">{other.category} · {other.readTime}</span>
                      <h3 className="text-sm font-bold text-gray-900 mt-1.5 mb-2 group-hover:text-[#0E7490] leading-snug transition-colors">
                        {other.title}
                      </h3>
                      <span className="text-xs font-semibold text-[#0E7490] group-hover:underline">
                        Read →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
