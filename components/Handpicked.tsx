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
    <Section id="handpicked" background="dark">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-background-darkCard border border-white/10 overflow-hidden">
          <div className="flex flex-col h-full">
            <h4 className="text-white text-base font-bold mb-2">
              Quality You Can Trust
            </h4>
            <p className="text-gray-300 leading-relaxed text-xs">
              Every candidate goes through our comprehensive vetting process. We
              assess technical skills, verify work history, and evaluate cultural
              alignment to ensure they're not just qualified on paper—they're the
              right fit for your team. Our ongoing reviews mean the quality stays
              consistent long after onboarding.
            </p>
          </div>
        </Card>

        <Card hover className="group bg-background-darkCard border border-white/10">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 mx-auto" style={{ maxWidth: '150px', width: '100%' }}>
              <div className="relative w-full aspect-square rounded-full overflow-hidden bg-gray-800 group">
                <Image
                  src="/images/why-us/handpicked.jpg"
                  alt="Handpicked talent screening"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-[#F5A623]/10 transition-transform duration-300 group-hover:scale-110 mb-3">
              <UserCheck className="w-5 h-5 text-[#F5A623]" />
            </div>

            <h3 className="text-white text-lg font-bold mb-3">
              Handpicked Professionals
            </h3>

            <ul className="text-gray-300 space-y-2 text-left w-full">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#F5A623] mt-1 font-bold text-sm">•</span>
                  <span className="leading-snug text-xs">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </Section>
  );
}