import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Remote ACKtive | Elite Global Talent for Your Business",
  icons: {
    icon: '/images/favicon.png',
  },
  description: "Scale your business with Remote ACKtive. Access elite global talent, save up to 70% on costs, and hire world-class professionals in 3-10 days.",
  keywords: [
    "remote staffing",
    "outsourcing services",
    "global talent acquisition",
    "remote team building",
    "offshore staffing",
    "virtual assistants",
    "remote developers",
    "customer service outsourcing",
    "finance outsourcing",
    "IT outsourcing",
    "hire remote talent",
    "remote workforce solutions",
    "business process outsourcing",
    "managed services provider",
  ],
  authors: [{ name: "Remote ACKtive" }],
  creator: "Remote ACKtive",
  publisher: "Remote ACKtive",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://remoteacktive.com"),
  alternates: {
    canonical: "https://remoteacktive.com",
  },
  openGraph: {
    title: "Remote ACKtive | Elite Global Talent",
    description: "Scale your business with elite global talent. Save up to 70% on operational costs. Hire world-class professionals in 3-10 days.",
    type: "website",
    locale: "en_US",
    url: "https://remoteacktive.com",
    siteName: "Remote ACKtive",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Remote ACKtive - Global Talent Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote ACKtive | Elite Global Talent",
    description: "Scale your business with elite global talent. Save up to 70% on costs. Hire world-class professionals in 3-10 days.",
    images: ["/images/og-image.jpg"],
    creator: "@remoteacktive",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "lTHT9Cq0sXbeki75IwJfOWCxDfDsP1-Cq87NAvoaOgk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics - Replace GA_MEASUREMENT_ID with your actual ID */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-BEYLVNF0X5"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BEYLVNF0X5', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Structured Data - Organization */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Remote ACKtive",
              url: "https://remoteacktive.com",
              logo: "https://remoteacktive.com/images/logo.png",
              description: "Global outsourcing and remote staffing solutions provider",
              email: "admin@remoteacktive.com",
              telephone: "+14152511945",
              sameAs: [
                "https://www.linkedin.com/company/remoteacktive",
                "https://twitter.com/remoteacktive",
                "https://www.facebook.com/remoteacktive",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
            }),
          }}
        />

        {/* Structured Data - Service */}
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Remote Staffing and Outsourcing Services",
              provider: {
                "@type": "Organization",
                name: "Remote ACKtive",
                url: "https://remoteacktive.com",
              },
              areaServed: {
                "@type": "Country",
                name: "United States",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Outsourcing Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Hire-Only Service",
                      description: "We find and deliver pre-vetted talent ready to join your team",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Hire + Manage Service",
                      description: "Complete recruitment and ongoing operations management",
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}