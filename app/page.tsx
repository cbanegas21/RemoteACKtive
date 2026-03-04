"use client";
import Script from "next/script";
import Header from "@/components/Header";
import HeroWithGlobe from "@/components/HeroWithGlobe";
import WhyChooseUs from "@/components/WhyChooseUs";
import ThreeTierServices from "@/components/ThreeTierServices";
import CostComparison from "@/components/CostComparison";
import GuaranteeSection from "@/components/GuaranteeSection";
import DepartmentGrid from "@/components/DepartmentGrid";
import WhatMakesUsDifferent from "@/components/WhatMakesUsDifferent";
import AboutBlock from "@/components/AboutBlock";
import HowItWorks from "@/components/HowItWorks";
import StatsBlock from "@/components/StatsBlock";
import FAQ from "@/components/FAQ";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { FormProvider } from "@/components/FormContext";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What time zones and hours do offshore professionals work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our offshore professionals work flexible hours and can accommodate most time zones. We'll match you with talent based on your preferred working hours and ensure overlap with your core business hours for seamless collaboration.",
      },
    },
    {
      "@type": "Question",
      name: "How do you select the best offshore talent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use a rigorous 6-step vetting process that includes skills assessment, English fluency testing, personality evaluation, reference checks, AI tool familiarity, and proven track record verification. Only the top candidates make it through to you.",
      },
    },
    {
      "@type": "Question",
      name: "Are there any language barriers with offshore teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. We only work with fluent English-speaking professionals who have excellent written and verbal communication skills. Language proficiency is a critical part of our screening process.",
      },
    },
    {
      "@type": "Question",
      name: "What support do I get when I outsource with Remote ACKtive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With our Full Remote ACKtive Experience package, you get end-to-end support including HR assistance, payment management, continuous training, performance monitoring, well-being programs, and access to our expert team for guidance on marketing, AI, SEO, and business operations.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to work with an offshore team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our pricing varies based on the role, experience level, and package you choose. On average, clients save 60-70% on operational costs compared to hiring locally. Contact us for a customized quote based on your specific needs.",
      },
    },
    {
      "@type": "Question",
      name: "What if I'm not happy with my outsourced talent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a 100% Client Satisfaction Guarantee. If your outsourced talent isn't the right fit, we'll pause your service and find you a replacement at zero additional cost. Plus, you'll get 1 week of free service to help you settle in with your new team member.",
      },
    },
    {
      "@type": "Question",
      name: "What types of roles can be outsourced to an offshore team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We can help you hire for a wide range of roles including Sales & Business Development, Marketing & Brand Growth, Technical & IT Operations, Finance & Administration, Customer Experience, and Executive & Administrative Support.",
      },
    },
    {
      "@type": "Question",
      name: "Who provides training and ongoing support for offshore teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With our Full Remote ACKtive Experience and ACKtive Training Program packages, we provide continuous training, development programs, access to industry experts, and ongoing support to ensure your offshore team stays productive and up-to-date.",
      },
    },
    {
      "@type": "Question",
      name: "How do you ensure the quality of your hires?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every candidate undergoes rigorous technical assessments, thorough reference checks, and culture-fit evaluations. We verify work history, test relevant skills, and conduct multiple interviews to ensure they meet our high standards before presenting them to you.",
      },
    },
    {
      "@type": "Question",
      name: "How can I get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply book a discovery call through our website or contact form. We'll have a free strategy session to understand your needs, then begin sourcing candidates. You could be interviewing qualified professionals within 3-10 days.",
      },
    },
    {
      "@type": "Question",
      name: "Can I hire outsourced talent on a part-time basis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! We offer flexible hiring arrangements including full-time, part-time, and project-based engagements. Whether you need 10 hours a week or 40 hours a week, we can match you with professionals who fit your specific requirements and budget.",
      },
    },
    {
      "@type": "Question",
      name: "What if I need to scale my team quickly for an ongoing project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We specialize in rapid team scaling. Our extensive talent network and streamlined vetting process allow us to quickly deploy multiple team members when you need them. We can help you scale up (or down) as your project demands change.",
      },
    },
    {
      "@type": "Question",
      name: "What are the benefits of hiring an offshore team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hiring offshore provides significant cost savings (typically 60-70% compared to local hires), access to a global talent pool, round-the-clock productivity across time zones, scalability without long-term commitments, and the ability to focus your local team on core strategic initiatives.",
      },
    },
    {
      "@type": "Question",
      name: "Once I decide who to hire, how soon can they start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Once you've selected your ideal candidate, they can typically start within 1-2 weeks. This timeframe includes finalizing contracts, setting up equipment and systems access, and completing any necessary onboarding. In urgent situations, we can often accelerate this timeline.",
      },
    },
  ],
};

export default function Home() {
  return (
    <FormProvider>
      <Script
        id="homepage-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main>
        <HeroWithGlobe />
        <WhyChooseUs />
        <ThreeTierServices />
        <CostComparison />
        <GuaranteeSection />
        <DepartmentGrid />
        <WhatMakesUsDifferent />
        <AboutBlock />
        <HowItWorks />
        <StatsBlock />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </FormProvider>
  );
}