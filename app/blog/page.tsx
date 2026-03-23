import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogClientPage from "./BlogClientPage";

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

export default function BlogPage() {
  return (
    <>
      <Header />

      {/* ── Page hero ─────────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f3443 0%, #1a5538 100%)" }}
      >
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #57C5CF 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #4FFFB0 0%, transparent 70%)" }}
        />

        <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
          {/* Section label */}
          <div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
              The Remote ACKtive Blog
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
            Insights on Remote Hiring
            <span className="block relative mt-2 pb-3">
              &amp; LATAM Talent
              {/* Teal underline accent */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-48 rounded-full"
                style={{ background: "linear-gradient(90deg, #57C5CF, #4FFFB0)" }}
              />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-4">
            Practical guides on remote hiring, outsourcing strategy, global
            talent, and building high-performance distributed teams.
          </p>
        </div>
      </section>

      {/* ── Interactive blog content (client component) ──────────────── */}
      <BlogClientPage />

      <Footer />
    </>
  );
}
