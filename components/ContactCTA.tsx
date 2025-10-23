"use client";
import { useState } from "react";
import Section from "./Section";
import Card from "./Card";
import { Calendar, Mail, Phone } from "lucide-react";
import { useFormContext } from "./FormContext";
import HireOnlyForm from "./HireOnlyForm";
import HireManageForm from "./HireManageForm";
import GeneralContactForm from "./GeneralContactForm";

export default function ContactCTA() {
  const { formType, setFormType } = useFormContext();

  const tabs = [
    { id: "general" as const, label: "General Inquiry", color: "green" },
    { id: "hire-only" as const, label: "Hire-Only", color: "blue" },
    { id: "hire-manage" as const, label: "Hire + Manage", color: "purple" },
  ];

  return (
    <Section id="contact" background="panel">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Dream Team?
          </h2>
          <p className="text-gray-600 dark:text-white/70 text-lg">
            Get in touch and let's discuss how we can help you scale
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card hover className="text-center">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4
              bg-blue-100 dark:bg-blue-600/20">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Schedule a Meeting
            </h3>
            <p className="text-gray-600 dark:text-white/60 text-sm mb-4">
              Book a time that works for you
            </p>
            <a
              href="https://calendly.com/admin-remoteacktive/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 text-sm font-medium transition"
            >
              View Calendar →
            </a>
          </Card>

          <Card hover className="text-center">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4
              bg-purple-100 dark:bg-purple-600/20">
              <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Email Us
            </h3>
            <p className="text-gray-600 dark:text-white/60 text-sm mb-4">
              We'll respond within 24 hours
            </p>
            <a
              href="mailto:admin@remoteacktive.com"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 text-sm font-medium transition"
            >
              admin@remoteacktive.com
            </a>
          </Card>

          <Card hover className="text-center">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4
              bg-green-100 dark:bg-green-600/20">
              <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Call or Text
            </h3>
            <p className="text-gray-600 dark:text-white/60 text-sm mb-4">
              Speak with our team directly
            </p>
            <a
              href="tel:+14152511945"
              className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 text-sm font-medium transition"
            >
              +1(415)2511945
            </a>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto">
          {/* Tab Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 p-1.5 bg-gray-100 dark:bg-ink rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFormType(tab.id)}
                  className={`
                    flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all
                    ${
                      formType === tab.id
                        ? tab.color === "blue"
                          ? "bg-blue-600 text-white shadow-sm"
                          : tab.color === "purple"
                          ? "bg-purple-600 text-white shadow-sm"
                          : "bg-green-600 text-white shadow-sm"
                        : "text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Title */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {formType === "general" && "Send us a message"}
            {formType === "hire-only" && "Request Hire-Only Service"}
            {formType === "hire-manage" && "Request Hire + Manage Service"}
          </h3>

          {/* Forms */}
          <div className="transition-opacity duration-300">
            {formType === "general" && <GeneralContactForm />}
            {formType === "hire-only" && <HireOnlyForm />}
            {formType === "hire-manage" && <HireManageForm />}
          </div>
        </Card>
      </div>
    </Section>
  );
}
