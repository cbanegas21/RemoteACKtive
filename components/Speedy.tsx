"use client";
import Section from "./Section";
import Card from "./Card";
import { Zap } from "lucide-react";
import Image from "next/image";

export default function Speedy() {
  const benefits = [
    "Typical timeline: 3–10 days from intake to offer",
    "Pre-vetted talent pool ready to interview",
    "Streamlined process with fewer rounds",
    "Instant alignment on tools, processes, and expectations",
  ];

  return (
    <Section id="speed" background="dark">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover className="group bg-background-darkCard border border-white/10">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 mx-auto" style={{ maxWidth: '150px', width: '100%' }}>
              <div className="relative w-full aspect-square rounded-full overflow-hidden bg-gray-800 group">
                <Image
                  src="/images/why-us/speedy.jpg"
                  alt="Fast onboarding process"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-[#F5A623]/10 transition-transform duration-300 group-hover:scale-110 mb-3">
              <Zap className="w-5 h-5 text-[#F5A623]" />
            </div>

            <h3 className="text-white text-lg font-bold mb-3">
              Speedy Onboarding
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

        <Card className="bg-background-darkCard border border-white/10">
          <div className="flex flex-col h-full">
            <h4 className="text-white text-base font-bold mb-2">
              Fast-Track Your Growth
            </h4>
            <p className="text-gray-300 leading-relaxed text-xs">
              Time is money, and we respect both. Our streamlined process gets
              qualified candidates in front of you quickly, typically within days
              rather than weeks. With pre-vetted professionals and fewer interview
              rounds, you can fill critical roles without the usual hiring delays.
              We handle the logistics so you can focus on making the right choice.
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
}