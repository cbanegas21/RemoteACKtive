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
    <section id="cost-comparison" className="py-20 bg-[#F7FAFB]">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#4FFFB0]/15 border border-[#378B57]/25 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#1A5538] tracking-wide uppercase">
              Real Cost Comparison
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            See Exactly How Much You Save
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pick a role, set your headcount, and watch the savings add up in real time.
          </p>
        </div>

        {/* ── Interactive calculator ── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">

          {/* Left — inputs */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            {/* Step 1: role */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
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
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-[#57C5CF]/40 hover:bg-[#57C5CF]/5'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Step 2: headcount */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              2&nbsp;·&nbsp;How many hires?
            </p>
            <div className="flex items-center gap-5">
              <button
                onClick={dec}
                aria-label="Decrease headcount"
                className="w-11 h-11 rounded-full border-2 border-gray-200 text-gray-500 text-xl font-bold hover:border-[#57C5CF] hover:text-[#57C5CF] transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#57C5CF]"
              >
                −
              </button>
              <span className="text-5xl font-extrabold text-gray-900 w-14 text-center tabular-nums">
                {headcount}
              </span>
              <button
                onClick={inc}
                aria-label="Increase headcount"
                className="w-11 h-11 rounded-full border-2 border-gray-200 text-gray-500 text-xl font-bold hover:border-[#57C5CF] hover:text-[#57C5CF] transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#57C5CF]"
              >
                +
              </button>
              <span className="text-gray-400 text-sm">
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
                <span className="text-white/50 text-sm">🇺🇸 U.S. hire / year</span>
                <span className="text-white/45 text-sm line-through decoration-red-400 tabular-nums">
                  {fmt(usTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-7">
                <span className="text-white/50 text-sm">✅ Remote ACKtive / year</span>
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
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1.5">
                Your annual savings
              </p>
              <p className="text-5xl md:text-6xl font-extrabold text-[#4FFFB0] leading-none tabular-nums">
                {fmt(saved)}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="text-white/45 text-sm tabular-nums">
                  {fmt(savedMonthly)}<span className="text-white/25"> /mo</span>
                </span>
                <span className="bg-[#4FFFB0]/15 border border-[#4FFFB0]/30 text-[#4FFFB0] text-xs font-bold px-3 py-1 rounded-full">
                  {pct}% saved
                </span>
              </div>
            </div>

            {/* CTA */}
            <a
              href="/book-a-call"
              className="mt-8 inline-flex items-center justify-center gap-2 btn-gradient text-[#0F1926] font-bold px-6 py-4 rounded-xl text-sm w-full"
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
        <div className="hidden md:block rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="grid grid-cols-4 bg-[#0A1628] text-white text-xs font-semibold">
            <div className="px-6 py-4 text-white/50 uppercase tracking-wider">Role</div>
            <div className="px-6 py-4 text-white/50 uppercase tracking-wider">🇺🇸 U.S. / Year</div>
            <div className="px-6 py-4 text-white/50 uppercase tracking-wider">✅ Remote ACKtive / Year</div>
            <div className="px-6 py-4 text-[#4FFFB0] uppercase tracking-wider font-bold">💰 Savings</div>
          </div>
          {roles.map((row, idx) => (
            <div
              key={row.label}
              className={`grid grid-cols-4 border-t border-gray-100 transition-colors hover:bg-[#57C5CF]/5 ${
                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              }`}
            >
              <div className="px-6 py-3.5 font-semibold text-gray-900 text-sm">
                {row.label}
              </div>
              <div className="px-6 py-3.5 text-gray-400 text-sm line-through decoration-red-300">
                {row.usRange}
              </div>
              <div className="px-6 py-3.5 text-[#1A5538] font-semibold text-sm">
                {row.raRange}
              </div>
              <div className="px-6 py-3.5">
                <span className="inline-block bg-[#4FFFB0]/20 text-[#1A5538] text-xs font-bold px-3 py-1 rounded-full border border-[#4FFFB0]/40">
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
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              <h3 className="font-bold text-gray-900 mb-3">{row.label}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">🇺🇸 U.S. Cost</span>
                <span className="text-gray-400 text-sm line-through decoration-red-300">{row.usRange}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-500 uppercase tracking-wide">✅ With Us</span>
                <span className="text-[#1A5538] font-semibold text-sm">{row.raRange}</span>
              </div>
              <div className="text-right">
                <span className="inline-block bg-[#4FFFB0]/20 text-[#1A5538] text-xs font-bold px-3 py-1 rounded-full border border-[#4FFFB0]/40">
                  Save {Math.round(((row.usMid - row.raMid) / row.usMid) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          * Figures represent approximate annual all-in costs (salary + overhead + benefits).
          Actual savings vary by role, region, and engagement type.
        </p>
      </div>
    </section>
  );
}
