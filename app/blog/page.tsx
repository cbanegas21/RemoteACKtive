import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts, formatDate } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Remote ACKtive — Remote Hiring & Outsourcing Insights',
  description:
    'Practical guides on remote hiring, global outsourcing, cost savings, and building elite distributed teams. Insights from the Remote ACKtive team.',
  alternates: {
    canonical: 'https://remoteacktive.com/blog',
  },
  openGraph: {
    title: 'Blog | Remote ACKtive',
    description:
      'Practical guides on remote hiring, outsourcing, and building elite global teams.',
    url: 'https://remoteacktive.com/blog',
    type: 'website',
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  'Cost Savings': 'bg-[#4FFFB0]/15 text-[#1A5538] border-[#4FFFB0]/30',
  'Hiring Strategy': 'bg-[#57C5CF]/15 text-[#0E7490] border-[#57C5CF]/30',
  'Our Process': 'bg-[#378B57]/15 text-[#166534] border-[#378B57]/30',
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <Header />
      <main className="bg-[#F7FAFB] min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* Page Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#4FFFB0]/15 border border-[#378B57]/25 rounded-full px-4 py-1.5 mb-5">
              <span className="text-sm font-bold text-[#1A5538] tracking-wide uppercase">
                Insights & Guides
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              The Remote ACKtive Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Practical advice on global hiring, outsourcing ROI, and building distributed teams that outperform.
            </p>
          </div>

          {/* Featured Article */}
          <Link href={`/blog/${featured.slug}`} className="group block mb-10">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-[#57C5CF]/40 transition-all duration-300">
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      CATEGORY_COLORS[featured.category] ?? 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {featured.category}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(featured.date)}</span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-xs text-gray-400">{featured.readTime}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 group-hover:text-[#0E7490] transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-gray-600 text-base mb-6 max-w-3xl">{featured.excerpt}</p>

                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: featured.author.avatarColor }}
                  >
                    {featured.author.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{featured.author.name}</p>
                    <p className="text-xs text-gray-500">{featured.author.role}</p>
                  </div>
                  <span className="ml-auto text-sm font-semibold text-[#0E7490] group-hover:underline">
                    Read article →
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full flex flex-col hover:shadow-lg hover:border-[#57C5CF]/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                        CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                    <span className="text-xs text-gray-400">· {post.readTime}</span>
                  </div>

                  <h2 className="text-lg font-extrabold text-gray-900 mb-2 group-hover:text-[#0E7490] transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm flex-1 mb-4">{post.excerpt}</p>

                  <div className="flex items-center gap-2.5 mt-auto">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: post.author.avatarColor }}
                    >
                      {post.author.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">{post.author.name}</p>
                      <p className="text-xs text-gray-500 truncate">{post.author.role}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#0E7490] group-hover:underline flex-shrink-0">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-[#0A1628] rounded-3xl px-8 py-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Ready to Build Your Elite Remote Team?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Get a free 30-minute discovery call. We will map out exactly where you can save and which roles to hire first.
            </p>
            <Link
              href="/book-a-call"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent text-[#4FFFB0] text-base font-bold border-2 border-[#4FFFB0] shadow-lg hover:bg-[#4FFFB0] hover:text-black hover:scale-105 transition-all"
            >
              Book a Free Discovery Call
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
