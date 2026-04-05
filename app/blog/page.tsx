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
      <BlogClientPage />
      <Footer />
    </>
  );
}
