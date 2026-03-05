"use client";
import { useEffect } from "react";
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
import CompanyLogosSlider from "@/components/CompanyLogosSlider";
import { FormProvider } from "@/components/FormContext";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "My team is in a different time zone — will collaboration still work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our professionals work flexible hours and are matched specifically to your preferred schedule. We ensure meaningful overlap with your core business hours so daily standups, async work, and real-time collaboration all flow without friction.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know I'm getting the best talent, not just whoever's available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every candidate clears a 6-step gauntlet: skills assessments, English fluency testing, personality evaluation, reference verification, AI-tool familiarity, and a proven track record check. Only the top tier reach your shortlist — typically less than 5% of all applicants.",
      },
    },
    {
      "@type": "Question",
      name: "Will there be communication issues with an overseas hire?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. English fluency is a hard requirement in our vetting process — both written and verbal. We don't shortlist candidates who can't communicate clearly and confidently, so you'll never experience the friction that comes with weaker language skills.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of ongoing support do I actually get?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With our Full Remote ACKtive Experience, you get end-to-end support: HR assistance, payment management, continuous training, performance monitoring, well-being programs, and direct access to our team for guidance on marketing, AI tools, SEO, and operations.",
      },
    },
    {
      "@type": "Question",
      name: "Is this actually cheaper than hiring locally, once I add everything up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Consistently, yes. Our clients average 60–70% savings on total labor costs compared to equivalent U.S. hires — salary, overhead, benefits, and taxes included. Our cost comparison tool on this page breaks it down by role so you can see the real numbers before committing to anything.",
      },
    },
    {
      "@type": "Question",
      name: "What if the hire turns out to be a bad fit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We cover it. If your professional isn't working out, we pause your service, find you a better-matched replacement at zero extra charge, and give you one full week of service free while you transition. This guarantee applies at any stage of the engagement — no time limits, no fine print.",
      },
    },
    {
      "@type": "Question",
      name: "What types of work can I actually outsource through Remote ACKtive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Virtually any non-physical role. We place talent across Sales & Business Development, Marketing & Brand Growth, Technical & IT, Finance & Administration, Customer Experience, Creative Services, HR, and Executive Support. If you have a specific role in mind, reach out — we can almost certainly find the right person.",
      },
    },
    {
      "@type": "Question",
      name: "Who handles training and keeping my team sharp over time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With our Full Remote ACKtive Experience, we provide continuous development programs, access to industry experts, and ongoing coaching to ensure your remote team stays productive and up-to-date with the latest tools and best practices — without you having to manage it.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know quality won't drop after the first few weeks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We don't disappear after placement. Our team actively monitors performance, conducts periodic check-ins, and provides continuous development resources. If we see any issues early, we flag them and course-correct before they become a problem for you.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get the process started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Book a free discovery call — it takes 30 minutes. We'll map out exactly where remote talent fits your business, walk you through the process, and start sourcing candidates immediately after. Most clients are interviewing pre-vetted professionals within 3–10 days.",
      },
    },
    {
      "@type": "Question",
      name: "I only need someone part-time — is that possible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We offer full-time, part-time, and project-based arrangements. Whether you need 10 hours a week or 40, we'll match you with a professional whose schedule and capacity align with yours — no forced full-time commitments.",
      },
    },
    {
      "@type": "Question",
      name: "What if I need to ramp up quickly for a big project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rapid scaling is one of our strengths. Our pre-vetted talent pool and streamlined processes let us deploy multiple qualified team members quickly when demand spikes. We can scale up or down as your workload changes, with minimal onboarding friction.",
      },
    },
    {
      "@type": "Question",
      name: "What's the real advantage over just hiring locally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "60–70% cost savings, access to a larger global talent pool, round-the-clock productivity across time zones, and the ability to scale without long-term overhead commitments. Your local team stays focused on high-leverage strategic work while remote professionals handle the operational load.",
      },
    },
    {
      "@type": "Question",
      name: "Once I pick someone, how long before they actually start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically 1–2 weeks from selection to day one. That covers contract finalization, equipment setup, and onboarding. In urgent situations, we can often compress that timeline — just let us know upfront and we'll build it into the plan.",
      },
    },
  ],
};

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
      window.scrollTo(0, 0);
    }
  }, []);

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
        <section style={{ background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' }}>
          <CompanyLogosSlider />
        </section>
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