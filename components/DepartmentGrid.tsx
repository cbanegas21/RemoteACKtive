"use client";

import { useState, useRef } from "react";
import { Search, ArrowRight } from "lucide-react";

const TEAL     = "#a8e8f5";
const MINT     = "#b8fce8";
const TEAL_RGB = "168,232,245";
const MINT_RGB = "184,252,232";

const departments = [
  {
    title: "Finance & Accounting",
    description: "From day-to-day bookkeeping to advanced financial strategies — your finances in expert hands.",
    roles: [
      "Bookkeepers","Accountants","Financial Analysts","Payroll Specialists",
      "Tax Consultants","Controllers","CFO / Finance Directors","AP / AR Specialists",
      "Budget Analysts","Auditors",
    ],
  },
  {
    title: "Marketing & Advertising",
    description: "Digital marketers, creative designers, and growth strategists who capture attention.",
    roles: [
      "Digital Marketers","Content Creators","SEO Specialists","Social Media Managers",
      "Graphic Designers","Campaign Strategists","Email Marketing Specialists","PPC Specialists",
      "Marketing Analysts","Brand Managers","Growth Marketers",
    ],
  },
  {
    title: "Developers & IT",
    description: "Top-tier tech professionals from front-end wizards to cloud engineers.",
    roles: [
      "Full-Stack Developers","Front-End Developers","Back-End Developers","DevOps Engineers",
      "QA Testers","Technical Support","Cloud Engineers","Database Administrators",
      "System Administrators","Network Engineers","Security Engineers","Mobile Developers",
      "Data Engineers",
    ],
  },
  {
    title: "Human Resources",
    description: "HR specialists handling recruitment, compliance, and employee engagement.",
    roles: [
      "HR Managers","Recruiters","Compliance Officers","Payroll Specialists",
      "Training & Development","Employee Relations","Benefits Administrators",
      "HR Coordinators","Talent Acquisition","Onboarding Specialists",
    ],
  },
  {
    title: "Customer Service",
    description: "Support reps, account managers, and success specialists to delight your customers.",
    roles: [
      "Customer Support Reps","Account Managers","Success Specialists","Technical Support",
      "Chat Support","Call Center Agents","Help Desk Support","Customer Success Managers",
      "Escalation Specialists","Quality Assurance Analysts",
    ],
  },
  {
    title: "Executive Assistants",
    description: "Skilled EAs to manage schedules, communications, and operations.",
    roles: [
      "Executive Assistants","Personal Assistants","Administrative Coordinators",
      "Office Managers","Virtual Assistants","Project Coordinators","Operations Coordinators",
    ],
  },
  {
    title: "Creative Services",
    description: "Talented designers, writers, and multimedia professionals to bring your vision to life.",
    roles: [
      "Video Editors","Motion Graphics Designers","UI / UX Designers",
      "Brand Designers","Copywriters","Content Writers",
    ],
  },
  {
    title: "Sales & Business Development",
    description: "Skilled sales professionals and business development experts to drive revenue.",
    roles: [
      "Inside Sales Reps","Account Executives","SDRs / BDRs",
      "Sales Operations","Business Development Managers",
    ],
  },
  {
    title: "Operations & Project Management",
    description: "Skilled managers and coordinators to streamline operations and deliver projects on time.",
    roles: [
      "Operations Managers","Project Coordinators","Process Improvement Specialists",
      "Workflow Automation Specialists","Project Managers","Scrum Masters","Business Analysts",
    ],
  },
];

// Build two marquee rows from the full role list
const _flat = departments.flatMap((d) => d.roles);
const ROW1  = _flat.slice(0, 40);
const ROW2  = _flat.slice(40);

/* ── Marquee strip ── */
function RoleMarquee({
  roles,
  reverse,
  accent,
  accentRgb,
}: {
  roles: string[];
  reverse?: boolean;
  accent: string;
  accentRgb: string;
}) {
  const doubled = [...roles, ...roles];
  return (
    <div className="overflow-hidden w-full py-1.5 mask-fade-x">
      <div
        className={reverse ? "marquee-rev" : "marquee-fwd"}
        style={{ display: "flex", gap: "10px", width: "max-content" }}
      >
        {doubled.map((role, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
            style={{
              background: `rgba(${accentRgb},0.06)`,
              border: `1px solid rgba(${accentRgb},0.15)`,
              color: accent,
            }}
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Chip with staggered entrance ── */
function RoleChip({
  role,
  index,
  accent,
  accentRgb,
  visible,
}: {
  role: string;
  index: number;
  accent: string;
  accentRgb: string;
  visible: boolean;
}) {
  return (
    <span
      className="inline-block px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300"
      style={{
        background: `rgba(${accentRgb},0.07)`,
        border: `1px solid rgba(${accentRgb},0.18)`,
        color: accent,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.95)",
        transitionDelay: visible ? `${index * 28}ms` : "0ms",
      }}
    >
      {role}
    </span>
  );
}

export default function DepartmentGrid() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [chipsVisible, setChipsVisible] = useState(true);
  const prevIdxRef = useRef(activeIdx);

  const isSearching = searchTerm.trim().length > 0;

  // When tab changes, briefly hide chips then re-show to trigger stagger
  const handleTabClick = (i: number) => {
    if (i === activeIdx) return;
    setChipsVisible(false);
    setTimeout(() => {
      setActiveIdx(i);
      prevIdxRef.current = i;
      setChipsVisible(true);
    }, 120);
  };

  const active    = departments[activeIdx];
  const accentHex = activeIdx % 2 === 0 ? MINT : TEAL;
  const accentRgb = activeIdx % 2 === 0 ? MINT_RGB : TEAL_RGB;

  // Search: collect matches across all depts
  const searchResults = isSearching
    ? departments
        .map((dept) => {
          const matchedRoles = dept.roles.filter((r) =>
            r.toLowerCase().includes(searchTerm.toLowerCase())
          );
          const deptMatch = dept.title.toLowerCase().includes(searchTerm.toLowerCase());
          return { dept, matchedRoles: deptMatch ? dept.roles : matchedRoles };
        })
        .filter((x) => x.matchedRoles.length > 0)
    : [];

  return (
    <section
      id="departments"
      className="relative overflow-hidden"
      style={{ background: "#04090f" }}
    >
      {/* Gradient blobs background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            filter: 'blur(60px)',
            ['--color-1' as string]: '87,197,207',
            ['--color-2' as string]: '79,255,176',
            ['--color-3' as string]: '168,223,240',
            ['--color-4' as string]: '57,139,87',
            ['--color-5' as string]: '11,23,39',
          } as React.CSSProperties}
        >
          <div className="absolute animate-first opacity-70" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-1),0.5) 0, rgba(var(--color-1),0) 50%) no-repeat' }} />
          <div className="absolute animate-second opacity-70" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-2),0.5) 0, rgba(var(--color-2),0) 50%) no-repeat', transformOrigin: 'calc(50% - 300px) center' }} />
          <div className="absolute animate-third opacity-70" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-3),0.4) 0, rgba(var(--color-3),0) 50%) no-repeat', transformOrigin: 'calc(50% + 300px) center' }} />
          <div className="absolute animate-fourth opacity-60" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-4),0.4) 0, rgba(var(--color-4),0) 50%) no-repeat', transformOrigin: 'calc(50% - 150px) center' }} />
          <div className="absolute animate-fifth opacity-50" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-5),0.4) 0, rgba(var(--color-5),0) 50%) no-repeat', transformOrigin: 'calc(50% - 600px) calc(50% + 600px)' }} />
        </div>
      </div>

      {/* ─── Marquee header zone ─── */}
      <div
        className="pt-16 pb-6 relative"
        style={{
          borderBottom: "1px solid rgba(168,232,245,0.06)",
        }}
      >
        {/* Subtle radial glow behind marquee */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 100% at 50% 100%, rgba(${TEAL_RGB},0.04) 0%, transparent 70%)`,
          }}
        />

        <style>{`
          @keyframes mfwd { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          @keyframes mrev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
          .marquee-fwd { animation: mfwd 90s linear infinite }
          .marquee-rev { animation: mrev 75s linear infinite }
          .mask-fade-x {
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
            mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          }
        `}</style>

        <div className="space-y-2">
          <RoleMarquee roles={ROW1} accent={TEAL} accentRgb={TEAL_RGB} />
          <RoleMarquee roles={ROW2} reverse accent={MINT} accentRgb={MINT_RGB} />
        </div>
      </div>

      {/* ─── Main content ─── */}
      <div className="container mx-auto px-6 max-w-6xl relative z-10 py-14">

        {/* Header */}
        <div className="mb-10">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Whatever your business needs,{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${TEAL} 50%, ${MINT} 100%)` }}
            >
              we know how to hire it.
            </span>
          </h2>

          <p
            className="text-white text-base max-w-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Pick a department below to explore every available role — or search for exactly what you need.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-sm mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(168,232,245,0.4)" }} />
            <input
              type="text"
              placeholder="Search for a role…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 text-white/90 placeholder:text-white/50"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(168,232,245,0.15)",
                fontFamily: "var(--font-body)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(168,232,245,0.45)"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(168,232,245,0.15)"; }}
            />
          </div>
        </div>

        {/* ─── SEARCH MODE ─── */}
        {isSearching ? (
          <div className="space-y-6">
            {searchResults.length === 0 ? (
              <p className="text-white/50 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                No roles found for &ldquo;{searchTerm}&rdquo; — try a different term.
              </p>
            ) : (
              searchResults.map(({ dept, matchedRoles }, gi) => {
                const aHex = gi % 2 === 0 ? MINT : TEAL;
                const aRgb = gi % 2 === 0 ? MINT_RGB : TEAL_RGB;
                return (
                  <div key={dept.title}>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-[10px] font-black tracking-[0.25em] uppercase"
                        style={{ color: aHex, fontFamily: "var(--font-body)" }}
                      >
                        {dept.title}
                      </span>
                      <div className="flex-1 h-px" style={{ background: `rgba(${aRgb},0.12)` }} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matchedRoles.map((role) => (
                        <span
                          key={role}
                          className="px-3.5 py-1.5 rounded-full text-sm font-medium"
                          style={{
                            background: `rgba(${aRgb},0.08)`,
                            border: `1px solid rgba(${aRgb},0.2)`,
                            color: aHex,
                          }}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* ─── TAB MODE ─── */
          <>
            {/* Department tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {departments.map((dept, i) => {
                const isActive = i === activeIdx;
                const tHex = i % 2 === 0 ? MINT : TEAL;
                const tRgb = i % 2 === 0 ? MINT_RGB : TEAL_RGB;
                return (
                  <button
                    key={dept.title}
                    onClick={() => handleTabClick(i)}
                    className="px-4 py-2.5 min-h-[44px] rounded-full text-sm font-bold transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-body)",
                      background: isActive
                        ? `rgba(${tRgb},0.14)`
                        : "rgba(255,255,255,0.04)",
                      border: isActive
                        ? `1px solid rgba(${tRgb},0.45)`
                        : "1px solid rgba(255,255,255,0.08)",
                      color: isActive ? tHex : "rgba(255,255,255,0.75)",
                      transform: isActive ? "scale(1.04)" : "scale(1)",
                    }}
                  >
                    {dept.title}
                  </button>
                );
              })}
            </div>

            {/* Active department panel */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid rgba(${accentRgb},0.14)`,
              }}
            >
              {/* Top accent line */}
              <div
                className="h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${accentHex}66, transparent)` }}
              />

              <div className="grid md:grid-cols-5 gap-0">

                {/* Left: dept info */}
                <div
                  className="md:col-span-2 p-7 lg:p-9 flex flex-col"
                  style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <h3
                    className="text-xl font-black text-white leading-tight mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {active.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed text-white mb-6 flex-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {active.description}
                  </p>

                  <div className="h-px mb-5" style={{ background: `rgba(${accentRgb},0.1)` }} />

                  <div className="flex items-center gap-3">
                    <span
                      className="text-3xl font-black leading-none"
                      style={{ color: accentHex, fontFamily: "var(--font-heading)" }}
                    >
                      {active.roles.length}
                    </span>
                    <span className="text-sm text-white" style={{ fontFamily: "var(--font-body)" }}>
                      roles available<br />in this department
                    </span>
                  </div>
                </div>

                {/* Right: role chips */}
                <div className="md:col-span-3 p-7 lg:p-9 flex flex-wrap gap-2 content-start">
                  {active.roles.map((role, i) => (
                    <RoleChip
                      key={`${activeIdx}-${role}`}
                      role={role}
                      index={i}
                      accent={accentHex}
                      accentRgb={accentRgb}
                      visible={chipsVisible}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-8 flex items-center justify-between flex-wrap gap-5">
              <p className="text-white text-base font-medium" style={{ fontFamily: "var(--font-body)" }}>
                Don&apos;t see your role?{" "}
                <a
                  href="#contact"
                  className="font-bold underline underline-offset-2 transition-colors"
                  style={{ color: TEAL }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = MINT)}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = TEAL)}
                >
                  Ask us — we hire across 100+ job titles.
                </a>
              </p>
              <a
                href="/book-a-call"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-bold transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: `linear-gradient(135deg, #ffffff 0%, ${TEAL} 60%, ${MINT} 100%)`,
                  color: "#04090f",
                }}
              >
                Hire in this department
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
