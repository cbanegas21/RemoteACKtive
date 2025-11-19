"use client";
import { useState } from "react";
import { Check, Calendar, Clock, Users, Star } from "lucide-react";
import { FormProvider } from "@/components/FormContext";
import Header from "@/components/Header";
import HireOnlyForm from "@/components/HireOnlyForm";
import HireManageForm from "@/components/HireManageForm";
import GeneralContactForm from "@/components/GeneralContactForm";
import Footer from "@/components/Footer";

export default function BookACallPage() {
  const [activeTab, setActiveTab] = useState<"hire-only" | "hire-manage" | "training">("hire-manage");

  const tabs = [
    {
      id: "hire-only" as const,
      label: "Recruitment-Only",
      title: "Interested in Recruitment-Only?",
      description: "Get expert recruitment without ongoing management",
      isFeatured: false
    },
    {
      id: "hire-manage" as const,
      label: "Full Experience",
      title: "Ready for Full Outsourcing Support?",
      description: "Get recruitment + ongoing management and support",
      isFeatured: true
    },
    {
      id: "training" as const,
      label: "Training Program",
      title: "Upgrade Your Existing Team?",
      description: "Training and development for your current offshore team",
      isFeatured: false
    },
  ];

  const benefits = [
    {
      icon: Calendar,
      title: "Free 30-Minute Strategy Session",
      description: "No commitment, no pressure—just valuable insights tailored to your business needs.",
    },
    {
      icon: Users,
      title: "Custom Talent Recommendations",
      description: "We'll identify the exact roles that will drive the most value for your organization.",
    },
    {
      icon: Clock,
      title: "Fast Response Time",
      description: "Get pre-qualified candidates within 3-10 days of your consultation.",
    },
  ];

  const whatToExpect = [
    "Understand your current business challenges and growth goals",
    "Identify where remote talent can deliver the biggest impact",
    "Discuss our vetting process and how we ensure quality",
    "Review pricing options and ROI expectations",
    "Answer all your questions about remote team building",
    "Receive a custom hiring roadmap tailored to your needs",
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[1];

  return (
    <FormProvider>
      <div className="min-h-screen bg-background-dark">
        <Header />

        {/* HERO SECTION - GRADIENT BACKGROUND */}
        <section className="relative pt-32 pb-16 bg-gradient-hero overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your Free Discovery Call
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Let's discuss how Remote ACKtive can help you build a world-class remote team and save up to 70% on costs
            </p>
          </div>
        </section>

        {/* FORMS & BENEFITS SECTION */}
        <section className="py-20 bg-background-dark">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {/* LEFT: Benefits */}
              <div className="lg:col-span-1 space-y-8">
                {/* Benefits Cards */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    What You'll Get
                  </h2>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => {
                      const Icon = benefit.icon;
                      return (
                        <div
                          key={index}
                          className="flex gap-4 p-4 bg-background-darkCard border border-white/10 rounded-lg hover:border-primary-teal/40 transition-all"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-lg bg-primary-teal/10 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary-teal" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-white mb-1">{benefit.title}</h3>
                            <p className="text-sm text-gray-300">{benefit.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* What to Expect */}
                <div className="bg-gradient-primary p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    What to Expect on the Call
                  </h2>
                  <ul className="space-y-3">
                    {whatToExpect.map((item, index) => (
                      <li key={index} className="flex gap-3 items-start">
                        <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trust Badge */}
                <div className="bg-background-darkCard border border-primary-teal/20 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-primary-teal mb-2">100%</div>
                  <div className="text-white font-bold mb-2">Client Satisfaction Guarantee</div>
                  <p className="text-sm text-gray-300">
                    If your remote team member doesn't meet your expectations, we'll find you a replacement at no extra cost.
                  </p>
                </div>
              </div>

              {/* RIGHT: Forms */}
              <div className="lg:col-span-2">
                {/* Tab Navigation */}
                <div className="flex items-stretch justify-center gap-4 mb-12 flex-wrap">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        px-8 py-4 rounded-full text-base font-bold transition-all
                        ${
                          activeTab === tab.id
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
                  {/* Most Popular Badge */}
                  {currentTab.isFeatured && (
                    <div className="mb-6">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold rounded-full uppercase tracking-wider">
                        ⭐ Most Popular
                      </span>
                    </div>
                  )}

                  {/* Form Title */}
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
                    {activeTab === "hire-only" && <HireOnlyForm />}
                    {activeTab === "hire-manage" && <HireManageForm />}
                    {activeTab === "training" && <GeneralContactForm formType="training" />}
                  </div>

                  {/* Additional Info */}
                  <p className="text-sm text-gray-400 text-center mt-8">
                    Or schedule directly on our{" "}
                    <a
                      href="https://calendly.com/admin-remoteacktive/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-teal hover:text-primary-cyan underline"
                    >
                      Calendly
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </div>
    </FormProvider>
  );
}
