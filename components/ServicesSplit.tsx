"use client";
import Section from "./Section";
import Card from "./Card";
import { Briefcase, Settings } from "lucide-react";
import { useFormContext } from "./FormContext";

export default function ServicesSplit() {
  const { setFormType } = useFormContext();

  const handleGetStarted = (type: "hire-only" | "hire-manage") => {
    setFormType(type);
    // Smooth scroll to contact form
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Section id="services" background="light">
      <div className="text-center mb-12">
        <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 dark:text-white/70 text-lg max-w-2xl mx-auto">
          Choose the level of support that fits your needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Hire-Only */}
        <Card hover className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
              bg-blue-100 dark:bg-blue-600/20">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Hire-Only
            </h3>
          </div>
          
          <p className="text-gray-600 dark:text-white/70 mb-6">
            We find the perfect candidate and hand them off to you, ready to integrate into your team.
          </p>
          
          <div className="space-y-3 mb-6 flex-grow">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
              <span className="text-gray-700 dark:text-white/80">Intake session to understand your needs</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
              <span className="text-gray-700 dark:text-white/80">Curated shortlist of qualified candidates</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
              <span className="text-gray-700 dark:text-white/80">Interview coordination and scorecards</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
              <span className="text-gray-700 dark:text-white/80">Offer support and negotiation assistance</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
              <span className="text-gray-700 dark:text-white/80">Onboarding checklist, SOP handover, and tool setup</span>
            </div>
          </div>
          
          <button
            onClick={() => handleGetStarted("hire-only")}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-500 transition w-full"
          >
            Get Started
          </button>
        </Card>

        {/* Hire + Manage */}
        <Card hover className="flex flex-col
          bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-600/10 dark:to-purple-600/10 
          border-blue-300 dark:border-blue-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
              bg-purple-100 dark:bg-purple-600/20">
              <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Hire + Manage
              </h3>
              <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                Most Popular
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-white/70 mb-6">
            We handle recruitment AND ongoing operations so you can focus entirely on strategic work.
          </p>
          
          <div className="space-y-3 mb-6 flex-grow">
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
              <span className="text-gray-700 dark:text-white/80">Everything in Hire-Only, plus:</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
              <span className="text-gray-700 dark:text-white/80">Managed operations with KPIs and QA monitoring</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
              <span className="text-gray-700 dark:text-white/80">Performance playbooks, coaching, and reviews</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
              <span className="text-gray-700 dark:text-white/80">Tooling management and regular reporting</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
              <span className="text-gray-700 dark:text-white/80">Continuous process improvement and optimization</span>
            </div>
          </div>
          
          <button
            onClick={() => handleGetStarted("hire-manage")}
            className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-5 py-3 text-white font-medium hover:bg-purple-500 transition w-full"
          >
            Get Started
          </button>
        </Card>
      </div>
    </Section>
  );
}