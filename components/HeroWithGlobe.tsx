'use client';

import GlobeWithFallback from './GlobeWithFallback';
import TypingText from './TypingText';
import { VortexBackground } from './ui/VortexBackground';
import { MagneticButton } from './ui/MagneticButton';
import { RippleButton } from './ui/RippleButton';

export default function HeroWithGlobe() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-visible"
      style={{ background: '#04090f' }}
    >
      {/* Vortex background — mouse-reactive, bigger particles */}
      <VortexBackground
        baseHue={180}
        particleCount={700}
        rangeY={200}
        backgroundColor="#04090f"
        baseRadius={1}
        rangeRadius={2}
      />

      {/* Background glow */}
      <img
        src="/images/hero-glow.svg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="pointer-events-none absolute -z-10 left-1/2 top-[40%] w-[220%] -translate-x-1/2 -translate-y-1/2 opacity-40 mix-blend-screen"
      />

      {/* Sun glow — toned down so vortex can breathe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0
                   right-[-35%] top-[50vh] -translate-y-1/2
                   w-[min(117vw,2223px)] min-w-[1650px] aspect-square"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, ' +
            'rgba(255,255,255,0.38)  0%,  ' +
            'rgba(255,255,210,0.28)  8%,  ' +
            'rgba(220,255,245,0.16)  20%, ' +
            'rgba(160,240,255,0.08)  35%, ' +
            'transparent             55%)',
        }}
      />

      {/* Globe */}
      <div className="absolute z-0 right-[-15%] top-[50vh] -translate-y-1/2 w-[min(78vw,1900px)] min-w-[1100px] aspect-square">
        <div
          className="pointer-events-auto touch-none w-full h-full opacity-90 rounded-full"
          style={{ boxShadow: 'none' }}
        >
          <GlobeWithFallback />
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20 md:pt-24 xl:pt-28 pb-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-[45rem] xl:max-w-[50rem] 2xl:max-w-[54rem] flex-1 flex flex-col justify-center">

          {/* H1 */}
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
            Stop Overpaying
            <br />
            <span className="text-[#b8fce8]" style={{ fontSize: '1.1em' }}>for Talent.</span>
          </h1>

          {/* Typing headline */}
          <p className="mt-6 text-2xl md:text-3xl xl:text-4xl font-bold text-white leading-snug min-h-[1.4em]">
            Hire world-class <TypingText />
          </p>

          {/* Body copy */}
          <p className="mt-5 text-base md:text-lg xl:text-xl text-white/80 leading-relaxed max-w-xl">
            Pre-vetted professionals from 20+ countries, ready to join your team in 3–10 days.
            No middlemen, no inflated agency fees — just elite global talent that performs.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Primary — magnetic + high contrast white/mint */}
            <MagneticButton
              href="/book-a-call"
              strength={0.28}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-[#04090f] shadow-[0_0_32px_rgba(255,255,255,0.18),0_8px_24px_rgba(184,252,232,0.25)] hover:shadow-[0_0_44px_rgba(255,255,255,0.28),0_12px_32px_rgba(184,252,232,0.4)] transition-shadow duration-300"
              style={{ background: 'linear-gradient(135deg, #ffffff 0%, #a8e8f5 60%, #b8fce8 100%)' } as React.CSSProperties}
            >
              Book a Free Discovery Call
              <span aria-hidden="true" className="text-lg">→</span>
            </MagneticButton>

            {/* Secondary — scroll to how-it-works */}
            <RippleButton
              variant="ghost"
              className="text-base px-8 py-4 !border-white/40 hover:!border-white/70"
              rippleColor="rgba(255,255,255,0.2)"
              onClick={() => {
                const el = document.getElementById("how-it-works");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              See How It Works
              <span aria-hidden="true">→</span>
            </RippleButton>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            {[
              '$0 Recruitment Fee',
              'Up to 70% Salary Savings',
            ].map((item, i) => (
              <div key={item} className="flex items-center gap-2.5">
                {i > 0 && <span className="hidden sm:block w-px h-5 bg-white/20 -mr-1" aria-hidden="true" />}
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="6.5" stroke="#b8fce8" strokeOpacity="0.5" />
                  <path d="M4 7l2 2 4-4" stroke="#b8fce8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-base md:text-lg font-bold text-white/85">{item}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
