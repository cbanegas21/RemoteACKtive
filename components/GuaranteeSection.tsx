"use client";
import { ShieldCheck, RefreshCw, Clock, ArrowRight } from "lucide-react";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Free replacement, guaranteed",
    description:
      "If anyone on your remote team underperforms, we find you a better-matched professional at zero extra charge.",
    color: "teal",
  },
  {
    icon: RefreshCw,
    title: "Complimentary transition week",
    description:
      "You get one full week of service at no cost while we onboard your replacement — no gaps, no downtime.",
    color: "mint",
  },
  {
    icon: Clock,
    title: "Lifetime commitment",
    description:
      "This promise covers every hire, from your first team member to your tenth — for the entire life of our partnership.",
    color: "teal",
  },
];

export default function GuaranteeSection() {
  return (
    <section className="py-20" style={{ background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' }}>
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">
              Our Promise
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            100% Satisfaction,{" "}
            <span className="text-[#4FFFB0]">No Exceptions</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            We stand behind every placement. If it&apos;s not right, we make it
            right — immediately and at no cost to you.
          </p>
        </div>

        {/* Guarantee cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {guarantees.map((g) => {
            const Icon = g.icon;
            const isMint = g.color === "mint";
            return (
              <div
                key={g.title}
                className={`rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                  isMint
                    ? "border-[#4FFFB0]/20 hover:border-[#4FFFB0]/40"
                    : "border-[#57C5CF]/20 hover:border-[#57C5CF]/40"
                }`}
                style={{ background: 'linear-gradient(to right, #928DAB, #1F1C2C)' }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    isMint ? "bg-[#4FFFB0]/15" : "bg-[#57C5CF]/15"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isMint ? "text-[#4FFFB0]" : "text-[#57C5CF]"
                    }`}
                  />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {g.title}
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  {g.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Lifetime badge strip */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0A2020] to-[#0A1628] border border-[#4FFFB0]/15 p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#4FFFB0]/10 border-2 border-[#4FFFB0]/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-7 h-7 text-[#4FFFB0]" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Lifetime Guarantee</p>
              <p className="text-white text-sm">
                Every hire, every contract, covered — forever.
              </p>
            </div>
          </div>
          <a
            href="/book-a-call"
            className="inline-flex items-center gap-2 btn-grad text-white font-bold px-6 py-3 rounded-full text-sm whitespace-nowrap flex-shrink-0"
          >
            Claim Your Risk-Free Hire
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
