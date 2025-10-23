"use client";
import Section from "./Section";
import Card from "./Card";
import { UserCheck } from "lucide-react";
import Image from "next/image";

export default function Handpicked() {
  const benefits = [
    "Rigorous assessments and skill verification",
    "Thorough reference checks and background screening",
    "Culture fit evaluation to match your team dynamics",
    "Ongoing performance reviews to maintain quality",
  ];

  return (
    <Section id="handpicked">
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-600/10 dark:to-pink-600/10 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 group">
              <Image
                src="/images/why-us/handpicked.jpg"
                alt="Handpicked talent screening"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            <h4 className="text-gray-900 dark:text-white text-xl font-bold mb-3">
              Quality You Can Trust
            </h4>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              Every candidate goes through our comprehensive vetting process. We
              assess technical skills, verify work history, and evaluate cultural
              alignment to ensure they're not just qualified on paper—they're the
              right fit for your team. Our ongoing reviews mean the quality stays
              consistent long after onboarding.
            </p>
          </div>
        </Card>

        <Card hover className="group">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
              bg-purple-100 dark:bg-purple-600/20 transition-transform duration-300 group-hover:scale-110">
              <UserCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 dark:text-white text-2xl font-bold mb-4">
                Handpicked Professionals
              </h3>
              <ul className="text-gray-700 dark:text-white/80 space-y-3">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1 font-bold">•</span>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}