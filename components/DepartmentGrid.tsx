"use client";
import { useState } from "react";
import Section from "./Section";
import Card from "./Card";
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
  Settings
} from "lucide-react";

export default function DepartmentGrid() {
  const [expandedDept, setExpandedDept] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const departments = [
    {
      icon: Calculator,
      title: "Finance & Accounting",
      description: "From day-to-day bookkeeping to advanced financial strategies, we ensure your finances are in expert hands.",
      color: "blue",
      roles: [
        "Bookkeepers",
        "Accountants",
        "Financial Analysts",
        "Payroll Specialists",
        "Tax Consultants",
        "Controllers",
        "CFO/Finance Directors",
        "AP/AR Specialists",
        "Budget Analysts",
        "Auditors",
      ],
    },
    {
      icon: Megaphone,
      title: "Marketing & Advertising",
      description: "Boost your brand with digital marketers, creative designers, and growth strategists who know how to capture attention.",
      color: "pink",
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
      description: "Leverage top-tier tech professionals—from front-end wizards to cloud engineers—to power your digital transformation.",
      color: "green",
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
      description: "Our HR specialists handle recruitment, compliance, and employee engagement—so you can focus on growth.",
      color: "purple",
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
      description: "Support representatives, account managers, and success specialists to delight your customers.",
      color: "yellow",
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
      description: "Skilled EAs to manage schedules, communications, and operations for busy executives.",
      color: "teal",
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
      description: "Bring your vision to life with talented designers, writers, and multimedia professionals.",
      color: "orange",
      roles: [
        "Video Editors",
        "Motion Graphics Designers",
        "UI/UX Designers",
        "Brand Designers",
        "Copywriters",
        "Content Writers",
      ],
    },
    {
      icon: TrendingUp,
      title: "Sales & Business Development",
      description: "Drive revenue growth with skilled sales professionals and business development experts.",
      color: "green",
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
      description: "Streamline your operations and deliver projects on time with skilled operations managers and project coordinators.",
      color: "blue",
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

  const getColorClasses = (color: string) => {
    // Using orange color scheme for dark theme
    return {
      bg: "bg-primary-orange/10",
      icon: "text-primary-orange",
      hover: "hover:border-primary-orange/50"
    };
  };

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.roles.some((role) =>
        role.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <Section id="departments" background="dark">
      <div className="text-center mb-8">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
          What Can Remote Staff Do For You?
        </h2>
        <p className="text-primary-orange text-xl mb-8 font-semibold">
          We Know How to Hire It
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a role or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border transition
                border-white/10 text-white placeholder-gray-400
                focus:border-primary-orange focus:outline-none focus:ring-2 focus:ring-primary-orange/50"
              style={{ backgroundColor: '#1E2430' }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDepartments.map((dept, idx) => {
          const Icon = dept.icon;
          const colors = getColorClasses(dept.color);
          const isExpanded = expandedDept === idx;

          return (
            <div
              key={idx}
              className={`bg-background-darkCard border border-white/10 rounded-lg p-5 cursor-pointer transition-all ${colors.hover} hover:border-primary-orange/40`}
              onClick={() => setExpandedDept(isExpanded ? null : idx)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white text-lg font-semibold">
                      {dept.title}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform text-gray-400 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    {dept.description}
                  </p>

                  {/* Expandable Roles */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="pt-3 mt-3 border-t border-white/10">
                      <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">
                        Available Roles:
                      </p>
                      <ul className="grid grid-cols-1 gap-2">
                        {dept.roles.map((role, roleIdx) => (
                          <li key={roleIdx} className="text-gray-300 text-sm flex items-start gap-1.5">
                            <span className="text-primary-orange mt-0.5">✓</span>
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

      {filteredDepartments.length === 0 && (
        <p className="text-gray-400 text-center text-lg mt-8">
          No departments found. Try a different search term.
        </p>
      )}
    </Section>
  );
}