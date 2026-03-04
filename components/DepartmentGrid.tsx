"use client";
import { useState } from "react";
import {
  Calculator,
  Megaphone,
  Code,
  Users,
  Headphones,
  Briefcase,
  ChevronDown,
  Search,
  Palette,
  TrendingUp,
  Settings,
} from "lucide-react";

/* ─── Palette ─────────────────────────────────────────────────────────────── */
const palette = [
  {
    iconBg: "bg-[#57C5CF]/15",
    iconColor: "text-[#57C5CF]",
    border: "border-[#57C5CF]/20 hover:border-[#57C5CF]/50",
    checkColor: "text-[#57C5CF]",
    divider: "border-[#57C5CF]/15",
    accentHex: "#57C5CF",
  },
  {
    iconBg: "bg-[#4FFFB0]/15",
    iconColor: "text-[#4FFFB0]",
    border: "border-[#4FFFB0]/20 hover:border-[#4FFFB0]/50",
    checkColor: "text-[#4FFFB0]",
    divider: "border-[#4FFFB0]/15",
    accentHex: "#4FFFB0",
  },
];

/* ─── Department data ─────────────────────────────────────────────────────── */
const departments = [
  {
    icon: Calculator,
    title: "Finance & Accounting",
    description:
      "From day-to-day bookkeeping to advanced financial strategies, we ensure your finances are in expert hands.",
    roles: [
      "Bookkeepers",
      "Accountants",
      "Financial Analysts",
      "Payroll Specialists",
      "Tax Consultants",
      "Controllers",
      "CFO / Finance Directors",
      "AP / AR Specialists",
      "Budget Analysts",
      "Auditors",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing & Advertising",
    description:
      "Boost your brand with digital marketers, creative designers, and growth strategists who know how to capture attention.",
    roles: [
      "Digital Marketers",
      "Content Creators",
      "SEO Specialists",
      "Social Media Managers",
      "Graphic Designers",
      "Campaign Strategists",
      "Email Marketing Specialists",
      "PPC Specialists",
      "Marketing Analysts",
      "Brand Managers",
      "Growth Marketers",
    ],
  },
  {
    icon: Code,
    title: "Developers & IT",
    description:
      "Leverage top-tier tech professionals — from front-end wizards to cloud engineers — to power your digital transformation.",
    roles: [
      "Full-Stack Developers",
      "Front-End Developers",
      "Back-End Developers",
      "DevOps Engineers",
      "QA Testers",
      "Technical Support",
      "Cloud Engineers",
      "Database Administrators",
      "System Administrators",
      "Network Engineers",
      "Security Engineers",
      "Mobile Developers",
      "Data Engineers",
    ],
  },
  {
    icon: Users,
    title: "Human Resources",
    description:
      "Our HR specialists handle recruitment, compliance, and employee engagement — so you can focus on growth.",
    roles: [
      "HR Managers",
      "Recruiters",
      "Compliance Officers",
      "Payroll Specialists",
      "Training & Development",
      "Employee Relations",
      "Benefits Administrators",
      "HR Coordinators",
      "Talent Acquisition",
      "Onboarding Specialists",
    ],
  },
  {
    icon: Headphones,
    title: "Customer Service",
    description:
      "Support representatives, account managers, and success specialists to delight your customers.",
    roles: [
      "Customer Support Reps",
      "Account Managers",
      "Success Specialists",
      "Technical Support",
      "Chat Support",
      "Call Center Agents",
      "Help Desk Support",
      "Customer Success Managers",
      "Escalation Specialists",
      "Quality Assurance Analysts",
    ],
  },
  {
    icon: Briefcase,
    title: "Executive Assistants",
    description:
      "Skilled EAs to manage schedules, communications, and operations for busy executives.",
    roles: [
      "Executive Assistants",
      "Personal Assistants",
      "Administrative Coordinators",
      "Office Managers",
      "Virtual Assistants",
      "Project Coordinators",
      "Operations Coordinators",
    ],
  },
  {
    icon: Palette,
    title: "Creative Services",
    description:
      "Bring your vision to life with talented designers, writers, and multimedia professionals.",
    roles: [
      "Video Editors",
      "Motion Graphics Designers",
      "UI / UX Designers",
      "Brand Designers",
      "Copywriters",
      "Content Writers",
    ],
  },
  {
    icon: TrendingUp,
    title: "Sales & Business Development",
    description:
      "Drive revenue growth with skilled sales professionals and business development experts.",
    roles: [
      "Inside Sales Reps",
      "Account Executives",
      "SDRs / BDRs",
      "Sales Operations",
      "Business Development Managers",
    ],
  },
  {
    icon: Settings,
    title: "Operations & Project Management",
    description:
      "Streamline your operations and deliver projects on time with skilled managers and project coordinators.",
    roles: [
      "Operations Managers",
      "Project Coordinators",
      "Process Improvement Specialists",
      "Workflow Automation Specialists",
      "Project Managers",
      "Scrum Masters",
      "Business Analysts",
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function DepartmentGrid() {
  const [expandedDept, setExpandedDept] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.roles.some((role) =>
        role.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <section id="departments" className="py-20 bg-[#0F1926]">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
              9 Departments · 79+ Roles
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Whatever Your Business Needs,{" "}
            <span className="text-[#4FFFB0]">We Know How to Hire It</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Browse every department below and click any card to see the exact
            roles we place — all pre-vetted and ready to start.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
            <input
              type="text"
              placeholder="Search for a role or department…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1E2430] pl-10 pr-4 py-3 rounded-xl border border-white/10 text-white placeholder-white/35 text-sm
                focus:border-[#57C5CF] focus:outline-none focus:ring-2 focus:ring-[#57C5CF]/20 transition-colors"
            />
          </div>
        </div>

        {/* Department cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDepartments.map((dept, idx) => {
            const Icon = dept.icon;
            /* use the original dept index so colors stay consistent when filtered */
            const originalIdx = departments.indexOf(dept);
            const c = palette[originalIdx % 2];
            const isExpanded = expandedDept === idx;

            return (
              <div
                key={dept.title}
                className={`rounded-2xl border bg-[#1E2430] cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${c.border}`}
                onClick={() => setExpandedDept(isExpanded ? null : idx)}
              >
                {/* Top accent bar */}
                <div
                  className="h-0.5 rounded-t-2xl w-full"
                  style={{
                    background: `linear-gradient(90deg, ${c.accentHex} 0%, transparent 75%)`,
                  }}
                />

                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${c.iconBg}`}
                    >
                      <Icon className={`w-5 h-5 ${c.iconColor}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Title row */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-white font-bold text-base leading-snug">
                          {dept.title}
                        </h3>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 text-white/40 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {/* Description */}
                      <p className="text-white/55 text-sm leading-relaxed">
                        {dept.description}
                      </p>

                      {/* Role count pill */}
                      <span
                        className={`inline-block mt-3 text-xs font-semibold px-2.5 py-0.5 rounded-full ${c.iconBg} ${c.iconColor}`}
                      >
                        {dept.roles.length} roles
                      </span>
                    </div>
                  </div>

                  {/* Expandable role list */}
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isExpanded ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className={`pt-4 border-t ${c.divider}`}>
                        <p className="text-white/35 text-xs font-bold uppercase tracking-widest mb-3">
                          Available Roles
                        </p>
                        <ul className="grid grid-cols-1 gap-1.5">
                          {dept.roles.map((role) => (
                            <li
                              key={role}
                              className="text-white/70 text-sm flex items-start gap-2"
                            >
                              <span className={`mt-0.5 text-xs ${c.checkColor}`}>
                                ✓
                              </span>
                              <span>{role}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredDepartments.length === 0 && (
          <p className="text-white/40 text-center text-base mt-10">
            No results for &ldquo;{searchTerm}&rdquo; — try a different role or department.
          </p>
        )}

      </div>
    </section>
  );
}
