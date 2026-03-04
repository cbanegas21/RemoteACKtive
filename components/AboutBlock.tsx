"use client";
import Image from "next/image";

const values = [
  {
    title: "Quality First",
    description: "We never compromise on the caliber of talent we deliver.",
  },
  {
    title: "Speed & Efficiency",
    description: "Fast hiring without cutting corners on vetting.",
  },
  {
    title: "Collaboration",
    description: "We're partners in your success, not just a vendor.",
  },
  {
    title: "Integrity",
    description: "Transparent pricing, honest communication, no surprises.",
  },
  {
    title: "Innovation",
    description: "Constantly improving our processes to serve you better.",
  },
];

export default function AboutBlock() {
  return (
    <section id="about" className="py-20 bg-[#0F1926]">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#4FFFB0]/10 border border-[#4FFFB0]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#4FFFB0] tracking-wide uppercase">
              Our Story
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Built by founders who felt the pain.{" "}
            <span className="text-[#4FFFB0]">Built to solve it.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Remote ACKtive exists because three people got tired of broken
            staffing. So they built something better.
          </p>
        </div>

        {/* Story panel */}
        <div className="rounded-2xl bg-[#1E2430] border border-white/8 overflow-hidden mb-6 group">
          <div className="grid md:grid-cols-3">
            {/* Copy — spans 2 cols */}
            <div className="md:col-span-2 p-8 md:p-10">
              <h3 className="text-white font-bold text-xl mb-4">
                How it started
              </h3>
              <p className="text-white/65 leading-relaxed mb-4">
                Andre, Carlos, and Kevin spent years building distributed teams before
                founding Remote ACKtive. They knew the frustration firsthand —
                overpriced agencies, hiring cycles that dragged on for months, and
                candidates who looked great on paper but disappeared after week two.
              </p>
              <p className="text-white/65 leading-relaxed mb-8">
                So they built what they wished existed: a lean, rigorous staffing
                partner that treats every hire like a long-term investment. Today
                Remote ACKtive connects businesses worldwide with pre-vetted,
                high-performing remote professionals — in under two weeks.
              </p>

              {/* Founders strip */}
              <div className="flex flex-wrap gap-2">
                {["Andre", "Carlos", "Kevin"].map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#57C5CF]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#57C5CF] text-xs font-extrabold">
                        {name[0]}
                      </span>
                    </div>
                    <span className="text-white/75 text-sm font-semibold">
                      {name}
                    </span>
                    <span className="text-white/30 text-xs">· Co-Founder</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image panel */}
            <div
              aria-hidden="true"
              className="relative md:col-span-1 h-56 md:h-auto overflow-hidden"
            >
              <Image
                src="/images/ourstory.png"
                alt=""
                fill
                priority={false}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              {/* Gradient fade on left edge (desktop) / bottom (mobile) */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1E2430]/80 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2430]/80 to-transparent md:hidden" />
            </div>
          </div>
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {/* Mission */}
          <div className="rounded-2xl bg-[#1E2430] border border-[#57C5CF]/20 overflow-hidden">
            <div
              className="h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #57C5CF 0%, transparent 75%)",
              }}
            />
            <div className="p-7">
              <h3 className="text-white font-bold text-lg mb-3">
                Our Mission
              </h3>
              <p className="text-white/60 leading-relaxed">
                To make world-class remote talent accessible, affordable, and
                effortless for businesses of all sizes — so great companies can
                focus on what they do best.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="rounded-2xl bg-[#1E2430] border border-[#4FFFB0]/20 overflow-hidden">
            <div
              className="h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #4FFFB0 0%, transparent 75%)",
              }}
            />
            <div className="p-7">
              <h3 className="text-white font-bold text-lg mb-3">
                Our Vision
              </h3>
              <p className="text-white/60 leading-relaxed">
                A world where every company can harness global talent to achieve
                extraordinary results — unrestricted by geography, time zones, or
                budget.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="rounded-2xl bg-[#1E2430] border border-white/8 p-8 md:p-10">
          <h3 className="text-white font-bold text-lg mb-6">Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value, i) => {
              const isMint = i % 2 === 1;
              return (
                <div
                  key={value.title}
                  className="flex items-start gap-3 rounded-xl p-4 bg-white/3 border border-white/6 hover:bg-white/6 transition-colors"
                >
                  <div
                    className={`mt-0.5 h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                      isMint ? "bg-[#4FFFB0]" : "bg-[#57C5CF]"
                    }`}
                  />
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">
                      {value.title}
                    </h4>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
