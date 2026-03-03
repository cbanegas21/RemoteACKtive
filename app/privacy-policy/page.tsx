import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Remote ACKtive",
  description:
    "Learn how Remote ACKtive collects, uses, and protects your personal information. Our privacy policy covers data collection, cookies, CCPA, and GDPR compliance.",
  alternates: {
    canonical: "https://remoteacktive.com/privacy-policy",
  },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "March 3, 2026";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>
          Remote ACKtive (&ldquo;Remote ACKtive,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website{" "}
          <strong className="text-white">remoteacktive.com</strong> (the &ldquo;Site&rdquo;). This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you
          visit our Site or use our staffing and recruitment services.
        </p>
        <p className="mt-3">
          By accessing or using our Site, you agree to the collection and use of information
          in accordance with this policy. If you do not agree, please discontinue use of our Site.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: (
      <>
        <h3 className="text-white font-semibold mt-4 mb-2">2.1 Information You Provide Directly</h3>
        <ul className="space-y-2 list-none">
          {[
            "Contact and inquiry forms: full name, email address, company name, phone number, role requirements, team size, budget range, and any additional details you voluntarily submit.",
            "Scheduling data: when you book a discovery call via Calendly, Calendly independently collects your name, email address, and scheduling preferences. Please review Calendly's privacy policy at calendly.com/privacy.",
            "Email communications: if you contact us directly by email, we retain those communications and any personal information contained therein.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#57C5CF] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-white font-semibold mt-6 mb-2">2.2 Information Collected Automatically</h3>
        <ul className="space-y-2 list-none">
          {[
            "Analytics data: we use Google Analytics 4 (GA4) to collect information about how visitors interact with our Site, including pages visited, session duration, browser type, operating system, referring URLs, and approximate geographic location derived from your IP address. This data is collected only with your prior consent via our cookie consent tool.",
            "Log data: our hosting provider (Vercel) may automatically collect standard server log data including IP addresses, access timestamps, and pages requested. This data is used for security and performance monitoring.",
            "Cookies and similar technologies: we use cookies and local storage to enable core functionality and analytics. See Section 5 for details.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#57C5CF] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: (
      <>
        <p className="mb-3">We use the information we collect to:</p>
        <ul className="space-y-2 list-none">
          {[
            "Respond to your inquiries and provide our staffing, recruitment, and team management services.",
            "Schedule discovery calls and follow-up communications.",
            "Send you service updates, proposals, and relevant information about Remote ACKtive (you may opt out at any time).",
            "Analyze Site traffic and usage patterns to improve user experience and content.",
            "Maintain the security and performance of our Site.",
            "Comply with applicable legal obligations.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4FFFB0] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "4. How We Share Your Information",
    content: (
      <>
        <p className="mb-4">
          <strong className="text-white">We do not sell, rent, or trade your personal information</strong> to
          third parties. We may share information only in the following limited circumstances:
        </p>
        <div className="space-y-4">
          {[
            {
              name: "Service Providers",
              desc: "We use trusted third-party vendors to operate our Site and deliver services. These include:",
              subs: [
                "Google Analytics – website analytics (privacy.google.com/policies/privacy)",
                "Resend – transactional email delivery (resend.com/privacy)",
                "Calendly – appointment scheduling (calendly.com/privacy)",
                "Vercel – website hosting and infrastructure (vercel.com/legal/privacy-policy)",
              ],
            },
            {
              name: "Legal Requirements",
              desc: "We may disclose your information if required to do so by law, court order, or governmental authority, or if we believe disclosure is necessary to protect our rights or the safety of others.",
              subs: [],
            },
            {
              name: "Business Transfers",
              desc: "In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email or prominent notice on our Site before your information is transferred.",
              subs: [],
            },
          ].map((item) => (
            <div key={item.name} className="bg-[#252c3b] rounded-lg p-4">
              <p className="text-white font-semibold mb-2">{item.name}</p>
              <p className="text-sm mb-2">{item.desc}</p>
              {item.subs.length > 0 && (
                <ul className="space-y-1 list-none mt-2">
                  {item.subs.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#57C5CF]/60 flex-shrink-0" />
                      <span className="text-white/60">{s}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies & Tracking Technologies",
    content: (
      <>
        <p className="mb-4">We use the following types of cookies:</p>
        <div className="grid gap-3">
          {[
            {
              type: "Essential Cookies",
              color: "bg-[#57C5CF]/10 border-[#57C5CF]/30 text-[#57C5CF]",
              desc: "Required for the Site to function correctly (e.g., cookie consent preferences stored in localStorage). These cannot be disabled.",
            },
            {
              type: "Analytics Cookies",
              color: "bg-[#F5A623]/10 border-[#F5A623]/30 text-[#F5A623]",
              desc: "Google Analytics 4 cookies that help us understand how visitors interact with our Site. These are only set after you provide consent via our cookie banner.",
            },
          ].map((c) => (
            <div key={c.type} className="bg-[#252c3b] rounded-lg p-4 flex gap-4 items-start">
              <span className={`mt-0.5 text-xs font-bold px-2 py-1 rounded-full border flex-shrink-0 ${c.color}`}>
                {c.type}
              </span>
              <p className="text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm">
          You can manage or withdraw your cookie consent at any time by clicking the cookie
          settings banner or by adjusting your browser settings. Note that disabling certain
          cookies may affect Site functionality.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "6. Data Retention",
    content: (
      <>
        <p className="mb-3">We retain your information only as long as necessary for the purposes described in this policy:</p>
        <ul className="space-y-2 list-none">
          {[
            "Contact form submissions and email correspondence: retained for up to 2 years from the date of last contact.",
            "Google Analytics data: retained per GA4 default settings (14 months), after which data is automatically deleted.",
            "Calendly scheduling data: managed per Calendly's own retention policy.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#57C5CF] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          You may request deletion of your personal data at any time by contacting us at{" "}
          <a href="mailto:admin@remoteacktive.com" className="text-[#57C5CF] hover:underline">
            admin@remoteacktive.com
          </a>. We will process your request within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "7. Your Privacy Rights",
    content: (
      <>
        <h3 className="text-white font-semibold mt-2 mb-3">California Residents — CCPA / CPRA</h3>
        <p className="mb-3 text-sm">
          Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA),
          California residents have the following rights:
        </p>
        <ul className="space-y-2 list-none mb-6">
          {[
            "Right to Know: request disclosure of the categories and specific pieces of personal information we have collected about you.",
            "Right to Delete: request deletion of your personal information, subject to certain exceptions.",
            "Right to Correct: request correction of inaccurate personal information.",
            "Right to Opt-Out: opt out of the sale or sharing of personal information. (We do not sell personal information.)",
            "Right to Non-Discrimination: we will not discriminate against you for exercising your CCPA rights.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4FFFB0] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-white font-semibold mb-3">EU / EEA Residents — GDPR</h3>
        <p className="mb-3 text-sm">
          If you are located in the European Union or European Economic Area, you have the following
          rights under the General Data Protection Regulation (GDPR):
        </p>
        <ul className="space-y-2 list-none">
          {[
            "Right of Access: obtain a copy of your personal data we hold.",
            "Right to Rectification: correct inaccurate or incomplete data.",
            "Right to Erasure: request deletion of your personal data ('right to be forgotten').",
            "Right to Restrict Processing: request that we limit how we use your data.",
            "Right to Data Portability: receive your data in a structured, machine-readable format.",
            "Right to Object: object to processing based on legitimate interests or direct marketing.",
            "Right to Withdraw Consent: withdraw consent at any time without affecting the lawfulness of prior processing.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4FFFB0] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          To exercise any of these rights, please contact us at{" "}
          <a href="mailto:admin@remoteacktive.com" className="text-[#57C5CF] hover:underline">
            admin@remoteacktive.com
          </a>. We will respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "8. Security",
    content: (
      <p>
        We implement reasonable technical and organizational measures to protect your personal
        information against unauthorized access, loss, misuse, or alteration. Our Site is served
        over HTTPS (TLS encryption). However, no method of transmission over the internet is
        100% secure, and we cannot guarantee absolute security. In the event of a data breach
        that affects your rights and freedoms, we will notify you as required by applicable law.
      </p>
    ),
  },
  {
    id: "childrens-privacy",
    title: "9. Children's Privacy",
    content: (
      <p>
        Our Site and services are not directed to individuals under the age of 18. We do not
        knowingly collect personal information from children. If you believe we have
        inadvertently collected data from a minor, please contact us immediately at{" "}
        <a href="mailto:admin@remoteacktive.com" className="text-[#57C5CF] hover:underline">
          admin@remoteacktive.com
        </a>{" "}
        and we will promptly delete such information.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "10. Third-Party Links",
    content: (
      <p>
        Our Site may contain links to third-party websites, including social media platforms
        and partner services. We are not responsible for the privacy practices of those sites
        and encourage you to review their privacy policies before providing any personal
        information.
      </p>
    ),
  },
  {
    id: "changes",
    title: "11. Changes to This Policy",
    content: (
      <p>
        We reserve the right to update this Privacy Policy at any time. We will notify you of
        material changes by updating the &ldquo;Last updated&rdquo; date at the top of this page.
        Your continued use of the Site following any changes constitutes your acceptance of
        the revised policy. We encourage you to review this page periodically.
      </p>
    ),
  },
  {
    id: "contact",
    title: "12. Contact Us",
    content: (
      <>
        <p className="mb-4">
          If you have questions, concerns, or requests regarding this Privacy Policy or our
          data practices, please contact us:
        </p>
        <div className="bg-[#252c3b] rounded-xl p-5 space-y-2 text-sm">
          <p className="text-white font-semibold text-base">Remote ACKtive</p>
          <p>
            <span className="text-white/50">Email: </span>
            <a href="mailto:admin@remoteacktive.com" className="text-[#57C5CF] hover:underline">
              admin@remoteacktive.com
            </a>
          </p>
          <p>
            <span className="text-white/50">Phone: </span>
            <a href="tel:+14152511945" className="text-[#57C5CF] hover:underline">
              +1 (415) 251-1945
            </a>
          </p>
          <p>
            <span className="text-white/50">Website: </span>
            <a href="https://remoteacktive.com" className="text-[#57C5CF] hover:underline">
              remoteacktive.com
            </a>
          </p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#0F1926]">
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: "linear-gradient(90deg, #57C5CF 0%, #378B57 50%, #4FFFB0 100%)",
          }}
        />

        <div className="pt-24 pb-20 px-6">
          <div className="max-w-3xl mx-auto">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/40 mb-10">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white/60">Privacy Policy</span>
            </nav>

            {/* Header */}
            <header className="mb-12">
              <span className="inline-block bg-[#57C5CF]/10 border border-[#57C5CF]/30 text-[#57C5CF] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                Legal
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                Privacy Policy
              </h1>
              <p className="text-white/50 text-sm">
                Last updated: <span className="text-white/70">{LAST_UPDATED}</span>
              </p>
              <div
                className="h-px w-full mt-6"
                style={{
                  background: "linear-gradient(90deg, rgba(87,197,207,0.3) 0%, transparent 100%)",
                }}
              />
            </header>

            {/* Disclaimer */}
            <div className="bg-[#F5A623]/8 border border-[#F5A623]/20 rounded-xl p-4 mb-10 flex gap-3">
              <span className="text-[#F5A623] text-lg flex-shrink-0">⚠️</span>
              <p className="text-white/60 text-sm leading-relaxed">
                This Privacy Policy is provided for informational purposes. We recommend consulting
                a qualified attorney to ensure compliance with all applicable laws and regulations
                specific to your jurisdiction and business circumstances.
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="bg-[#1E2430] border border-white/10 rounded-xl p-6 mb-10" aria-label="Table of contents">
              <p className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Contents</p>
              <ol className="space-y-2">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm text-white/50 hover:text-[#57C5CF] transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 bg-[#1E2430] border border-white/10 rounded-xl p-6 md:p-8"
                >
                  <h2 className="text-lg md:text-xl font-bold text-white mb-4 pb-3 border-b border-white/8">
                    {section.title}
                  </h2>
                  <div className="text-white/65 text-sm leading-relaxed">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            {/* Back to Home */}
            <div className="text-center mt-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
