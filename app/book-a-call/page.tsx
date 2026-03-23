"use client";
import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Star,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Globe,
  Zap,
} from "lucide-react";
import { FormProvider } from "@/components/FormContext";
import Header from "@/components/Header";
import HireOnlyForm from "@/components/HireOnlyForm";
import HireManageForm from "@/components/HireManageForm";
import Footer from "@/components/Footer";

const tabs = [
  {
    id: "hire-only" as const,
    label: "Recruitment-Only",
    title: "Get Pre-Vetted Candidates Fast",
    description:
      "We source, screen, and deliver a shortlist of top-tier LATAM professionals — you make the final call.",
    isFeatured: false,
    accentColor: "#57C5CF",
    borderIdle: "rgba(87,197,207,0.25)",
    borderHover: "rgba(87,197,207,0.6)",
  },
  {
    id: "hire-manage" as const,
    label: "Full Service Staffing",
    title: "Your Entire Remote Team — Handled",
    description:
      "Full-cycle hiring, HR administration, performance management, and ongoing development. Completely hands-free.",
    isFeatured: true,
    accentColor: "#4FFFB0",
    borderIdle: "rgba(79,255,176,0.3)",
    borderHover: "rgba(79,255,176,0.7)",
  },
];

const stats = [
  { value: "30+", label: "Placements", color: "#57C5CF" },
  { value: "4.9/5", label: "Client Rating", color: "#F5A623" },
  { value: "94%", label: "12-Mo Retention", color: "#4FFFB0" },
  { value: "3–10", label: "Days to Hire", color: "#57C5CF" },
];

const benefits = [
  {
    icon: Calendar,
    title: "Free 30-Minute Strategy Call",
    description:
      "No commitment, no pitch. We map your hiring needs and identify where remote talent delivers the most value.",
    color: "#57C5CF",
  },
  {
    icon: Zap,
    title: "Candidates in 3–10 Days",
    description:
      "Our pre-vetted LATAM talent pool means you get qualified candidates weeks faster than traditional recruiting.",
    color: "#4FFFB0",
  },
  {
    icon: Globe,
    title: "LATAM Talent, 20+ Countries",
    description:
      "English-fluent, timezone-aligned professionals from top talent markets across Latin America.",
    color: "#57C5CF",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Replacement Guarantee",
    description:
      "If a placement underperforms, we find you a better match at zero extra charge — no questions asked.",
    color: "#4FFFB0",
  },
];

const whatToExpect = [
  "Understand your business challenges and growth goals",
  "Identify where remote talent delivers the biggest ROI",
  "Walk through our vetting process and quality standards",
  "Review pricing and expected savings (typically 60–70%)",
  "Get a custom hiring roadmap tailored to your team",
  "Answer every question — no pressure, ever",
];

export default function BookACallPage() {
  const [activeTab, setActiveTab] = useState<"hire-only" | "hire-manage">(
    "hire-manage"
  );

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[1];

  return (
    <FormProvider>
      <div
        className="min-h-screen"
        style={{ background: "linear-gradient(to right, #0F2027, #203A43, #2C5364)" }}
      >
        <Header />

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          {/* ambient top glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(87,197,207,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FFFB0] animate-pulse" />
              <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
                Free Discovery Call
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Build Your Dream Remote Team{" "}
              <span className="text-[#4FFFB0]">in Days, Not Months</span>
            </h1>
            <p
              className="text-white/75 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Tell us what you need. We&apos;ll show you how to hire top LATAM
              professionals at up to 70% less — fully vetted and ready to start.
            </p>

            {/* Stats strip */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-2xl md:text-3xl font-black leading-none mb-0.5"
                    style={{
                      color: s.color,
                      fontFamily: "var(--font-heading)",
                      textShadow: `0 0 20px ${s.color}40`,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-xs text-white/55 font-semibold uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main Content ──────────────────────────────────────────────── */}
        <section className="pb-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-5 gap-10 items-start">

              {/* LEFT: Benefits */}
              <div className="lg:col-span-2 space-y-5">
                {/* Benefits */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(87,197,207,0.15)",
                  }}
                >
                  {/* Top accent */}
                  <div
                    className="h-0.5 w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #57C5CF 0%, #4FFFB0 50%, transparent 100%)",
                    }}
                  />
                  <div className="p-7">
                    <p
                      className="text-xs font-bold text-white/45 uppercase tracking-widest mb-5"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Why book a call
                    </p>
                    <div className="space-y-5">
                      {benefits.map((b) => {
                        const Icon = b.icon;
                        return (
                          <div key={b.title} className="flex gap-4">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{
                                background: `${b.color}18`,
                                border: `1px solid ${b.color}30`,
                              }}
                            >
                              <Icon
                                className="w-5 h-5"
                                style={{ color: b.color }}
                              />
                            </div>
                            <div>
                              <p
                                className="text-white font-bold text-sm mb-0.5"
                                style={{ fontFamily: "var(--font-heading)" }}
                              >
                                {b.title}
                              </p>
                              <p
                                className="text-white/60 text-xs leading-relaxed"
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {b.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* What to expect */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(79,255,176,0.15)",
                  }}
                >
                  <div
                    className="h-0.5 w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #4FFFB0 0%, transparent 75%)",
                    }}
                  />
                  <div className="p-7">
                    <p
                      className="text-xs font-bold text-white/45 uppercase tracking-widest mb-4"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      What happens on the call
                    </p>
                    <ul className="space-y-2.5">
                      {whatToExpect.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2
                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                            style={{ color: "#4FFFB0" }}
                          />
                          <span
                            className="text-white/75 text-sm leading-snug"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Guarantee pill */}
                <div
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: "rgba(79,255,176,0.06)",
                    border: "1px solid rgba(79,255,176,0.2)",
                  }}
                >
                  <ShieldCheck
                    className="w-8 h-8 mx-auto mb-3"
                    style={{ color: "#4FFFB0" }}
                  />
                  <p
                    className="text-white font-extrabold text-base mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Lifetime Guarantee
                  </p>
                  <p
                    className="text-white/60 text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Every placement — covered forever. If it&apos;s not right,
                    we make it right at no cost.
                  </p>
                </div>
              </div>

              {/* RIGHT: Form */}
              <div className="lg:col-span-3">
                {/* Service tabs */}
                <div className="flex gap-3 mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="flex-1 relative rounded-xl py-3.5 px-4 font-bold text-sm transition-all duration-200"
                      style={{
                        background:
                          activeTab === tab.id
                            ? `${tab.accentColor}15`
                            : "rgba(255,255,255,0.04)",
                        border: `1px solid ${
                          activeTab === tab.id
                            ? tab.borderIdle
                            : "rgba(255,255,255,0.08)"
                        }`,
                        color:
                          activeTab === tab.id ? tab.accentColor : "rgba(255,255,255,0.5)",
                        transform: activeTab === tab.id ? "translateY(-1px)" : "none",
                      }}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        {tab.label}
                        {tab.isFeatured && (
                          <Star className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
                        )}
                      </span>
                      {activeTab === tab.id && (
                        <div
                          className="absolute bottom-0 inset-x-0 h-0.5 rounded-b-xl"
                          style={{
                            background: tab.accentColor,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Form card */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(15,25,38,0.75)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: `1px solid ${currentTab.borderIdle}`,
                    boxShadow: currentTab.isFeatured
                      ? `0 0 0 1px ${currentTab.borderIdle}, 0 24px 60px rgba(79,255,176,0.08)`
                      : "none",
                  }}
                >
                  {/* Gradient top bar for featured */}
                  {currentTab.isFeatured && (
                    <div
                      className="h-0.5 w-full flex-shrink-0"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, #4FFFB0 40%, #57C5CF 70%, transparent 100%)",
                      }}
                    />
                  )}

                  <div className="p-8 md:p-10">
                    {/* Most Popular badge */}
                    {currentTab.isFeatured && (
                      <div className="mb-5">
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest"
                          style={{
                            background:
                              "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                            color: "#fff",
                            boxShadow: "0 4px 14px rgba(245,158,11,0.35)",
                          }}
                        >
                          <Star className="w-3 h-3 fill-white" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    {/* Tab title */}
                    <div className="mb-7">
                      <h2
                        className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {currentTab.title}
                      </h2>
                      <p
                        className="text-white/65 text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {currentTab.description}
                      </p>
                    </div>

                    {/* Active form */}
                    {activeTab === "hire-only" && <HireOnlyForm />}
                    {activeTab === "hire-manage" && <HireManageForm />}

                    {/* Calendly fallback */}
                    <p
                      className="text-xs text-white/40 text-center mt-6"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Prefer to schedule directly?{" "}
                      <a
                        href="https://calendly.com/admin-remoteacktive/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#57C5CF] hover:text-[#4FFFB0] transition-colors underline underline-offset-2"
                      >
                        Open Calendly
                      </a>
                    </p>
                  </div>
                </div>

                {/* Trust bar */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-6 px-2">
                  {[
                    { icon: ShieldCheck, text: "No setup fees, ever" },
                    { icon: Clock, text: "Response within 24 hours" },
                    { icon: Users, text: "30+ teams already scaling" },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-1.5 text-white/45 text-xs"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <Icon className="w-3.5 h-3.5 text-[#57C5CF]" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </FormProvider>
  );
}
