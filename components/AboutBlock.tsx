"use client";
import Image from "next/image";
import { Heart, Eye, Shield, Users, Zap, Star, Award } from "lucide-react";

const founders = [
  { initials: "A", name: "Andre", role: "Co-Founder" },
  { initials: "C", name: "Carlos", role: "Co-Founder" },
  { initials: "K", name: "Kevin", role: "Co-Founder" },
];

const coreValues = [
  { icon: Shield, label: "Integrity First", color: "#57C5CF" },
  { icon: Star, label: "Quality Over Volume", color: "#4FFFB0" },
  { icon: Users, label: "People-Centered", color: "#57C5CF" },
  { icon: Zap, label: "Move Fast", color: "#4FFFB0" },
  { icon: Award, label: "Long-Term Thinking", color: "#57C5CF" },
];

export default function AboutBlock() {
  return (
    <section
      id="about"
      className="py-24"
      style={{ background: "linear-gradient(to right, #78ffd6, #007991)" }}
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-black/10 border border-black/20 rounded-full px-4 py-1.5 mb-5">
            <span
              className="text-sm font-bold text-[#0F1926] tracking-wide uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Our Story
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F1926] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Built by founders who felt the pain.{" "}
            <span className="text-[#0F1926] underline decoration-[#0F1926]/30 underline-offset-4">
              Built to solve it.
            </span>
          </h2>
          <p
            className="text-[#0F1926]/70 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Remote ACKtive exists because three people got tired of broken
            staffing. So they built something better.
          </p>
        </div>

        {/* Story panel — full-bleed image with overlay */}
        <div className="rounded-2xl overflow-hidden mb-6 group" style={{ background: "rgba(13,26,45,0.92)" }}>
          <div className="grid md:grid-cols-5">
            {/* Story copy — spans 3 cols */}
            <div className="md:col-span-3 p-9 md:p-12 flex flex-col justify-center">

              {/* Founder avatars */}
              <div className="flex items-center gap-3 mb-7">
                <div className="flex -space-x-3">
                  {founders.map((f, i) => (
                    <div
                      key={f.initials}
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-extrabold text-white ring-2 ring-[#0D1A2D] flex-shrink-0"
                      style={{
                        background:
                          i % 2 === 0
                            ? "linear-gradient(135deg, #248B93, #1A5538)"
                            : "linear-gradient(135deg, #330867, #248B93)",
                        fontFamily: "var(--font-heading)",
                        zIndex: founders.length - i,
                      }}
                      title={f.name}
                    >
                      {f.initials}
                    </div>
                  ))}
                </div>
                <div>
                  <p
                    className="text-white font-semibold text-sm leading-tight"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Andre, Carlos &amp; Kevin
                  </p>
                  <p
                    className="text-white/50 text-xs"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Co-Founders, Remote ACKtive
                  </p>
                </div>
              </div>

              <h3
                className="text-white font-bold text-xl mb-5 leading-snug"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                How it started
              </h3>

              <p
                className="text-white/75 leading-relaxed mb-4 text-[15px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Andre, Carlos, and Kevin spent years building distributed teams
                before founding Remote ACKtive. They knew the frustration
                firsthand —{" "}
                <span className="text-white font-medium">
                  overpriced agencies, hiring cycles that dragged on for months,
                </span>{" "}
                and candidates who looked great on paper but disappeared after
                week two.
              </p>

              <p
                className="text-white/75 leading-relaxed text-[15px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                So they built what they wished existed: a lean, rigorous staffing
                partner that treats every hire like a long-term investment. Today
                Remote ACKtive connects businesses worldwide with{" "}
                <span className="text-[#4FFFB0] font-medium">
                  pre-vetted, high-performing remote professionals
                </span>{" "}
                — in under two weeks.
              </p>

              {/* Proof strip */}
              <div className="flex flex-wrap gap-5 mt-7 pt-7 border-t border-white/10">
                {[
                  { value: "30+", label: "Placements" },
                  { value: "94%", label: "Retention Rate" },
                  { value: "4.9/5", label: "Client Rating" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="text-2xl font-extrabold text-[#57C5CF] leading-none tabular-nums"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-white/50 text-xs mt-0.5"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image panel — full bleed with gradient overlay */}
            <div
              aria-hidden="true"
              className="relative md:col-span-2 h-72 md:h-auto overflow-hidden"
            >
              <Image
                src="/images/ourstory.png"
                alt=""
                fill
                priority={false}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
              {/* Multi-stop gradient overlay — desktop: left fade + bottom tint */}
              <div
                className="absolute inset-0 hidden md:block"
                style={{
                  background:
                    "linear-gradient(to right, rgba(13,26,45,0.95) 0%, rgba(13,26,45,0.5) 30%, transparent 60%), linear-gradient(to top, rgba(13,26,45,0.6) 0%, transparent 40%)",
                }}
              />
              {/* Mobile: bottom fade */}
              <div
                className="absolute inset-0 md:hidden"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,26,45,1) 0%, rgba(13,26,45,0.6) 30%, transparent 60%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Mission + Vision — side by side */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">

          {/* Mission */}
          <div
            className="rounded-2xl overflow-hidden border border-[#57C5CF]/20 group"
            style={{ background: "rgba(13,26,45,0.92)" }}
          >
            {/* Accent bar */}
            <div
              className="h-1"
              style={{
                background:
                  "linear-gradient(90deg, #57C5CF 0%, rgba(87,197,207,0.3) 70%, transparent 100%)",
              }}
            />
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#57C5CF]/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-[#57C5CF]" />
                </div>
                <h3
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Our Mission
                </h3>
              </div>
              <p
                className="text-white/70 leading-relaxed text-[15px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                To make world-class remote talent accessible, affordable, and
                effortless for businesses of all sizes — so great companies can
                focus on what they do best.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div
            className="rounded-2xl overflow-hidden border border-[#4FFFB0]/20 group"
            style={{ background: "rgba(13,26,45,0.92)" }}
          >
            {/* Accent bar */}
            <div
              className="h-1"
              style={{
                background:
                  "linear-gradient(90deg, #4FFFB0 0%, rgba(79,255,176,0.3) 70%, transparent 100%)",
              }}
            />
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#4FFFB0]/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-[#4FFFB0]" />
                </div>
                <h3
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Our Vision
                </h3>
              </div>
              <p
                className="text-white/70 leading-relaxed text-[15px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                A world where every company can harness global talent to achieve
                extraordinary results — unrestricted by geography, time zones, or
                budget.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div
          className="rounded-2xl border border-white/8 p-8"
          style={{ background: "rgba(13,26,45,0.92)" }}
        >
          <h3
            className="text-white font-bold text-lg mb-6 text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Core Values
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.label}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: `${value.color}10`,
                    borderColor: `${value.color}25`,
                  }}
                >
                  <Icon
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: value.color }}
                  />
                  <span
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {value.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
