'use client';
import { useState } from 'react';

/* ─── Role data ─────────────────────────────────────────────────────────── */
const roles = [
  {
    label: 'Software Developer',
    usMid: 112_500,
    raMid: 36_500,
    usRange: '$95k – $130k',
    raRange: '$28k – $45k',
  },
  {
    label: 'Digital Marketer',
    usMid: 75_000,
    raMid: 23_000,
    usRange: '$65k – $85k',
    raRange: '$18k – $28k',
  },
  {
    label: 'Customer Service',
    usMid: 45_000,
    raMid: 13_000,
    usRange: '$38k – $52k',
    raRange: '$10k – $16k',
  },
  {
    label: 'Exec Assistant',
    usMid: 62_500,
    raMid: 18_500,
    usRange: '$55k – $70k',
    raRange: '$15k – $22k',
  },
  {
    label: 'Bookkeeper',
    usMid: 56_500,
    raMid: 17_500,
    usRange: '$48k – $65k',
    raRange: '$13k – $22k',
  },
  {
    label: 'UI/UX Designer',
    usMid: 94_000,
    raMid: 29_000,
    usRange: '$78k – $110k',
    raRange: '$22k – $36k',
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function CostComparison() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [headcount, setHeadcount]     = useState(3);

  const role         = roles[selectedIdx];
  const usTotal      = role.usMid * headcount;
  const raTotal      = role.raMid * headcount;
  const saved        = usTotal - raTotal;
  const savedMonthly = Math.round(saved / 12);
  const pct          = Math.round((saved / usTotal) * 100);

  const dec = () => setHeadcount((h) => Math.max(1, h - 1));
  const inc = () => setHeadcount((h) => Math.min(20, h + 1));

  return (
    <section id="cost-comparison" className="py-20" style={{ background: 'linear-gradient(to right, #135058, #F1F2B5)' }}>
      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-black/10 border border-black/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-black tracking-wide uppercase">
              Real Cost Comparison
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4 leading-tight">
            See Exactly How Much You Save
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Pick a role, set your headcount, and watch the savings add up in real time.
          </p>
        </div>

        {/* ── Interactive calculator ── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">

          {/* Left — inputs */}
          <div className="bg-[#1E2430] rounded-2xl border border-white/10 p-8">
            {/* Step 1: role */}
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              1&nbsp;·&nbsp;Pick a role
            </p>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {roles.map((r, i) => (
                <button
                  key={r.label}
                  onClick={() => setSelectedIdx(i)}
                  className={`text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#57C5CF] ${
                    selectedIdx === i
                      ? 'bg-[#0A1628] border-[#57C5CF]/60 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-white hover:border-[#57C5CF]/40 hover:bg-[#57C5CF]/5'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Step 2: headcount */}
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              2&nbsp;·&nbsp;How many hires?
            </p>
            <div className="flex items-center gap-5">
              <button
                onClick={dec}
                aria-label="Decrease headcount"
                className="w-11 h-11 rounded-full border-2 border-white/15 text-white/50 text-xl font-bold hover:border-[#57C5CF] hover:text-[#57C5CF] transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#57C5CF]"
              >
                −
              </button>
              <span className="text-5xl font-extrabold text-white w-14 text-center tabular-nums">
                {headcount}
              </span>
              <button
                onClick={inc}
                aria-label="Increase headcount"
                className="w-11 h-11 rounded-full border-2 border-white/15 text-white/50 text-xl font-bold hover:border-[#57C5CF] hover:text-[#57C5CF] transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#57C5CF]"
              >
                +
              </button>
              <span className="text-white text-sm">
                {headcount === 1 ? 'person' : 'people'}
              </span>
            </div>
          </div>

          {/* Right — live results */}
          <div
            className="rounded-2xl p-8 flex flex-col justify-between"
            style={{
              background:
                'linear-gradient(135deg, #0A1628 0%, #0F1926 60%, #0A2020 100%)',
            }}
          >
            <div>
              <p className="text-[#57C5CF] text-xs font-bold uppercase tracking-widest mb-6">
                {role.label}&nbsp;×&nbsp;{headcount}&nbsp;—&nbsp;Annual Estimate
              </p>

              {/* US vs RA line items */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm">🇺🇸 U.S. hire / year</span>
                <span className="text-white text-sm line-through decoration-red-400 tabular-nums">
                  {fmt(usTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-7">
                <span className="text-white text-sm">✅ Remote ACKtive / year</span>
                <span className="text-[#4FFFB0] text-sm font-semibold tabular-nums">
                  {fmt(raTotal)}
                </span>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full mb-6"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(87,197,207,0.4) 0%, transparent 100%)',
                }}
              />

              {/* Big savings number */}
              <p className="text-white text-xs uppercase tracking-widest mb-1.5">
                Your annual savings
              </p>
              <p className="text-5xl md:text-6xl font-extrabold text-[#4FFFB0] leading-none tabular-nums">
                {fmt(saved)}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="text-white text-sm tabular-nums">
                  {fmt(savedMonthly)}<span className="text-white"> /mo</span>
                </span>
                <span className="bg-[#4FFFB0]/15 border border-[#4FFFB0]/30 text-[#4FFFB0] text-xs font-bold px-3 py-1 rounded-full">
                  {pct}% saved
                </span>
              </div>
            </div>

            {/* CTA */}
            <a
              href="/book-a-call"
              className="mt-8 inline-flex items-center justify-center gap-2 btn-grad text-white font-bold px-6 py-4 rounded-full text-sm w-full"
            >
              Like the savings? Book a Free Strategy Call
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Reference table — desktop ── */}
        <div className="hidden md:block rounded-2xl overflow-hidden border border-white/10">
          <div className="grid grid-cols-4 bg-[#0A1628] text-white text-xs font-semibold">
            <div className="px-6 py-4 text-white uppercase tracking-wider">Role</div>
            <div className="px-6 py-4 text-white uppercase tracking-wider">🇺🇸 U.S. / Year</div>
            <div className="px-6 py-4 text-white uppercase tracking-wider">✅ Remote ACKtive / Year</div>
            <div className="px-6 py-4 text-[#4FFFB0] uppercase tracking-wider font-bold">💰 Savings</div>
          </div>
          {roles.map((row, idx) => (
            <div
              key={row.label}
              className={`grid grid-cols-4 border-t border-white/5 transition-colors hover:bg-[#57C5CF]/5 ${
                idx % 2 === 0 ? 'bg-[#1E2430]' : 'bg-[#242C3B]'
              }`}
            >
              <div className="px-6 py-3.5 font-semibold text-white text-sm">
                {row.label}
              </div>
              <div className="px-6 py-3.5 text-white/45 text-sm line-through decoration-red-300">
                {row.usRange}
              </div>
              <div className="px-6 py-3.5 text-[#4FFFB0] font-semibold text-sm">
                {row.raRange}
              </div>
              <div className="px-6 py-3.5">
                <span className="inline-block bg-[#4FFFB0]/20 text-[#4FFFB0] text-xs font-bold px-3 py-1 rounded-full border border-[#4FFFB0]/40">
                  Up to {Math.round(((roles[idx].usMid - roles[idx].raMid) / roles[idx].usMid) * 100)}% off
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Reference cards — mobile ── */}
        <div className="md:hidden space-y-4">
          {roles.map((row) => (
            <div
              key={row.label}
              className="bg-[#1E2430] rounded-xl border border-white/10 p-5"
            >
              <h3 className="font-bold text-white mb-3">{row.label}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white uppercase tracking-wide">🇺🇸 U.S. Cost</span>
                <span className="text-white text-sm line-through decoration-red-300">{row.usRange}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-white uppercase tracking-wide">✅ With Us</span>
                <span className="text-[#4FFFB0] font-semibold text-sm">{row.raRange}</span>
              </div>
              <div className="text-right">
                <span className="inline-block bg-[#4FFFB0]/20 text-[#4FFFB0] text-xs font-bold px-3 py-1 rounded-full border border-[#4FFFB0]/40">
                  Save {Math.round(((row.usMid - row.raMid) / row.usMid) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-black font-medium text-center mt-6">
          * Figures represent approximate annual all-in costs (salary + overhead + benefits).
          Actual savings vary by role, region, and engagement type.
        </p>
      </div>
    </section>
  );
}
