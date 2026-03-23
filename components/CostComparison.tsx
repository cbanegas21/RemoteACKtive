'use client';
import { useState } from 'react';
import { ArrowRight, TrendingDown, DollarSign, Users } from 'lucide-react';

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
    <section
      id="cost-comparison"
      className="py-24"
      style={{ background: 'linear-gradient(135deg, #135058 0%, #1a6b5e 40%, #c8c96b 85%, #F1F2B5 100%)' }}
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-black/10 border border-black/20 rounded-full px-4 py-1.5 mb-5">
            <span
              className="text-sm font-bold text-[#0F1926] tracking-wide uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Real Cost Comparison
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F1926] mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            See Exactly How Much You Save
          </h2>
          <p
            className="text-lg text-[#0F1926]/70 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Pick a role, set your headcount, and watch the savings add up in real time.
          </p>
        </div>

        {/* ── Interactive calculator ── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* Left — inputs */}
          <div
            className="rounded-2xl border border-white/10 p-8"
            style={{ background: 'rgba(13,26,45,0.92)', backdropFilter: 'blur(12px)' }}
          >
            {/* Step 1: role selector */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-full bg-[#57C5CF]/15 flex items-center justify-center flex-shrink-0">
                <Users className="w-3.5 h-3.5 text-[#57C5CF]" />
              </div>
              <p
                className="text-xs font-bold text-[#57C5CF] uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Step 1 — Pick a role
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-9">
              {roles.map((r, i) => (
                <button
                  key={r.label}
                  onClick={() => setSelectedIdx(i)}
                  className={`text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#57C5CF] ${
                    selectedIdx === i
                      ? 'border-[#57C5CF]/70 text-white shadow-[0_0_0_1px_rgba(87,197,207,0.3),0_4px_16px_rgba(87,197,207,0.15)]'
                      : 'border-white/8 text-white/60 hover:border-[#57C5CF]/30 hover:text-white hover:bg-white/3'
                  }`}
                  style={{
                    background: selectedIdx === i
                      ? 'linear-gradient(135deg, rgba(87,197,207,0.12) 0%, rgba(87,197,207,0.06) 100%)'
                      : 'rgba(255,255,255,0.03)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div
              className="h-px w-full mb-7"
              style={{ background: 'linear-gradient(90deg, rgba(87,197,207,0.3) 0%, transparent 100%)' }}
            />

            {/* Step 2: headcount */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-full bg-[#57C5CF]/15 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-3.5 h-3.5 text-[#57C5CF]" />
              </div>
              <p
                className="text-xs font-bold text-[#57C5CF] uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Step 2 — How many hires?
              </p>
            </div>

            {/* Custom stepper */}
            <div className="flex items-center gap-4">
              <button
                onClick={dec}
                aria-label="Decrease headcount"
                className="w-12 h-12 rounded-full border-2 border-white/15 text-white/50 text-xl font-bold hover:border-[#57C5CF] hover:text-[#57C5CF] hover:bg-[#57C5CF]/8 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#57C5CF]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span
                  className="text-6xl font-extrabold text-white tabular-nums leading-none"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {headcount}
                </span>
                <p
                  className="text-white/40 text-xs mt-1"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {headcount === 1 ? 'person' : 'people'}
                </p>
              </div>
              <button
                onClick={inc}
                aria-label="Increase headcount"
                className="w-12 h-12 rounded-full border-2 border-white/15 text-white/50 text-xl font-bold hover:border-[#57C5CF] hover:text-[#57C5CF] hover:bg-[#57C5CF]/8 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#57C5CF]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                +
              </button>
            </div>

            {/* Slider */}
            <div className="mt-5">
              <input
                type="range"
                min={1}
                max={20}
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                aria-label="Headcount slider"
                className="w-full h-2 appearance-none rounded-full outline-none focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #57C5CF 0%, #57C5CF ${((headcount - 1) / 19) * 100}%, rgba(255,255,255,0.12) ${((headcount - 1) / 19) * 100}%, rgba(255,255,255,0.12) 100%)`,
                  cursor: 'pointer',
                }}
              />
              <style>{`
                input[type='range']::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 22px;
                  height: 22px;
                  border-radius: 50%;
                  background: #57C5CF;
                  border: 3px solid #0F1926;
                  box-shadow: 0 0 0 2px rgba(87,197,207,0.4), 0 4px 12px rgba(87,197,207,0.3);
                  cursor: pointer;
                  transition: box-shadow 0.2s;
                }
                input[type='range']::-webkit-slider-thumb:hover {
                  box-shadow: 0 0 0 4px rgba(87,197,207,0.3), 0 4px 16px rgba(87,197,207,0.4);
                }
                input[type='range']::-moz-range-thumb {
                  width: 22px;
                  height: 22px;
                  border-radius: 50%;
                  background: #57C5CF;
                  border: 3px solid #0F1926;
                  box-shadow: 0 0 0 2px rgba(87,197,207,0.4);
                  cursor: pointer;
                }
              `}</style>
              <div
                className="flex justify-between mt-1.5"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span className="text-xs text-white/30">1</span>
                <span className="text-xs text-white/30">20</span>
              </div>
            </div>
          </div>

          {/* Right — live results */}
          <div
            className="rounded-2xl border border-[#4FFFB0]/15 p-8 flex flex-col justify-between relative overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, #0A1628 0%, #0B1E22 60%, #0A1f1A 100%)',
            }}
          >
            {/* Background accent glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(79,255,176,0.06) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10">
              <p
                className="text-[#57C5CF] text-xs font-bold uppercase tracking-widest mb-6"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {role.label}&nbsp;×&nbsp;{headcount}&nbsp;—&nbsp;Annual Estimate
              </p>

              {/* US vs Remote comparison */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/4 border border-white/8">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg leading-none">🇺🇸</span>
                    <span
                      className="text-white/80 text-sm font-medium"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      U.S. hire / year
                    </span>
                  </div>
                  <span
                    className="text-white/50 text-sm tabular-nums line-through decoration-red-400"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {fmt(usTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#4FFFB0]/20 bg-[#4FFFB0]/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#4FFFB0]/20 flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="w-3.5 h-3.5 text-[#4FFFB0]" />
                    </div>
                    <span
                      className="text-white/80 text-sm font-medium"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Remote ACKtive / year
                    </span>
                  </div>
                  <span
                    className="text-[#4FFFB0] text-sm font-bold tabular-nums"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {fmt(raTotal)}
                  </span>
                </div>
              </div>

              {/* Hero savings callout */}
              <div
                className="relative rounded-2xl p-6 mb-5 overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(79,255,176,0.12) 0%, rgba(79,255,176,0.06) 100%)',
                  border: '1px solid rgba(79,255,176,0.25)',
                  boxShadow: '0 8px 32px rgba(79,255,176,0.08), inset 0 1px 0 rgba(79,255,176,0.15)',
                }}
              >
                {/* Glow orb */}
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(79,255,176,0.2) 0%, transparent 70%)' }}
                />

                <p
                  className="text-white/60 text-xs uppercase tracking-widest mb-2 font-bold"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Your annual savings
                </p>

                <p
                  className="text-5xl md:text-6xl font-extrabold text-[#4FFFB0] leading-none tabular-nums mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {fmt(saved)}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <div
                    className="flex items-baseline gap-1"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <span className="text-white/80 text-lg font-bold tabular-nums">
                      {fmt(savedMonthly)}
                    </span>
                    <span className="text-white/40 text-sm">/mo</span>
                  </div>
                  <span
                    className="bg-[#4FFFB0]/15 border border-[#4FFFB0]/30 text-[#4FFFB0] text-sm font-extrabold px-4 py-1 rounded-full"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {pct}% saved
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="/book-a-call"
              className="relative z-10 mt-2 inline-flex items-center justify-center gap-2 btn-grad text-white font-bold px-6 py-4 rounded-full text-sm w-full"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Like the savings? Book a Free Strategy Call
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </a>
          </div>
        </div>

        {/* ── Reference table — desktop ── */}
        <div className="hidden md:block rounded-2xl overflow-hidden border border-white/10">
          {/* Table header */}
          <div
            className="grid grid-cols-4 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(10,22,40,0.95)', fontFamily: 'var(--font-body)' }}
          >
            <div className="px-6 py-4 text-white/50">Role</div>
            <div className="px-6 py-4 text-white/50">🇺🇸 U.S. / Year</div>
            <div className="px-6 py-4 text-white/50">Remote ACKtive / Year</div>
            <div className="px-6 py-4 text-[#4FFFB0]">Annual Savings</div>
          </div>

          {roles.map((row, idx) => {
            const rowPct = Math.round(((row.usMid - row.raMid) / row.usMid) * 100);
            const isSelected = idx === selectedIdx;
            return (
              <div
                key={row.label}
                onClick={() => setSelectedIdx(idx)}
                className={`grid grid-cols-4 border-t border-white/5 cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#57C5CF]/8'
                    : idx % 2 === 0
                    ? 'bg-[#0F1926]/70'
                    : 'bg-[#0A1628]/70'
                } hover:bg-[#57C5CF]/6`}
              >
                <div
                  className="px-6 py-3.5 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#57C5CF] flex-shrink-0" />
                  )}
                  <span className={`text-sm font-semibold ${isSelected ? 'text-[#57C5CF]' : 'text-white/80'}`}>
                    {row.label}
                  </span>
                </div>
                <div
                  className="px-6 py-3.5 text-white/40 text-sm line-through decoration-red-400/60 tabular-nums self-center"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {row.usRange}
                </div>
                <div
                  className="px-6 py-3.5 text-[#4FFFB0] font-semibold text-sm tabular-nums self-center"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {row.raRange}
                </div>
                <div className="px-6 py-3.5 self-center">
                  <span
                    className="inline-flex items-center gap-1.5 bg-[#4FFFB0]/12 text-[#4FFFB0] text-xs font-bold px-3 py-1.5 rounded-full border border-[#4FFFB0]/30"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <TrendingDown className="w-3 h-3" />
                    Up to {rowPct}% off
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Reference cards — mobile ── */}
        <div className="md:hidden space-y-3">
          {roles.map((row, idx) => {
            const rowPct = Math.round(((row.usMid - row.raMid) / row.usMid) * 100);
            return (
              <div
                key={row.label}
                className="rounded-xl border border-white/8 p-5"
                style={{ background: 'rgba(13,26,45,0.92)', fontFamily: 'var(--font-body)' }}
              >
                <h3 className="font-bold text-white mb-4">{row.label}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-white/50 uppercase tracking-wide">🇺🇸 U.S. Cost</span>
                  <span className="text-white/40 text-sm line-through decoration-red-400/60 tabular-nums">
                    {row.usRange}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-white/50 uppercase tracking-wide">With Us</span>
                  <span className="text-[#4FFFB0] font-semibold text-sm tabular-nums">{row.raRange}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/8">
                  <span className="text-xs text-white/40">Annual savings</span>
                  <span className="inline-flex items-center gap-1.5 bg-[#4FFFB0]/12 text-[#4FFFB0] text-xs font-bold px-3 py-1.5 rounded-full border border-[#4FFFB0]/30">
                    <TrendingDown className="w-3 h-3" />
                    Save {rowPct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className="text-sm text-[#0F1926]/60 font-medium text-center mt-6"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          * Figures represent approximate annual all-in costs (salary + overhead + benefits).
          Actual savings vary by role, region, and engagement type.
        </p>
      </div>
    </section>
  );
}
