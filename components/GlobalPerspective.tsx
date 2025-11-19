"use client";
import Section from "./Section";
import Card from "./Card";
import { Globe } from "lucide-react";
import Image from "next/image";

export default function GlobalPerspective() {
  const benefits = [
    "Access diverse viewpoints and cross-cultural innovation",
    "Round-the-clock productivity across time zones",
    "Tap into regional expertise and market knowledge",
    "Build a truly international, resilient team",
  ];

  return (
    <Section id="global" background="dark">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-background-darkCard border border-white/10">
          <div className="flex flex-col h-full">
            <h4 className="text-white text-base font-bold mb-2">
              Think Globally, Hire Strategically
            </h4>
            <p className="text-gray-300 leading-relaxed text-xs">
              A global team brings more than just cost savings—it brings fresh
              perspectives, 24/7 coverage, and specialized regional insights. Whether
              you need a developer in Eastern Europe, a marketer in Latin America,
              or a support specialist in Asia, we connect you with talent that
              enriches your business and keeps operations running around the clock.
            </p>
          </div>
        </Card>

        <Card hover className="group bg-background-darkCard border border-white/10">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 mx-auto" style={{ maxWidth: '150px', width: '100%' }}>
              <div className="relative w-full aspect-square rounded-full overflow-hidden bg-gray-800 group">
                <Image
                  src="/images/why-us/global.jpg"
                  alt="Global remote team"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-[#F5A623]/10 transition-transform duration-300 group-hover:scale-110 mb-3">
              <Globe className="w-5 h-5 text-[#F5A623]" />
            </div>

            <h3 className="text-white text-lg font-bold mb-3">
              Global Perspective
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