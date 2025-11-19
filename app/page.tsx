"use client";
import Header from "@/components/Header";
import HeroWithGlobe from "@/components/HeroWithGlobe";
import WhyChooseUs from "@/components/WhyChooseUs";
import ThreeTierServices from "@/components/ThreeTierServices";
import GuaranteeSection from "@/components/GuaranteeSection";
import DepartmentGrid from "@/components/DepartmentGrid";
import WhatMakesUsDifferent from "@/components/WhatMakesUsDifferent";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { FormProvider } from "@/components/FormContext";

export default function Home() {
  return (
    <FormProvider>
      <Header />
      <main>
        <HeroWithGlobe />
        <WhyChooseUs />
        <ThreeTierServices />
        <GuaranteeSection />
        <DepartmentGrid />
        <WhatMakesUsDifferent />
        <HowItWorks />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </FormProvider>
  );
}