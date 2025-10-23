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
    <Section id="why" background="panel">
      <div className="text-center mb-12">
        <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold mb-4">
          Why Choose Remote ACKtive?
        </h2>
        <p className="text-gray-600 dark:text-white/70 text-lg max-w-2xl mx-auto">
          We make hiring global talent simple, affordable, and stress-free
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card hover className="group">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
              bg-blue-100 dark:bg-blue-600/20 transition-transform duration-300 group-hover:scale-110">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 dark:text-white text-2xl font-bold mb-4">
                Cost-Effective Solutions
              </h3>
              <ul className="text-gray-700 dark:text-white/80 space-y-3">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-1 font-bold">•</span>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-600/10 dark:to-purple-600/10 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 group">
              <Image
                src="/images/why-us/cost-effective.jpg"
                alt="Cost effective outsourcing"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            <h4 className="text-gray-900 dark:text-white text-xl font-bold mb-3">
              Focus on Revenue, Not Overhead
            </h4>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
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