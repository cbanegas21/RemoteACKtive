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
    <Section id="contact" background="light">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Dream Team?
          </h2>
          <p className="text-gray-600 text-lg">
            Get in touch and let's discuss how we can help you scale
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card hover className="text-center">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4
              bg-[#57C5CF]/10">
              <Calendar className="w-6 h-6 text-[#57C5CF]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Schedule a Meeting
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Book a time that works for you
            </p>
            <a
              href="https://calendly.com/admin-remoteacktive/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#57C5CF] hover:text-[#378B57] text-sm font-medium transition"
            >
              View Calendar →
            </a>
          </Card>

          <Card hover className="text-center">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4
              bg-[#378B57]/10">
              <Mail className="w-6 h-6 text-[#378B57]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Email Us
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              We'll respond within 24 hours
            </p>
            <a
              href="mailto:admin@remoteacktive.com"
              className="text-[#378B57] hover:text-[#57C5CF] text-sm font-medium transition"
            >
              admin@remoteacktive.com
            </a>
          </Card>

          <Card hover className="text-center">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4
              bg-[#378B57]/10">
              <Phone className="w-6 h-6 text-[#378B57]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Call or Text
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Speak with our team directly
            </p>
            <a
              href="tel:+14152511945"
              className="text-[#378B57] hover:text-[#57C5CF] text-sm font-medium transition"
            >
              +1(415)2511945
            </a>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto">
          {/* Tab Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 p-1.5 bg-gray-100 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFormType(tab.id)}
                  className={`
                    flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all
                    ${
                      formType === tab.id
                        ? tab.color === "blue"
                          ? "bg-[#57C5CF] text-white shadow-sm"
                          : tab.color === "purple"
                          ? "bg-[#378B57] text-white shadow-sm"
                          : "bg-[#378B57] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
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
