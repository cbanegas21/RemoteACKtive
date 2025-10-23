"use client";
import Header from "@/components/Header";
import HeroWithGlobe from "@/components/HeroWithGlobe";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSplit from "@/components/ServicesSplit";
import DepartmentGrid from "@/components/DepartmentGrid";
import StatsSection from "@/components/StatsSection";
import AboutBlock from "@/components/AboutBlock";
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
        <ServicesSplit />
        <DepartmentGrid />
        <AboutBlock />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </FormProvider>
  );
}