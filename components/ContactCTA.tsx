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
    <>
      {/* Contact Cards Section - GRADIENT BACKGROUND */}
      <section id="contact" className="relative py-24 bg-gradient-primary overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-white text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Ready to Build Your Dream Team?
            </h2>
            <p className="text-white/90 text-xl md:text-2xl font-medium">
              Get in touch and let's discuss how we can help you scale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[rgba(26,35,50,0.6)] backdrop-blur-md border border-[rgba(87,197,207,0.2)] rounded-2xl p-10 text-center transition-all duration-300 hover:bg-[rgba(26,35,50,0.8)] hover:border-[#57C5CF] hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-20 h-20 rounded-full border-2 border-[#57C5CF] bg-[rgba(87,197,207,0.15)] flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-9 h-9 text-[#57C5CF]" />
              </div>
              <h3 className="font-bold text-white mb-3 text-[22px]">
                Schedule a Meeting
              </h3>
              <p className="text-gray-300 text-base mb-6">
                Book a time that works for you
              </p>
              <a
                href="https://calendly.com/admin-remoteacktive/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#57C5CF] hover:text-[#4DD0E1] text-lg font-semibold transition inline-block hover:translate-x-1"
              >
                View Calendar →
              </a>
            </div>

            <div className="bg-[rgba(26,35,50,0.6)] backdrop-blur-md border border-[rgba(87,197,207,0.2)] rounded-2xl p-10 text-center transition-all duration-300 hover:bg-[rgba(26,35,50,0.8)] hover:border-[#57C5CF] hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-20 h-20 rounded-full border-2 border-[#57C5CF] bg-[rgba(87,197,207,0.15)] flex items-center justify-center mx-auto mb-6">
                <Mail className="w-9 h-9 text-[#57C5CF]" />
              </div>
              <h3 className="font-bold text-white mb-3 text-[22px]">
                Email Us
              </h3>
              <p className="text-gray-300 text-base mb-6">
                We'll respond within 24 hours
              </p>
              <a
                href="mailto:admin@remoteacktive.com"
                className="text-[#57C5CF] hover:text-[#4DD0E1] text-lg font-semibold transition inline-block hover:translate-x-1 break-all"
              >
                admin@remoteacktive.com
              </a>
            </div>

            <div className="bg-[rgba(26,35,50,0.6)] backdrop-blur-md border border-[rgba(87,197,207,0.2)] rounded-2xl p-10 text-center transition-all duration-300 hover:bg-[rgba(26,35,50,0.8)] hover:border-[#57C5CF] hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-20 h-20 rounded-full border-2 border-[#57C5CF] bg-[rgba(87,197,207,0.15)] flex items-center justify-center mx-auto mb-6">
                <Phone className="w-9 h-9 text-[#57C5CF]" />
              </div>
              <h3 className="font-bold text-white mb-3 text-[22px]">
                Call or Text
              </h3>
              <p className="text-gray-300 text-base mb-6">
                Speak with our team directly
              </p>
              <a
                href="tel:+14152511945"
                className="text-[#57C5CF] hover:text-[#4DD0E1] text-lg font-semibold transition inline-block hover:translate-x-1"
              >
                +1 (415) 251-1945
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section - Separate Full Height Section */}
      <Section background="dark">
        <div className="max-w-4xl mx-auto min-h-screen py-20">
          {/* Tab Navigation */}
          <div className="flex items-stretch justify-center gap-4 mb-12 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFormType(tab.id)}
                className={`
                  px-8 py-4 rounded-full text-base font-bold transition-all
                  ${
                    formType === tab.id
                      ? "bg-[#57C5CF] text-black shadow-lg scale-105"
                      : "bg-transparent border-2 border-gray-600 text-gray-300 hover:border-[#57C5CF] hover:text-[#57C5CF]"
                  }
                `}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>{tab.label}</span>
                  {tab.isFeatured && (
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Form Container */}
          <div className="bg-[#1A2332] rounded-2xl p-12 border border-gray-700 shadow-2xl">
            {/* Most Popular Badge for Featured Tab */}
            {currentTab.isFeatured && (
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold rounded-full uppercase tracking-wider">
                  ⭐ Most Popular
                </span>
              </div>
            )}

            {/* Form Title and Description */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-white mb-3">
                {currentTab.title}
              </h3>
              <p className="text-gray-300 text-lg">
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
      </Section>
    </>
  );
}
