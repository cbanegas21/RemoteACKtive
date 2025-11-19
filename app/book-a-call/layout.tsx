import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call | Remote ACKtive",
  description: "Schedule your free discovery call with Remote ACKtive. Learn how we can help you build a world-class remote team and save up to 70% on costs.",
  alternates: {
    canonical: "https://remoteacktive.com/book-a-call",
  },
  openGraph: {
    title: "Book a Call | Remote ACKtive",
    description: "Schedule your free discovery call. Learn how we can help you build a world-class remote team and save up to 70% on operational costs.",
    url: "https://remoteacktive.com/book-a-call",
  },
  twitter: {
    title: "Book a Call | Remote ACKtive",
    description: "Schedule your free discovery call. Learn how we can help you build a world-class remote team.",
  },
};

export default function BookACallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
