"use client";
import Image from "next/image";
import Section from "./Section";
import Card from "./Card";

export default function AboutBlock() {
  // ——— unchanged copy ———
  const values = [
    { title: "Quality First",       description: "We never compromise on the caliber of talent we deliver." },
    { title: "Speed & Efficiency",  description: "Fast hiring without cutting corners on vetting." },
    { title: "Collaboration",       description: "We're partners in your success, not just a vendor." },
    { title: "Integrity",           description: "Transparent pricing, honest communication, no surprises." },
    { title: "Innovation",          description: "Constantly improving our processes to serve you better." },
  ];

  return (
    <Section id="about" background="dark">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-3">
            About Remote ACKtive
          </h2>
          <p className="text-base md:text-lg text-primary-teal font-medium">
            Where global talent meets borderless opportunity
          </p>
        </div>

        {/* Story — same text, now with image panel */}
        <Card variant="dark" className="mb-8 md:mb-10">
          <div className="grid gap-6 md:grid-cols-3 group">
            {/* copy (unchanged) */}
            <div className="md:col-span-2">
              <h3 className="text-white text-xl font-semibold mb-3">
                Our Story
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Remote ACKtive was founded by Andre, Carlos, and Kevin—three
                professionals who experienced firsthand the challenges of building
                distributed teams. Frustrated by expensive agencies, lengthy hiring
                cycles, and inconsistent quality, they set out to create a better way.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, Remote ACKtive connects businesses with top-tier remote
                professionals across the globe, combining rigorous vetting with
                streamlined processes. We believe that the best talent isn't
                confined by geography, and neither should your growth be.
              </p>
            </div>

            {/* image panel using your /public/images/ourstory.png */}
            <div
              aria-hidden="true"
              className="relative rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/60
                         transition-transform duration-500 ease-out
                         group-hover:translate-y-[-2px] group-hover:scale-[1.01]"
            >
              {/* fixed aspect on desktop, taller on mobile */}
              <div className="relative h-40 sm:h-48 md:h-full">
                <Image
                  src="/images/ourstory.png"
                  alt=""
                  fill
                  priority={false}
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>

              {/* soft gradient for readability + depth */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent" />

              {/* subtle inner border for a premium feel */}
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </Card>

        {/* Mission / Vision — same text, cleaner spacing */}
        <div className="grid gap-6 md:grid-cols-2 mb-8 md:mb-10">
          <Card variant="dark">
            <h3 className="text-white text-xl font-semibold mb-2">
              Our Mission
            </h3>
            <p className="text-gray-300 leading-relaxed">
              To make world-class remote talent accessible, affordable, and
              effortless for businesses of all sizes.
            </p>
          </Card>

          <Card variant="dark">
            <h3 className="text-white text-xl font-semibold mb-2">
              Our Vision
            </h3>
            <p className="text-gray-300 leading-relaxed">
              A world where every company can harness global talent to achieve
              extraordinary results, unrestricted by borders.
            </p>
          </Card>
        </div>

        {/* Core Values — same list, tidier layout + tiny hover affordance */}
        <Card variant="dark" className="bg-gradient-to-br from-[#57C5CF]/10 to-[#378B57]/10 border-[#57C5CF]/20">
          <h3 className="text-white text-xl font-semibold mb-4">
            Core Values
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="group relative flex items-start gap-3 rounded-lg p-3 -m-1
                           hover:bg-white/10 transition"
              >
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-teal" />
                <div>
                  <h4 className="text-white font-semibold mb-1">
                    {value.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}
