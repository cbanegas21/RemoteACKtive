import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LATAM Staffing Agency for US Companies | Remote ACKtive",
  description:
    "Remote ACKtive places pre-vetted LATAM professionals at US companies in 3–10 days. Save 40–70% vs. US hiring costs. CX, ops, SDR, bookkeeping, and data roles.",
  alternates: {
    canonical: "https://remoteacktive.com/latam-staffing-agency",
  },
  openGraph: {
    title: "LATAM Staffing Agency for US Companies | Remote ACKtive",
    description:
      "Pre-vetted remote professionals from Latin America. Placed in 3–10 days. 40–70% below US hiring costs.",
    url: "https://remoteacktive.com/latam-staffing-agency",
    siteName: "Remote ACKtive",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Remote ACKtive — LATAM Staffing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LATAM Staffing Agency for US Companies | Remote ACKtive",
    description:
      "Pre-vetted LATAM remote professionals placed in 3–10 days. Save 40–70% vs. US hiring costs.",
    images: ["/images/og-image.jpg"],
  },
};

export default function LATAMStaffingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
