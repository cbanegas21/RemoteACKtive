import GlobeWithFallback from './GlobeWithFallback';

const stats = [
  { value: '70%',  label: 'Cost Savings'    },
  { value: '3–10', label: 'Days to Hire'    },
  { value: '18+',  label: 'Countries'       },
  { value: '500+', label: 'Placements'      },
];

export default function HeroWithGlobe() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-visible"
      style={{ background: 'linear-gradient(to right, #155799, #159957)' }}
    >
      {/* Background glow — hosted locally for caching + LCP improvement */}
      <img
        src="/images/hero-glow.svg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="pointer-events-none absolute -z-10 left-1/2 top-[40%] w-[220%] -translate-x-1/2 -translate-y-1/2 opacity-90 mix-blend-screen"
      />

      {/*
        ── SUN GLOW ──────────────────────────────────────────────────────────────
        Soft radial "sun behind the planet" effect. Slightly larger and further
        right than the globe itself so it bleeds out from behind the sphere edge.
        Colors: bright warm-white core → pale yellow → cool white → transparent.
        These lighter-than-mint tones are visible against the #34e89e right edge
        of the hero gradient (the original mint/white colors had zero contrast).
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0
                   right-[-35%] top-[50vh] -translate-y-1/2
                   w-[min(117vw,2223px)] min-w-[1650px] aspect-square"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, ' +
            'rgba(255,255,255,0.92)  0%,  ' +
            'rgba(255,255,210,0.70)  8%,  ' +
            'rgba(220,255,245,0.44)  20%, ' +
            'rgba(160,240,255,0.22)  35%, ' +
            'rgba(100,215,255,0.08)  52%, ' +
            'transparent             68%)',
        }}
      />

      {/*
        ── GLOBE ─────────────────────────────────────────────────────────────────
        FIXED: top-[-30vh] caused viewport-height drift; top-1/2 caused globe to
        fall to the bottom when the section grew taller than 100vh on small screens.
        FIX:   top-[50vh] (viewport units) + -translate-y-1/2 → globe center is
               ALWAYS pinned at exactly 50% of the VIEWPORT height, never shifts.
        right-[-15%] anchors the globe to the right edge. As the viewport narrows,
        the globe shifts LEFT (not shrinks) because min-w-[1100px] prevents it from
        scaling down — it stays large and bleeds off the right naturally. ✅
        78vw (~1123px at 1440px viewport) matches GitHub's large globe presence;
        left edge at ~37% from left on desktop, bleeds ~15% off the right.
      */}
      <div className="absolute z-0 right-[-15%] top-[50vh] -translate-y-1/2 w-[min(78vw,1900px)] min-w-[1100px] aspect-square">
        <div
          className="pointer-events-auto touch-none w-full h-full opacity-90 rounded-full"
          style={{ boxShadow: 'none' }}
        >
          <GlobeWithFallback />
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-28 md:pt-32 xl:pt-36 pb-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-[45rem] xl:max-w-[50rem] 2xl:max-w-[54rem] flex-1 flex flex-col justify-center">

          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 mb-7 w-fit">
            <span className="inline-block w-2 h-2 rounded-full bg-[#4FFFB0] animate-pulse" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#57C5CF] uppercase">
              Remote Staffing &amp; Outsourcing
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
            Stop Overpaying
            <br />
            <span className="text-[#4FFFB0]">for Talent.</span>
          </h1>

          {/* Supporting headline — white, not teal. Teal-on-teal has zero contrast. */}
          <p className="mt-5 text-xl md:text-2xl xl:text-3xl font-semibold text-white leading-snug">
            Get U.S.-quality work at 70% less — same skill level, zero compromise.
          </p>

          {/* Body copy */}
          <p className="mt-5 text-base md:text-lg xl:text-xl text-white leading-relaxed max-w-xl">
            Pre-vetted professionals from 18+ countries, ready to join your team in 3–10 days.
            No middlemen, no inflated agency fees — just elite global talent that performs.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="/book-a-call"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full btn-gradient text-black text-lg font-bold shadow-[0_4px_18px_rgba(79,255,176,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(79,255,176,0.55)] focus:outline-none focus:ring-2 focus:ring-[#4FFFB0]/60"
            >
              Book a Free Discovery Call
            </a>
            <a
              href="#how-it-works"
              className="text-white hover:text-white transition-colors text-base md:text-lg font-medium flex items-center gap-1.5"
            >
              See How It Works
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Stats strip */}
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-extrabold text-[#4FFFB0] leading-none tabular-nums">
                  {value}
                </span>
                <span className="mt-1.5 text-sm text-white font-medium tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
