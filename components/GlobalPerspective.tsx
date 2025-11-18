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
    <Section id="global">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-[#378B57]/10 to-[#57C5CF]/10">
          <div className="flex flex-col h-full">
            {/* Image Placeholder */}
            <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden bg-gray-200">
              <Image
                src="/images/why-us/global.jpg"
                alt="Global remote team"
                fill
                className="object-cover"
              />
            </div>

            <h4 className="text-gray-900 text-xl font-bold mb-3">
              Think Globally, Hire Strategically
            </h4>
            <p className="text-gray-600 leading-relaxed">
              A global team brings more than just cost savings—it brings fresh
              perspectives, 24/7 coverage, and specialized regional insights. Whether
              you need a developer in Eastern Europe, a marketer in Latin America,
              or a support specialist in Asia, we connect you with talent that
              enriches your business and keeps operations running around the clock.
            </p>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
              bg-[#378B57]/10">
              <Globe className="w-6 h-6 text-[#378B57]" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 text-2xl font-bold mb-4">
                Global Perspective
              </h3>
              <ul className="text-gray-600 space-y-3">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#378B57] mt-1 font-bold">•</span>
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