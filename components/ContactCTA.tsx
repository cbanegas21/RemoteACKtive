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
      {/* Contact Cards Section - Above the Fold */}
      <Section id="contact" background="dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
              Ready to Build Your Dream Team?
            </h2>
            <p className="text-gray-300 text-xl">
              Get in touch and let's discuss how we can help you scale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card variant="dark" hover className="text-center">
              <div className="w-20 h-20 rounded-full border-2 border-[#57C5CF] bg-[#57C5CF]/10 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-[#57C5CF]" />
              </div>
              <h3 className="font-semibold text-white mb-3 text-lg">
                Schedule a Meeting
              </h3>
              <p className="text-gray-400 text-base mb-6">
                Book a time that works for you
              </p>
              <a
                href="https://calendly.com/admin-remoteacktive/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#57C5CF] hover:text-[#4DD0E1] text-lg font-semibold transition inline-block"
              >
                View Calendar →
              </a>
            </Card>

            <Card variant="dark" hover className="text-center">
              <div className="w-20 h-20 rounded-full border-2 border-[#57C5CF] bg-[#57C5CF]/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-[#57C5CF]" />
              </div>
              <h3 className="font-semibold text-white mb-3 text-lg">
                Email Us
              </h3>
              <p className="text-gray-400 text-base mb-6">
                We'll respond within 24 hours
              </p>
              <a
                href="mailto:admin@remoteacktive.com"
                className="text-[#57C5CF] hover:text-[#4DD0E1] text-lg font-semibold transition inline-block break-all"
              >
                admin@remoteacktive.com
              </a>
            </Card>

            <Card variant="dark" hover className="text-center">
              <div className="w-20 h-20 rounded-full border-2 border-[#57C5CF] bg-[#57C5CF]/10 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-[#57C5CF]" />
              </div>
              <h3 className="font-semibold text-white mb-3 text-lg">
                Call or Text
              </h3>
              <p className="text-gray-400 text-base mb-6">
                Speak with our team directly
              </p>
              <a
                href="tel:+14152511945"
                className="text-[#57C5CF] hover:text-[#4DD0E1] text-lg font-semibold transition inline-block"
              >
                +1 (415) 251-1945
              </a>
            </Card>
          </div>
        </div>
      </Section>

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
