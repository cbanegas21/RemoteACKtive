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
    <Section id="speed" background="panel">
      <div className="grid md:grid-cols-2 gap-6">
        <Card hover>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
              bg-yellow-100 dark:bg-yellow-600/20">
              <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 dark:text-white text-2xl font-bold mb-4">
                Speedy Onboarding
              </h3>
              <ul className="text-gray-700 dark:text-white/80 space-y-3">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-yellow-600 dark:text-yellow-400 mt-1 font-bold">•</span>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-600/10 dark:to-orange-600/10">
          <div className="flex flex-col h-full">
            {/* Image Placeholder */}
            <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
              <Image
                src="/images/why-us/speedy.jpg"
                alt="Fast onboarding process"
                fill
                className="object-cover"
              />
            </div>
            
            <h4 className="text-gray-900 dark:text-white text-xl font-bold mb-3">
              Fast-Track Your Growth
            </h4>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
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