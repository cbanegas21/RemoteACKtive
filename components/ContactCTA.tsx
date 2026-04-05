"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Globe, Lock, ArrowRight } from "lucide-react";
import { useFormContext } from "./FormContext";
import HireOnlyForm from "./HireOnlyForm";
import HireManageForm from "./HireManageForm";
import GeneralContactForm from "./GeneralContactForm";
import Link from "next/link";

// ─── Mouse-tracking conic glow border
function GlowBorder({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const [active, setActive] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setAngle((Math.atan2(y, x) * 180) / Math.PI + 90);
    setActive(true);
  }, []);

  return (
    <div
      ref={ref}
      className="relative rounded-2xl"
      onMouseMove={onMove}
      onMouseLeave={() => setActive(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          padding: 1,
          background: `conic-gradient(from ${angle}deg at 50% 50%, #0a6b7a, #0a7a55, #0a6b7a, transparent 40%)`,
          WebkitMask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}

// ─── Tab config — names match ThreeTierServices exactly
type FormType = "hire-only" | "hire-manage" | "general";

const TABS: {
  id: FormType;
  label: string;
  headline: string;
  sub: string;
  formTitle: string;
  formDesc: string;
}[] = [
  {
    id: "hire-only",
    label: "Remote Outsourcing",
    headline: "Find talent without\nthe overhead.",
    sub: "We recruit, vet, and handle payroll. Your only cost is their monthly salary — nothing else.",
    formTitle: "Interested in Remote Outsourcing?",
    formDesc: "We source, screen, and deliver a shortlist of pre-vetted professionals — you make the final call.",
  },
  {
    id: "hire-manage",
    label: "Full Service Staffing",
    headline: "We run your team.\nYou grow.",
    sub: "HR, compliance, performance management — fully handled. You focus on your business, we handle the rest.",
    formTitle: "Ready for Full Service Staffing?",
    formDesc: "Everything in Remote Outsourcing, plus HR, training, performance monitoring, and a dedicated account manager.",
  },
  {
    id: "general",
    label: "General Inquiry",
    headline: "Not sure where\nto start?",
    sub: "Tell us what you need and we'll figure out the right path together — no commitment, no pressure.",
    formTitle: "Have a Question or Unique Need?",
    formDesc: "Not sure which service fits, or just want to learn more? Tell us what's on your mind.",
  },
];

// ─── Proof points
const PROOF = [
  { icon: Clock,       text: "First candidates in 3–10 days"          },
  { icon: ShieldCheck, text: "Replacement guarantee — no fine print"   },
  { icon: Globe,       text: "Talent across 20+ LATAM countries"       },
  { icon: Lock,        text: "Private — no spam, no pressure, ever"    },
];

const CONTACT = [
  { icon: Mail,   label: "admin@remoteacktive.com",       href: "mailto:admin@remoteacktive.com"                                    },
  { icon: Phone,  label: "+1 (415) 251-1945",             href: "tel:+14152511945"                                                  },
  { icon: MapPin, label: "Cheyenne, WY",                  href: "https://maps.google.com/?q=1621+Central+Ave,+Cheyenne,+WY+82001"   },
];

export default function ContactCTA() {
  const { formType, setFormType } = useFormContext();
  const activeTab = TABS.find((t) => t.id === formType) ?? TABS[1];

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32" style={{ background: 'linear-gradient(to right, #FFFDE4, #005AA7)' }}>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-16 items-start">

          {/* ══ LEFT — changes with active tab ══ */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-8">

            {/* Headline — swaps per tab */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`headline-${formType}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <h2 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.0] mb-5 whitespace-pre-line" style={{ color: "#000000" }}>
                  {activeTab.headline.split("\n").map((line, i, arr) => (
                    <span key={i}>
                      {i === arr.length - 1 ? (
                        <span
                          style={{
                            backgroundImage: "linear-gradient(90deg, #0a6b7a, #0a7a55)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {line}
                        </span>
                      ) : (
                        line
                      )}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
                <p className="text-base md:text-lg leading-relaxed max-w-sm" style={{ color: "rgba(0,0,0,0.75)" }}>
                  {activeTab.sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Proof points */}
            <div className="flex flex-col gap-3.5">
              {PROOF.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "rgba(10,107,122,0.1)", border: "1px solid rgba(10,107,122,0.2)" }}
                  >
                    <Icon className="h-3.5 w-3.5 text-[#0a6b7a]" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "#000000" }}>{text}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-black/10" />

            {/* Contact links */}
            <div className="flex flex-col gap-2.5">
              {CONTACT.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 group w-fit"
                >
                  <Icon className="h-4 w-4 shrink-0 transition-colors group-hover:text-[#0a6b7a]" style={{ color: "rgba(0,0,0,0.30)" }} aria-hidden="true" />
                  <span className="text-sm font-medium transition-colors group-hover:text-black" style={{ color: "rgba(0,0,0,0.72)" }}>{label}</span>
                </a>
              ))}
            </div>

            <Link
              href="/book-a-call"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#04090f] w-fit transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 50%, #b8fce8 100%)" }}
            >
              Book a Free Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* ══ RIGHT — form ══ */}
          <div className="flex flex-col gap-5">

            {/* Tab pills */}
            <div className="flex items-stretch gap-2 flex-wrap">
              {TABS.map((tab) => {
                const isActive = formType === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFormType(tab.id)}
                    className="relative overflow-hidden flex-1 min-w-[80px] sm:min-w-[110px] rounded-full border px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a6b7a]"
                    style={{
                      borderColor: isActive ? "#0a6b7a" : "rgba(13,31,45,0.2)",
                      color:       isActive ? "#ffffff" : "#000000",
                    }}
                  >
                    <span className="relative z-10">{tab.label}</span>
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          key="pill-fill"
                          className="absolute inset-0 z-0"
                          style={{ background: "linear-gradient(90deg, #0a6b7a, #0a7a55)" }}
                          initial={{ y: "100%" }}
                          animate={{ y: "0%" }}
                          exit={{ y: "100%" }}
                          transition={{ duration: 0.32, ease: "backOut" }}
                        />
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            {/* Form card */}
            <GlowBorder>
              <div
                className="rounded-2xl p-8 md:p-10"
                style={{
                  background: "rgba(13,31,45,0.88)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`hdr-${formType}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="mb-7 pb-6 border-b border-white/[0.08]"
                  >
                    <p className="text-[10px] font-black tracking-[0.28em] uppercase mb-2" style={{ color: "#a8e8f5" }}>
                      Tell us what you need
                    </p>
                    <h3 className="text-xl md:text-2xl font-black mb-1.5 leading-snug text-white">
                      {activeTab.formTitle}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{activeTab.formDesc}</p>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`frm-${formType}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    {formType === "hire-only"   && <HireOnlyForm />}
                    {formType === "hire-manage" && <HireManageForm />}
                    {formType === "general"     && <GeneralContactForm formType="general" />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </GlowBorder>
          </div>

        </div>
      </div>
    </section>
  );
}
