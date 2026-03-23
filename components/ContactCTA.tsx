"use client";
import { useState } from "react";
import { Calendar, Mail, Phone, Star, Lock, Clock, ShieldCheck } from "lucide-react";
import { useFormContext } from "./FormContext";
import HireOnlyForm from "./HireOnlyForm";
import HireManageForm from "./HireManageForm";

export default function ContactCTA() {
  const { formType, setFormType } = useFormContext();

  const tabs = [
    {
      id: "hire-only" as const,
      label: "Recruitment-Only",
      title: "Interested in Recruitment-Only?",
      description: "Expert recruitment, fast. We source, screen, and deliver a shortlist of pre-vetted professionals — you make the final call.",
      isFeatured: false,
    },
    {
      id: "hire-manage" as const,
      label: "Full Service Staffing",
      title: "Ready for Full Outsourcing Support?",
      description: "Everything in Recruitment-Only, plus ongoing HR, training, performance monitoring, and dedicated account support.",
      isFeatured: true,
    },
  ];

  const currentTab = tabs.find((tab) => tab.id === formType) || tabs[1];

  return (
    <section
      id="contact"
      className="relative pt-20 pb-32 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)" }}
    >
      {/* Subtle grid texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(87,197,207,1) 1px, transparent 1px), linear-gradient(90deg, rgba(87,197,207,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
              Get Started Today
            </span>
          </div>
          <h2
            className="text-white text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to Build Your Dream Team?
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Get in touch and let&apos;s discuss how we can help you scale with
            top LATAM talent — at a fraction of US hiring costs.
          </p>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-12">
          <span className="flex items-center gap-2 text-white/60 text-sm font-medium">
            <Lock className="w-4 h-4 text-[#4FFFB0]" aria-hidden="true" />
            Your info is secure
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/20" aria-hidden="true" />
          <span className="flex items-center gap-2 text-white/60 text-sm font-medium">
            <ShieldCheck className="w-4 h-4 text-[#4FFFB0]" aria-hidden="true" />
            No commitment required
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/20" aria-hidden="true" />
          <span className="flex items-center gap-2 text-white/60 text-sm font-medium">
            <Clock className="w-4 h-4 text-[#4FFFB0]" aria-hidden="true" />
            Response within 24 hours
          </span>
        </div>

        {/* Desktop: Side by side layout | Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* LEFT: Contact Cards */}
          <div className="lg:w-1/3 space-y-5">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
              Prefer to reach out directly?
            </p>

            {/* Schedule a Meeting */}
            <div
              className="group rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderColor: "rgba(87,197,207,0.18)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(87,197,207,0.55)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(87,197,207,0.18)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl border border-[#57C5CF]/30 bg-[#57C5CF]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[#57C5CF]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1">
                    Schedule a Meeting
                  </h3>
                  <p className="text-white/50 text-sm mb-3 leading-snug">
                    Book a time that works for you
                  </p>
                  <a
                    href="https://calendly.com/admin-remoteacktive/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#57C5CF] hover:text-[#4FFFB0] text-sm font-semibold transition-colors inline-flex items-center gap-1 group/link"
                  >
                    View Calendar
                    <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div
              className="group rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderColor: "rgba(87,197,207,0.18)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(87,197,207,0.55)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(87,197,207,0.18)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl border border-[#57C5CF]/30 bg-[#57C5CF]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#57C5CF]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1">
                    Email Us
                  </h3>
                  <p className="text-white/50 text-sm mb-3 leading-snug">
                    We&apos;ll respond within 24 hours
                  </p>
                  <a
                    href="mailto:admin@remoteacktive.com"
                    className="text-[#57C5CF] hover:text-[#4FFFB0] text-sm font-semibold transition-colors break-all"
                  >
                    admin@remoteacktive.com
                  </a>
                </div>
              </div>
            </div>

            {/* Call or Text */}
            <div
              className="group rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderColor: "rgba(87,197,207,0.18)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(87,197,207,0.55)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(87,197,207,0.18)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl border border-[#57C5CF]/30 bg-[#57C5CF]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#57C5CF]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1">
                    Call or Text
                  </h3>
                  <p className="text-white/50 text-sm mb-3 leading-snug">
                    Speak with our team directly
                  </p>
                  <a
                    href="tel:+14152511945"
                    className="text-[#57C5CF] hover:text-[#4FFFB0] text-sm font-semibold transition-colors"
                  >
                    +1 (415) 251-1945
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form area */}
          <div className="lg:w-2/3">

            {/* Tab Navigation */}
            <div className="flex items-stretch gap-3 mb-6 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFormType(tab.id)}
                  className={`
                    relative flex-1 min-w-[160px] px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-200 btn-grad
                    ${
                      formType === tab.id
                        ? "scale-[1.02] shadow-2xl ring-2 ring-white/25 ring-offset-2 ring-offset-transparent"
                        : "opacity-50 hover:opacity-75"
                    }
                  `}
                >
                  <span className="flex items-center justify-center gap-2">
                    {tab.label}
                    {tab.isFeatured && (
                      <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" aria-hidden="true" />
                    )}
                  </span>
                  {tab.isFeatured && formType === tab.id && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-[#0F1926] text-[10px] font-extrabold rounded-full uppercase tracking-wider whitespace-nowrap shadow-lg">
                      Most Popular
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Form Container */}
            <div
              className="rounded-2xl p-8 border shadow-2xl"
              style={{
                background: "linear-gradient(160deg, rgba(30,36,48,0.98) 0%, rgba(15,25,38,0.98) 100%)",
                borderColor: "rgba(87,197,207,0.2)",
                boxShadow: "0 0 0 1px rgba(87,197,207,0.08), 0 32px 64px rgba(0,0,0,0.5)",
              }}
            >
              {/* Form heading + description */}
              <div className="mb-7 pb-6 border-b border-white/8">
                <p className="text-[#57C5CF] text-xs font-bold uppercase tracking-widest mb-2">
                  Tell us what you need
                </p>
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {currentTab.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {currentTab.description}
                </p>
              </div>

              {/* Forms */}
              <div className="transition-opacity duration-300">
                {formType === "hire-only" && <HireOnlyForm />}
                {formType === "hire-manage" && <HireManageForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
