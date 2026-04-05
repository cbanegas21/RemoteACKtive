'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

const roles = [
  { label: 'Software Developer', usMid: 112_500, raMid: 36_500 },
  { label: 'Digital Marketer',   usMid: 75_000,  raMid: 23_000 },
  { label: 'Customer Service',   usMid: 45_000,  raMid: 13_000 },
  { label: 'Exec Assistant',     usMid: 62_500,  raMid: 18_500 },
  { label: 'Bookkeeper',         usMid: 56_500,  raMid: 17_500 },
  { label: 'UI/UX Designer',     usMid: 94_000,  raMid: 29_000 },
];

const TEAL_TEXT = '#a8e8f5';
const MINT_TEXT = '#b8fce8';

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

export default function CostComparison() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [headcount, setHeadcount] = useState(3);

  const role = roles[selectedIdx];
  const usTotal = role.usMid * headcount;
  const raTotal = role.raMid * headcount;
  const saved = usTotal - raTotal;
  const savedMonthly = Math.round(saved / 12);
  const pct = Math.round((saved / usTotal) * 100);
  const sliderPct = ((headcount - 1) / 19) * 100;

  const dec = () => setHeadcount((h) => Math.max(1, h - 1));
  const inc = () => setHeadcount((h) => Math.min(20, h + 1));

  return (
    <section
      id="cost-comparison"
      className="py-16 relative overflow-hidden"
      style={{ background: '#04090f' }}
    >
      {/* Gradient blobs background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            filter: 'blur(60px)',
            ['--color-1' as string]: '87,197,207',
            ['--color-2' as string]: '79,255,176',
            ['--color-3' as string]: '168,223,240',
            ['--color-4' as string]: '57,139,87',
            ['--color-5' as string]: '11,23,39',
          } as React.CSSProperties}
        >
          <div className="absolute animate-first opacity-70" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-1),0.5) 0, rgba(var(--color-1),0) 50%) no-repeat' }} />
          <div className="absolute animate-second opacity-70" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-2),0.5) 0, rgba(var(--color-2),0) 50%) no-repeat', transformOrigin: 'calc(50% - 300px) center' }} />
          <div className="absolute animate-third opacity-70" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-3),0.4) 0, rgba(var(--color-3),0) 50%) no-repeat', transformOrigin: 'calc(50% + 300px) center' }} />
          <div className="absolute animate-fourth opacity-60" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-4),0.4) 0, rgba(var(--color-4),0) 50%) no-repeat', transformOrigin: 'calc(50% - 150px) center' }} />
          <div className="absolute animate-fifth opacity-50" style={{ top: 'calc(50% - 300px)', left: 'calc(50% - 300px)', width: 600, height: 600, background: 'radial-gradient(circle at center, rgba(var(--color-5),0.4) 0, rgba(var(--color-5),0) 50%) no-repeat', transformOrigin: 'calc(50% - 600px) calc(50% + 600px)' }} />
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
            See exactly how much{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${TEAL_TEXT} 0%, ${MINT_TEXT} 100%)` }}>
              you save.
            </span>
          </h2>
          <p className="text-base max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>
            Pick a role, set your headcount, and watch the savings add up in real time.
          </p>
        </div>

        {/* Calculator card */}
        <SpotlightCard
          spotlightColor="rgba(168,232,245,0.12)"
          spotlightBorderColor="rgba(168,232,245,0.45)"
          background="rgba(255,255,255,0.04)"
          className="p-4 sm:p-6 md:p-8"
          radius={16}
        >
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left: Inputs */}
            <div>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-4" style={{ color: TEAL_TEXT, fontFamily: 'var(--font-body)' }}>
                Step 01 — Pick a role
              </p>
              <div className="grid grid-cols-2 gap-2 mb-7">
                {roles.map((r, i) => {
                  const isSelected = selectedIdx === i;
                  return (
                    <button
                      key={r.label}
                      onClick={() => setSelectedIdx(i)}
                      className="text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                      style={{
                        border: isSelected ? '1px solid rgba(168,232,245,0.5)' : '1px solid rgba(255,255,255,0.1)',
                        background: isSelected ? 'rgba(168,232,245,0.18)' : 'rgba(255,255,255,0.04)',
                        color: isSelected ? TEAL_TEXT : 'rgba(255,255,255,0.65)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>

              <div className="h-px w-full mb-7" style={{ background: 'linear-gradient(90deg, rgba(168,232,245,0.4) 0%, transparent 100%)' }} />

              <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-4" style={{ color: TEAL_TEXT, fontFamily: 'var(--font-body)' }}>
                Step 02 — How many hires?
              </p>

              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={dec}
                  aria-label="Decrease headcount"
                  className="w-11 h-11 rounded-full font-bold transition-all duration-200 flex items-center justify-center text-xl"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.65)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(168,232,245,0.5)'; (e.currentTarget as HTMLButtonElement).style.color = TEAL_TEXT; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.65)'; }}
                >−</button>
                <div className="flex-1 text-center">
                  <span className="text-5xl font-black leading-none tabular-nums" style={{ color: '#ffffff', fontFamily: 'var(--font-heading)' }}>{headcount}</span>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>{headcount === 1 ? 'person' : 'people'}</p>
                </div>
                <button
                  onClick={inc}
                  aria-label="Increase headcount"
                  className="w-11 h-11 rounded-full font-bold transition-all duration-200 flex items-center justify-center text-xl"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.65)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(168,232,245,0.5)'; (e.currentTarget as HTMLButtonElement).style.color = TEAL_TEXT; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.65)'; }}
                >+</button>
              </div>

              <input
                type="range" min={1} max={20} value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                aria-label="Headcount slider"
                className="w-full h-1.5 appearance-none rounded-full outline-none cost-slider"
                style={{
                  background: `linear-gradient(to right, #a8e8f5 0%, #a8e8f5 ${sliderPct}%, rgba(168,232,245,0.2) ${sliderPct}%, rgba(168,232,245,0.2) 100%)`,
                  cursor: 'pointer',
                }}
              />
              <style>{`
                .cost-slider::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:18px; height:18px; border-radius:50%; background:#a8e8f5; border:3px solid #04090f; box-shadow:0 0 0 2px rgba(168,232,245,0.4); cursor:pointer; }
                .cost-slider::-moz-range-thumb { width:18px; height:18px; border-radius:50%; background:#a8e8f5; border:3px solid #04090f; cursor:pointer; }
              `}</style>
              <div className="flex justify-between mt-1.5">
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>1</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>20</span>
              </div>
            </div>

            {/* Right: Results */}
            <div className="flex flex-col">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-5" style={{ color: TEAL_TEXT, fontFamily: 'var(--font-body)' }}>
                {role.label} × {headcount} — Annual Estimate
              </p>

              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between p-3.5 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                  <div className="flex items-center gap-2.5">
                    <span>🇺🇸</span>
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>U.S. hire / year</span>
                  </div>
                  <span className="text-sm tabular-nums" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-heading)', textDecoration: 'line-through', textDecorationColor: 'rgba(239,68,68,0.5)' }}>
                    {fmt(usTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl" style={{ background: 'rgba(168,232,245,0.12)', border: '1px solid rgba(168,232,245,0.25)' }}>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}>Remote ACKtive / year</span>
                  <span className="text-sm font-bold tabular-nums" style={{ color: TEAL_TEXT, fontFamily: 'var(--font-heading)' }}>{fmt(raTotal)}</span>
                </div>
              </div>

              {/* Savings callout */}
              <div
                className="relative rounded-2xl p-5 mb-5 overflow-hidden flex-1"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,232,245,0.15)' }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(184,252,232,0.15) 0%, transparent 70%)' }} />
                <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>Your annual savings</p>
                <p className="text-4xl font-black leading-none tabular-nums mb-3" style={{ color: MINT_TEXT, fontFamily: 'var(--font-heading)' }}>{fmt(saved)}</p>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-lg font-bold tabular-nums" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}>
                    {fmt(savedMonthly)}<span className="text-sm font-normal ml-1" style={{ color: 'rgba(255,255,255,0.45)' }}>/mo</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-black" style={{ background: 'rgba(184,252,232,0.15)', border: '1px solid rgba(184,252,232,0.25)', color: MINT_TEXT, fontFamily: 'var(--font-body)' }}>
                    {pct}% saved
                  </span>
                </div>
              </div>

              <a
                href="/book-a-call"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #ffffff 0%, #a8e8f5 50%, #b8fce8 100%)', color: '#04090f' }}
              >
                Like the savings? Book a Free Call
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
