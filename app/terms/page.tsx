import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Remote ACKtive",
  description:
    "Read Remote ACKtive's Terms of Service covering our staffing and recruitment services, client obligations, satisfaction guarantee, limitation of liability, and governing law.",
  alternates: {
    canonical: "https://remoteacktive.com/terms",
  },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "March 3, 2026";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p>
          By accessing or using the Remote ACKtive website located at{" "}
          <strong className="text-white">remoteacktive.com</strong> (the &ldquo;Site&rdquo;) or engaging
          Remote ACKtive for any staffing, recruitment, or related services, you
          (&ldquo;Client,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) agree to be bound by these Terms of
          Service (&ldquo;Terms&rdquo;).
        </p>
        <p className="mt-3">
          If you are entering into these Terms on behalf of a business or other legal entity,
          you represent that you have the authority to bind that entity to these Terms. If you
          do not agree to these Terms, you must not use our Site or services.
        </p>
        <p className="mt-3">
          These Terms apply alongside any separate service agreement, statement of work, or
          proposal agreed upon between you and Remote ACKtive. In the event of a conflict,
          the specific service agreement shall prevail.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "2. Description of Services",
    content: (
      <>
        <p className="mb-4">
          Remote ACKtive provides offshore staffing and recruitment services designed to help
          businesses build high-performing remote teams. Our primary service offerings include:
        </p>
        <div className="space-y-4">
          {[
            {
              name: "Recruitment-Only",
              desc: "We source, screen, and present qualified offshore candidates for your review and selection. Client retains full responsibility for candidate onboarding, management, and compensation after placement.",
            },
            {
              name: "Full Remote ACKtive Experience",
              desc: "An end-to-end managed solution including candidate sourcing, vetting, HR assistance, payment management, continuous training, performance monitoring, well-being programs, and ongoing operational support.",
            },
          ].map((s) => (
            <div key={s.name} className="bg-[#252c3b] rounded-lg p-4">
              <p className="text-white font-semibold mb-1">{s.name}</p>
              <p className="text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm">
          Specific deliverables, timelines, pricing, and scope of work are detailed in
          individual service agreements provided prior to engagement commencement.
        </p>
      </>
    ),
  },
  {
    id: "use-of-site",
    title: "3. Acceptable Use of the Site",
    content: (
      <>
        <p className="mb-3">
          You agree to use our Site only for lawful purposes and in a manner consistent with
          all applicable local, state, national, and international laws. You agree not to:
        </p>
        <ul className="space-y-2 list-none">
          {[
            "Use the Site to transmit any harmful, fraudulent, deceptive, threatening, harassing, defamatory, or otherwise unlawful content.",
            "Attempt to gain unauthorized access to any portion of the Site, our servers, or any systems connected to the Site.",
            "Use automated bots, scrapers, or similar tools to harvest data from the Site without our express written consent.",
            "Interfere with or disrupt the integrity or performance of the Site.",
            "Impersonate any person or entity, or misrepresent your affiliation with any person or entity.",
            "Upload or transmit viruses or any other malicious code.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#57C5CF] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "client-obligations",
    title: "4. Client Obligations",
    content: (
      <>
        <p className="mb-3">
          To enable Remote ACKtive to perform services effectively, you agree to:
        </p>
        <ul className="space-y-2 list-none">
          {[
            "Provide accurate, complete, and current information about your business, hiring requirements, and team needs.",
            "Respond to candidate presentations and communications in a timely manner (typically within 3–5 business days).",
            "Provide necessary tools, system access, and onboarding resources for placed team members.",
            "Treat placed offshore professionals with respect and in compliance with applicable labor and anti-discrimination laws.",
            "Promptly notify Remote ACKtive of any concerns regarding a placed candidate's performance so we can take corrective action.",
            "Honor payment obligations as specified in your service agreement.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4FFFB0] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "satisfaction-guarantee",
    title: "5. Client Satisfaction Guarantee",
    content: (
      <>
        <p className="mb-4">
          Remote ACKtive stands behind the quality of every placement with our{" "}
          <strong className="text-white">100% Client Satisfaction Guarantee</strong>:
        </p>
        <div className="bg-[#4FFFB0]/5 border border-[#4FFFB0]/20 rounded-xl p-5 space-y-3">
          {[
            "If you are not satisfied with a placed candidate at any stage of the engagement, notify us and we will pause your service at no charge.",
            "We will identify and present replacement candidates at zero additional placement cost.",
            "You will receive one (1) week of complimentary service to assist your transition to the new team member.",
            "This guarantee applies regardless of the stage or duration of the engagement.",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-[#4FFFB0]/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-[#4FFFB0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-white/70">{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm">
          This guarantee is subject to the client having met their obligations under Section 4
          and does not apply in cases of client-side misconduct, illegal requests, or
          situations where the client has materially altered the scope of work post-placement.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    title: "6. Fees & Payment Terms",
    content: (
      <>
        <p className="mb-3">
          Service fees, payment schedules, and billing terms are specified in the individual
          service agreement executed between you and Remote ACKtive prior to commencement.
        </p>
        <ul className="space-y-2 list-none">
          {[
            "All fees are denominated in US dollars (USD) unless otherwise stated in your service agreement.",
            "Invoices are due and payable within the timeframe specified in your agreement. Late payments may incur interest charges as detailed in your service agreement.",
            "Remote ACKtive reserves the right to suspend services if payment obligations are not met.",
            "All fees paid are non-refundable except as expressly stated in your service agreement or as required by applicable law.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#57C5CF] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "7. Confidentiality",
    content: (
      <>
        <p className="mb-3">
          Each party agrees to treat the other&rsquo;s confidential information with the same
          degree of care it uses to protect its own confidential information, but no less than
          reasonable care.
        </p>
        <ul className="space-y-2 list-none">
          {[
            "Remote ACKtive will treat all client business information, hiring requirements, compensation details, and operational data as confidential.",
            "Client agrees to treat all candidate information, vetting methodologies, and pricing structures provided by Remote ACKtive as confidential.",
            "Confidential information may not be disclosed to third parties without prior written consent, except as required by law.",
            "These obligations survive termination of the service agreement for a period of two (2) years.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#57C5CF] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "8. Intellectual Property",
    content: (
      <>
        <p className="mb-3">
          All content on remoteacktive.com — including but not limited to text, graphics,
          logos, icons, images, audio clips, digital downloads, data compilations, and software —
          is the property of Remote ACKtive or its content suppliers and is protected by
          United States and international copyright, trademark, and other intellectual
          property laws.
        </p>
        <p>
          You are granted a limited, non-exclusive, non-transferable license to access and use
          the Site for your personal, non-commercial purposes only. You may not reproduce,
          distribute, modify, create derivative works of, publicly display, publicly perform,
          republish, download, store, or transmit any content without our prior written permission.
        </p>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "9. Disclaimer of Warranties",
    content: (
      <>
        <p className="mb-3">
          Our Site and services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis,
          without warranties of any kind, either express or implied, including but not limited to:
        </p>
        <ul className="space-y-2 list-none mb-3">
          {[
            "Implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
            "Guarantees that the Site will be uninterrupted, error-free, or free from viruses or other harmful components.",
            "Guarantees of specific business outcomes, revenue growth, cost savings, or performance metrics for placed candidates.",
            "Accuracy or completeness of any information provided on the Site.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F5A623] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm">
          Remote ACKtive makes no representations regarding the suitability of candidates
          for any particular role beyond the scope of our vetting process.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "10. Limitation of Liability",
    content: (
      <>
        <p className="mb-3">
          To the fullest extent permitted by applicable law, Remote ACKtive, its officers,
          directors, employees, agents, and partners shall not be liable for any:
        </p>
        <ul className="space-y-2 list-none mb-4">
          {[
            "Indirect, incidental, special, consequential, or punitive damages.",
            "Loss of profits, revenue, data, business opportunities, or goodwill.",
            "Damages resulting from unauthorized access to or alteration of your transmissions or data.",
            "Conduct or content of any third party on or via the Site.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F5A623] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm">
          In no event shall Remote ACKtive&rsquo;s total aggregate liability to you for all claims
          arising out of or relating to these Terms or our services exceed the total fees paid
          by you to Remote ACKtive in the three (3) months immediately preceding the event
          giving rise to the claim.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "11. Indemnification",
    content: (
      <p>
        You agree to defend, indemnify, and hold harmless Remote ACKtive and its officers,
        directors, employees, contractors, agents, licensors, and partners from and against
        any claims, damages, obligations, losses, liabilities, costs, or expenses (including
        attorney&rsquo;s fees) arising from: (a) your use of or access to the Site; (b) your
        violation of these Terms; (c) your violation of any third-party rights, including
        any intellectual property or privacy rights; or (d) any claim that your use of our
        services caused damage to a third party.
      </p>
    ),
  },
  {
    id: "termination",
    title: "12. Termination",
    content: (
      <>
        <p className="mb-3">
          Either party may terminate a service engagement as specified in the applicable
          service agreement. Remote ACKtive reserves the right to suspend or terminate your
          access to the Site immediately, without prior notice or liability, for any reason,
          including if you breach these Terms.
        </p>
        <p>
          Upon termination, your right to use the Site ceases immediately. All provisions
          of these Terms that by their nature should survive termination shall survive,
          including ownership provisions, warranty disclaimers, indemnity, and limitations
          of liability.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "13. Governing Law & Jurisdiction",
    content: (
      <>
        <p className="mb-3">
          These Terms and any disputes arising hereunder shall be governed by and construed
          in accordance with the laws of the{" "}
          <strong className="text-white">State of Wyoming, United States</strong>, without
          regard to its conflict of law provisions.
        </p>
        <p>
          You consent to the exclusive jurisdiction of the state and federal courts located
          in Laramie County, Wyoming for any disputes arising from these Terms or
          your use of our services. If you are a consumer in a jurisdiction that prohibits
          this choice of law, the laws of your jurisdiction may apply to the extent required.
        </p>
      </>
    ),
  },
  {
    id: "dispute-resolution",
    title: "14. Dispute Resolution",
    content: (
      <>
        <p className="mb-3">
          Before initiating any formal legal proceedings, both parties agree to attempt
          to resolve disputes through good-faith negotiation for a period of thirty (30)
          calendar days from the date either party provides written notice of the dispute.
        </p>
        <p>
          If a dispute cannot be resolved through negotiation, it shall be submitted to
          binding arbitration under the rules of the American Arbitration Association (AAA),
          conducted in English in Cheyenne, Wyoming. The arbitrator&rsquo;s decision
          shall be final and binding and may be entered as a judgment in any court of
          competent jurisdiction. This clause does not prevent either party from seeking
          emergency injunctive relief.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "15. Changes to These Terms",
    content: (
      <p>
        Remote ACKtive reserves the right to modify these Terms at any time. We will notify
        you of material changes by updating the &ldquo;Last updated&rdquo; date above and, where
        appropriate, by sending an email to the address associated with your account.
        Your continued use of the Site or our services after the effective date of any
        changes constitutes your acceptance of the revised Terms. We encourage you to
        review these Terms periodically.
      </p>
    ),
  },
  {
    id: "general",
    title: "16. General Provisions",
    content: (
      <ul className="space-y-3 list-none">
        {[
          { label: "Entire Agreement", text: "These Terms, together with any executed service agreements, constitute the entire agreement between you and Remote ACKtive regarding their subject matter." },
          { label: "Severability", text: "If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect." },
          { label: "Waiver", text: "Failure by Remote ACKtive to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision." },
          { label: "Assignment", text: "You may not assign your rights or obligations under these Terms without Remote ACKtive's prior written consent. Remote ACKtive may assign its rights without restriction." },
          { label: "Force Majeure", text: "Neither party shall be liable for delays or failures in performance resulting from causes beyond their reasonable control, including natural disasters, pandemics, or government actions." },
        ].map((item) => (
          <li key={item.label} className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 text-[#57C5CF] font-semibold flex-shrink-0 w-28">{item.label}:</span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "contact",
    title: "17. Contact Us",
    content: (
      <>
        <p className="mb-4">
          For questions about these Terms of Service, please contact us:
        </p>
        <div className="bg-[#252c3b] rounded-xl p-5 space-y-2 text-sm">
          <p className="text-white font-semibold text-base">Remote ACKtive</p>
          <p>
            <span className="text-white/50">Address: </span>
            <span className="text-white/70">1621 Central Ave, Cheyenne, WY 82001</span>
          </p>
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

export default function TermsPage() {
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
              <span className="text-white/60">Terms of Service</span>
            </nav>

            {/* Header */}
            <header className="mb-12">
              <span className="inline-block bg-[#57C5CF]/10 border border-[#57C5CF]/30 text-[#57C5CF] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                Legal
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                Terms of Service
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
                These Terms of Service are provided as a general framework. We recommend
                consulting a qualified attorney to tailor these terms to your specific
                business needs and ensure compliance with all applicable laws.
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="bg-[#1E2430] border border-white/10 rounded-xl p-6 mb-10" aria-label="Table of contents">
              <p className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Contents</p>
              <ol className="space-y-2 columns-2 gap-x-6">
                {sections.map((s) => (
                  <li key={s.id} className="break-inside-avoid">
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

            {/* Related links */}
            <div className="mt-12 bg-[#1E2430] border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-white/60 text-sm">
                Also review our{" "}
                <Link href="/privacy-policy" className="text-[#57C5CF] hover:underline">
                  Privacy Policy
                </Link>
                {" "}for information on how we handle your data.
              </p>
              <Link
                href="/book-a-call"
                className="flex-shrink-0 inline-flex items-center gap-2 btn-gradient text-[#0F1926] font-bold px-5 py-2.5 rounded-xl text-sm"
              >
                Book a Free Call
              </Link>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-8">
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
