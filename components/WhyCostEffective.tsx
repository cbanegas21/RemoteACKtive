"use client";
import Section from "./Section";
import Card from "./Card";
import { DollarSign } from "lucide-react";
import Image from "next/image";

export default function WhyCostEffective() {
  const benefits = [
    "Fixed, globally competitive rates that keep your budget in check",
    "Flexible engagement—scale up or down to match your needs",
    "Comprehensive HR and onboarding support to cut overhead costs",
    "Transparent pricing with no hidden fees",
  ];

  return (
    <Section id="why" background="dark">
      <div className="text-center mb-8">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">
          Why Choose Remote ACKtive?
        </h2>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
          We make hiring global talent simple, affordable, and stress-free
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover className="group bg-background-darkCard border border-white/10">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 mx-auto" style={{ maxWidth: '150px', width: '100%' }}>
              <div className="relative w-full aspect-square rounded-full overflow-hidden bg-gray-800 group">
                <Image
                  src="/images/why-us/cost-effective.jpg"
                  alt="Cost effective outsourcing"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-[#F5A623]/10 transition-transform duration-300 group-hover:scale-110 mb-3">
              <DollarSign className="w-5 h-5 text-[#F5A623]" />
            </div>

            <h3 className="text-white text-lg font-bold mb-3">
              Cost-Effective Solutions
            </h3>

            <ul className="text-gray-300 space-y-2 text-left w-full">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary-teal mt-0.5 font-bold text-sm flex-shrink-0">•</span>
                  <span className="leading-snug text-xs flex-1">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="bg-background-darkCard border border-white/10 overflow-hidden">
          <div className="flex flex-col h-full">
            <h4 className="text-white text-base font-bold mb-2">
              Focus on Revenue, Not Overhead
            </h4>
            <p className="text-gray-300 leading-relaxed text-xs">
              Say goodbye to expensive office space, equipment, and local salary
              premiums. Our fixed rates and flexible engagement models mean you
              only pay for what you need, when you need it. With comprehensive HR
              and onboarding support included, you can redirect resources toward
              growth instead of administrative burden.
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
}