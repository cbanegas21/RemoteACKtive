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
  Search
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
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; bgLight: string; icon: string; iconLight: string; hover: string; hoverLight: string }> = {
      blue: { 
        bg: "bg-blue-600/20", 
        bgLight: "bg-blue-100",
        icon: "text-blue-400", 
        iconLight: "text-blue-600",
        hover: "hover:border-blue-500/50",
        hoverLight: "hover:border-blue-400"
      },
      pink: { 
        bg: "bg-pink-600/20", 
        bgLight: "bg-pink-100",
        icon: "text-pink-400", 
        iconLight: "text-pink-600",
        hover: "hover:border-pink-500/50",
        hoverLight: "hover:border-pink-400"
      },
      green: { 
        bg: "bg-green-600/20", 
        bgLight: "bg-green-100",
        icon: "text-green-400", 
        iconLight: "text-green-600",
        hover: "hover:border-green-500/50",
        hoverLight: "hover:border-green-400"
      },
      purple: { 
        bg: "bg-purple-600/20", 
        bgLight: "bg-purple-100",
        icon: "text-purple-400", 
        iconLight: "text-purple-600",
        hover: "hover:border-purple-500/50",
        hoverLight: "hover:border-purple-400"
      },
      yellow: { 
        bg: "bg-yellow-600/20", 
        bgLight: "bg-yellow-100",
        icon: "text-yellow-400", 
        iconLight: "text-yellow-600",
        hover: "hover:border-yellow-500/50",
        hoverLight: "hover:border-yellow-400"
      },
      teal: { 
        bg: "bg-teal-600/20", 
        bgLight: "bg-teal-100",
        icon: "text-teal-400", 
        iconLight: "text-teal-600",
        hover: "hover:border-teal-500/50",
        hoverLight: "hover:border-teal-400"
      },
    };
    return colors[color];
  };

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.roles.some((role) =>
        role.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <Section id="departments">
      <div className="text-center mb-12">
        <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold mb-4">
          Looking for a Specific Role?
        </h2>
        <p className="text-blue-600 dark:text-blue-400 text-xl mb-8 font-semibold">
          We Know How to Hire It
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/40" />
            <input
              type="text"
              placeholder="Search for a role or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border transition
                bg-white dark:bg-panel 
                border-gray-300 dark:border-white/10 
                text-gray-900 dark:text-white 
                placeholder-gray-400 dark:placeholder-white/40 
                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredDepartments.map((dept, idx) => {
          const Icon = dept.icon;
          const colors = getColorClasses(dept.color);
          const isExpanded = expandedDept === idx;

          return (
            <Card
              key={idx}
              hover
              className={`cursor-pointer transition-all ${colors.hoverLight} dark:${colors.hover}`}
              onClick={() => setExpandedDept(isExpanded ? null : idx)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                  ${colors.bgLight} dark:${colors.bg}`}>
                  <Icon className={`w-6 h-6 ${colors.iconLight} dark:${colors.icon}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-900 dark:text-white text-xl font-semibold">
                      {dept.title}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform text-gray-600 dark:text-white/60 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed mb-3">
                    {dept.description}
                  </p>

                  {/* Expandable Roles */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="pt-3 mt-3 border-t border-gray-200 dark:border-white/10">
                      <p className="text-gray-500 dark:text-white/50 text-xs font-semibold mb-2 uppercase tracking-wider">
                        Available Roles:
                      </p>
                      <ul className="grid grid-cols-2 gap-2">
                        {dept.roles.map((role, roleIdx) => (
                          <li
                            key={roleIdx}
                            className="text-gray-700 dark:text-white/80 text-sm"
                          >
                            • {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredDepartments.length === 0 && (
        <p className="text-gray-600 dark:text-white/60 text-center text-lg mt-8">
          No departments found. Try a different search term.
        </p>
      )}
    </Section>
  );
}