"use client";
import { useState } from "react";
import Section from "./Section";
import Card from "./Card";
import { Calendar, Mail, Phone, Star } from "lucide-react";
import { useFormContext } from "./FormContext";
import HireOnlyForm from "./HireOnlyForm";
import HireManageForm from "./HireManageForm";
import GeneralContactForm from "./GeneralContactForm";

export default function ContactCTA() {
  const { formType, setFormType } = useFormContext();

  const tabs = [
    {
      id: "hire-only" as const,
      label: "Recruitment-Only",
      title: "Interested in Recruitment-Only?",
      description: "Get expert recruitment without ongoing management",
      buttonText: "Book Discovery Call",
      isFeatured: false
    },
    {
      id: "hire-manage" as const,
      label: "Full Experience",
      title: "Ready for Full Outsourcing Support?",
      description: "Get recruitment + ongoing management and support",
      buttonText: "Book Discovery Call",
      isFeatured: true
    },
    {
      id: "training" as const,
      label: "Training Program",
      title: "Upgrade Your Existing Team?",
      description: "Training and development for your current offshore team",
      buttonText: "Learn More",
      isFeatured: false
    },
  ];

  const currentTab = tabs.find(tab => tab.id === formType) || tabs[1];

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

        {/* Dark Theme Form Card */}
        <div className="max-w-2xl mx-auto bg-[#1E2430] rounded-xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="p-6 pb-0">
            <div className="flex items-stretch gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFormType(tab.id)}
                  className={`
                    flex-1 px-4 py-3 rounded-lg text-sm font-semibold transition-all relative
                    ${
                      formType === tab.id
                        ? "bg-[#FF6B35] text-white shadow-lg"
                        : "bg-transparent text-gray-300 hover:bg-white/5"
                    }
                  `}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>{tab.label}</span>
                    {tab.isFeatured && (
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="px-6 pb-6">
            {/* Most Popular Badge for Featured Tab */}
            {currentTab.isFeatured && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              </div>
            )}

            {/* Form Title and Description */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentTab.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {currentTab.description}
              </p>
            </div>

            {/* Forms */}
            <div className="transition-opacity duration-300">
              {formType === "hire-only" && <HireOnlyForm />}
              {formType === "hire-manage" && <HireManageForm />}
              {formType === "training" && <GeneralContactForm formType="training" />}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
