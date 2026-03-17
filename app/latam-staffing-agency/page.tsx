import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuaranteeSection from "@/components/GuaranteeSection";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "LATAM Staffing Agency",
  provider: {
    "@type": "Organization",
    name: "Remote ACKtive",
    url: "https://remoteacktive.com",
  },
  description:
    "Remote ACKtive places pre-vetted remote professionals from Latin America at US companies. Roles covered: customer experience, operations, SDR support, bookkeeping, and data. Placement in 3–10 business days.",
  areaServed: { "@type": "Country", name: "United States" },
  serviceType: "LATAM Remote Staffing",
  url: "https://remoteacktive.com/latam-staffing-agency",
};

const roles = [
  {
    title: "Customer Experience",
    description:
      "Tier 1 and Tier 2 support, live chat, email support, helpdesk management. US-hours coverage, native-level English required.",
    cost: "$28K–$34K / year",
  },
  {
    title: "Operations & Admin",
    description:
      "Executive assistants, project coordinators, operations analysts, data entry, and virtual assistants.",
    cost: "$28K–$36K / year",
  },
  {
    title: "SDR & Sales Support",
    description:
      "Outbound prospecting, list building, CRM hygiene, appointment setting, and pipeline management.",
    cost: "$32K–$40K / year",
  },
  {
    title: "Finance & Bookkeeping",
    description:
      "AP/AR management, reconciliation, expense tracking, QuickBooks, and financial reporting.",
    cost: "$24K–$34K / year",
  },
  {
    title: "Data & Reporting",
    description:
      "Data entry, dashboard management, Excel/Sheets analysis, reporting, and basic BI work.",
    cost: "$28K–$38K / year",
  },
];

const steps = [
  {
    number: "01",
    title: "15-Min Discovery Call",
    body: "You describe the role, the team context, and what a great hire looks like for you. We ask the questions that make the shortlist accurate — not generic.",
  },
  {
    number: "02",
    title: "We Source in 24–48 Hours",
    body: "We activate our pre-vetted LATAM talent pool immediately. No cold job postings. Candidates already cleared English, skills, and background checks before you see them.",
  },
  {
    number: "03",
    title: "You Get 2–3 Profiles",
    body: "Not a resume dump. A curated shortlist with notes on why each candidate fits your specific context. You pick who to interview.",
  },
  {
    number: "04",
    title: "You Interview, You Decide",
    body: "We facilitate scheduling. You interview your top choice. If none feel right, we source again — no extra charge, no pressure.",
  },
  {
    number: "05",
    title: "Placement + 90-Day Support",
    body: "Contracts handled, onboarding supported, check-ins scheduled. If the hire doesn't work out within 90 days, we find a replacement at no additional fee.",
  },
];

const faqs = [
  {
    q: "What makes LATAM different from other offshore locations?",
    a: "Timezone. Colombia, Honduras, Mexico, Costa Rica, and Argentina all operate within US Eastern or Central time. Real-time collaboration — not overnight handoffs. Combined with strong English fluency and cultural alignment with US business norms, LATAM consistently outperforms other offshore regions for synchronous roles.",
  },
  {
    q: "Do LATAM professionals actually work US business hours?",
    a: "Yes. That's a hard requirement in our matching process. Every professional we place is confirmed to work your core hours — whether that's 9–5 ET, 8–6 PT, or something in between. No time zone friction.",
  },
  {
    q: "How strong is the English proficiency?",
    a: "Written and verbal English fluency is a non-negotiable gate in our vetting process. Candidates who don't communicate clearly and confidently in English don't make the shortlist — full stop. For voice support roles, there is a Latin American accent, which US customers consistently find neutral and easy to understand.",
  },
  {
    q: "What if the hire doesn't work out?",
    a: "We replace them at no additional charge — at any point in the engagement, not just within the first 30 days. We also give you one full week of service free while the transition happens. No fine print, no time limits.",
  },
  {
    q: "How is this different from posting on Upwork or LinkedIn?",
    a: "On Upwork or LinkedIn you get volume, not quality. You spend 20–40 hours reviewing applications, running interviews, and hoping someone shows up. We hand you 2–3 vetted profiles matched to your specific role, background-checked, English-tested, and ready to start. The average time from kickoff to first interview is 3–5 business days.",
  },
  {
    q: "What does it actually cost?",
    a: "Contractor compensation runs $28,000–$40,000/year depending on role and seniority — 40–70% below comparable US fully-loaded costs. There is a one-time placement fee and a flat monthly management fee for ongoing support. We show you the full numbers on the discovery call before you commit to anything.",
  },
];

export default function LATAMStaffingAgencyPage() {
  return (
    <>
      <Script
        id="latam-staffing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Header />

      <main style={{ background: "linear-gradient(to right, #2C5364, #203A43, #0F2027)" }}>

        {/* ── Top accent bar ── */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg, #57C5CF 0%, #378B57 50%, #4FFFB0 100%)" }}
        />

        {/* ─────────────────────────────────────────── */}
        {/* HERO */}
        {/* ─────────────────────────────────────────── */}
        <section className="pt-28 pb-24 px-6">
          <div className="max-w-4xl mx-auto text-center">

            {/* Pill */}
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#4FFFB0] animate-pulse" />
              <span className="text-xs font-bold text-[#57C5CF] tracking-widest uppercase">
                LATAM Staffing Agency
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
              Pre-Vetted LATAM Talent
              <br />
              <span className="text-[#4FFFB0]">Placed in 3–10 Days.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
              Remote ACKtive places dedicated, English-speaking professionals from Latin America at US companies —
              40–70% below US hiring costs, in the same time zone, with a free replacement guarantee.
            </p>

            <Link
              href="https://calendly.com/admin-remoteacktive/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-grad text-white font-bold px-9 py-4 rounded-full text-base"
            >
              Book a Free Discovery Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              {[
                "3–10 day placement",
                "US timezone coverage",
                "Top 5% vetted",
                "Free replacement guarantee",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/70 text-sm font-medium">
                  <svg className="w-4 h-4 text-[#4FFFB0] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* WHY LATAM */}
        {/* ─────────────────────────────────────────── */}
        <section className="py-20 px-6" style={{ background: "rgba(0,0,0,0.15)" }}>
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-1.5 mb-5">
                <span className="text-xs font-bold text-[#57C5CF] tracking-widest uppercase">Why Latin America</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                The Region Built for US Remote Work
              </h2>
              <p className="text-white/70 mt-4 text-base md:text-lg max-w-2xl mx-auto">
                LATAM isn't just cheaper — it's structurally better for US companies that need real-time collaboration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: "Same time zone as your team",
                  body: "Colombia, Honduras, Mexico, Costa Rica, and Argentina all operate in US ET or CT. Your hire attends standups, responds to Slack, and closes tickets during your business hours — not overnight.",
                  accent: "#57C5CF",
                },
                {
                  title: "English fluency is a hard gate",
                  body: "Written and verbal English proficiency is non-negotiable in our vetting process. No candidate reaches your shortlist without clearing both. Communication friction isn't a LATAM problem when vetting is done right.",
                  accent: "#4FFFB0",
                },
                {
                  title: "Dedicated — not shared",
                  body: "Every placement is 100% dedicated to your company. Your hire learns your product, your tone, your processes. This isn't a call-center model where an agent represents 10 brands.",
                  accent: "#4FFFB0",
                },
                {
                  title: "40–70% below US fully-loaded cost",
                  body: "A comparable US CX rep costs $65K–$80K fully-loaded — salary, taxes, benefits, recruiter fees. The same caliber LATAM hire runs $28K–$34K/year. For a team of three, that's $100K+ in annual savings.",
                  accent: "#57C5CF",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-7"
                >
                  <div
                    className="w-1 h-8 rounded-full mb-5"
                    style={{ background: card.accent }}
                  />
                  <h3 className="text-white font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* COST COMPARISON TABLE */}
        {/* ─────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-1.5 mb-5">
                <span className="text-xs font-bold text-[#57C5CF] tracking-widest uppercase">Real Numbers</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                What You Actually Pay vs. What You'd Pay Locally
              </h2>
              <p className="text-white/70 mt-4 text-sm md:text-base max-w-xl mx-auto">
                US figures are fully-loaded annual cost — salary, payroll taxes, employer health contribution, and recruiting fee amortized over 2 years.
              </p>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-4 gap-3 mb-3 px-4">
              <span className="text-[#57C5CF] text-xs font-bold uppercase tracking-widest">Role</span>
              <span className="text-[#57C5CF] text-xs font-bold uppercase tracking-widest text-right">US Cost/yr</span>
              <span className="text-[#4FFFB0] text-xs font-bold uppercase tracking-widest text-right">LATAM Cost/yr</span>
              <span className="text-white/50 text-xs font-bold uppercase tracking-widest text-right">You Save</span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              {[
                { role: "Customer Experience Rep", us: "$65K–$80K", latam: "$28K–$34K", save: "~$40K/yr" },
                { role: "Operations / Admin", us: "$62K–$78K", latam: "$28K–$36K", save: "~$35K/yr" },
                { role: "SDR Support", us: "$70K–$90K", latam: "$32K–$40K", save: "~$40K/yr" },
                { role: "Bookkeeper", us: "$65K–$75K", latam: "$24K–$34K", save: "~$38K/yr" },
                { role: "Data Analyst", us: "$78K–$95K", latam: "$32K–$40K", save: "~$50K/yr" },
              ].map((row, i) => (
                <div
                  key={row.role}
                  className={`grid grid-cols-4 gap-3 px-5 py-4 items-center ${
                    i % 2 === 0 ? "bg-white/4" : "bg-white/0"
                  }`}
                >
                  <span className="text-white font-semibold text-sm">{row.role}</span>
                  <span className="text-white/50 text-sm text-right line-through">{row.us}</span>
                  <span className="text-[#4FFFB0] font-bold text-sm text-right">{row.latam}</span>
                  <span className="text-white/80 font-semibold text-sm text-right">{row.save}</span>
                </div>
              ))}
            </div>

            <p className="text-white/40 text-xs text-center mt-4">
              LATAM figures reflect Remote ACKtive contractor compensation. Placement and management fees are separate — discussed on the discovery call.
            </p>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* ROLES WE FILL */}
        {/* ─────────────────────────────────────────── */}
        <section className="py-20 px-6" style={{ background: "rgba(0,0,0,0.15)" }}>
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-1.5 mb-5">
                <span className="text-xs font-bold text-[#57C5CF] tracking-widest uppercase">Roles We Place</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                What We Staff
              </h2>
              <p className="text-white/70 mt-4 text-sm md:text-base max-w-xl mx-auto">
                Any non-physical role that can be done remotely with a laptop and internet connection. These are the categories where we have the deepest talent pools.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {roles.map((role) => (
                <div
                  key={role.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#57C5CF]/40 transition-colors duration-300"
                >
                  <h3 className="text-white font-bold text-base mb-2">{role.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{role.description}</p>
                  <span className="text-[#4FFFB0] text-xs font-bold">{role.cost}</span>
                </div>
              ))}

              {/* +more card */}
              <div className="rounded-2xl border border-dashed border-white/15 bg-transparent p-6 flex flex-col items-start justify-center">
                <p className="text-white/50 text-sm leading-relaxed mb-3">
                  Have a role not listed here? Reach out. If it can be done remotely, we can likely staff it.
                </p>
                <Link
                  href="https://calendly.com/admin-remoteacktive/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#57C5CF] text-sm font-semibold hover:text-white transition-colors"
                >
                  Ask us →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* HOW IT WORKS */}
        {/* ─────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">

            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-1.5 mb-5">
                <span className="text-xs font-bold text-[#57C5CF] tracking-widest uppercase">The Process</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                From Brief to Placed in Under 2 Weeks
              </h2>
            </div>

            <div className="space-y-5">
              {steps.map((step, idx) => (
                <div key={step.number} className="flex gap-5">
                  {/* Number + connector */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border border-[#57C5CF]/50 bg-[#57C5CF]/10 flex items-center justify-center shrink-0">
                      <span className="text-[#57C5CF] text-xs font-extrabold">{step.number}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ background: "linear-gradient(to bottom, rgba(87,197,207,0.3), transparent)" }} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-8">
                    <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                    <p className="text-white/65 text-sm leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* GUARANTEE — reuse existing component */}
        {/* ─────────────────────────────────────────── */}
        <GuaranteeSection />

        {/* ─────────────────────────────────────────── */}
        {/* FAQ */}
        {/* ─────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-1.5 mb-5">
                <span className="text-xs font-bold text-[#57C5CF] tracking-widest uppercase">FAQ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Questions We Get Every Time
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-white font-bold text-base mb-3 leading-snug">{item.q}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* FINAL CTA */}
        {/* ─────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: "rgba(0,0,0,0.2)" }}>
          <div className="max-w-2xl mx-auto text-center">

            <p className="text-[#57C5CF] text-xs font-bold tracking-widest uppercase mb-4">
              Ready to Start?
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
              Get Your First LATAM Hire
              <br />in Under 2 Weeks
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-10 max-w-lg mx-auto">
              Book a free 30-minute discovery call. We'll map out the role, walk you through costs, and start sourcing immediately after.
              No commitment required.
            </p>

            <Link
              href="https://calendly.com/admin-remoteacktive/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-grad text-white font-bold px-10 py-4 rounded-full text-base"
            >
              Book Your Free Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <p className="text-white/35 text-xs mt-6">
              30 minutes. No pitch deck. No obligation.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
