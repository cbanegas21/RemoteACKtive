import GlobeWithFallback from './GlobeWithFallback';
import CompanyLogosSlider from './CompanyLogosSlider';

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
      className="relative min-h-screen overflow-visible bg-gradient-hero"
    >
      {/* Background glow — hosted locally for caching + LCP improvement */}
      {/* TODO: upload hero-glow.svg to /public/images/hero-glow.svg */}
      <img
        src="/images/hero-glow.svg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="pointer-events-none absolute -z-10 left-1/2 top-[40%] w-[220%] -translate-x-1/2 -translate-y-1/2 opacity-90 mix-blend-screen"
      />

      {/* Globe — right side */}
      <div className="absolute z-0 right-[-15%] top-[-30vh] w-[min(78vw,1900px)] min-w-[1200px] aspect-square">
        <div className="relative w-full h-full">
          {/* Teal halo */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '90%',
              height: '90%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(87,197,207,0.6) 0%, rgba(87,197,207,0.4) 20%, rgba(87,197,207,0.2) 40%, rgba(87,197,207,0) 60%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: -1,
              borderRadius: '50%',
            }}
          />
          <div
            className="pointer-events-auto touch-none w-full h-full opacity-90 rounded-full"
            style={{
              filter: 'sepia(100%) saturate(400%) hue-rotate(140deg) brightness(85%)',
              boxShadow: 'none',
            }}
          >
            <GlobeWithFallback />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-40 md:pt-44 xl:pt-48 pb-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-[45rem] xl:max-w-[50rem] 2xl:max-w-[54rem] flex-1 flex flex-col justify-center">

          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 mb-7 w-fit">
            <span className="inline-block w-2 h-2 rounded-full bg-[#4FFFB0] animate-pulse" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#57C5CF] uppercase">
              Remote Staffing &amp; Outsourcing
            </span>
          </div>

          {/* H1 — two-line money-savings hook */}
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
            Stop Overpaying
            <br />
            <span className="text-[#4FFFB0]">for Talent.</span>
          </h1>

          {/* Supporting headline */}
          <p className="mt-5 text-xl md:text-2xl xl:text-3xl font-semibold text-[#57C5CF] leading-snug">
            Get U.S.-quality work at 70% less — same skill level, zero compromise.
          </p>

          {/* Body copy */}
          <p className="mt-5 text-base md:text-lg xl:text-xl text-white/75 leading-relaxed max-w-xl">
            Pre-vetted professionals from 18+ countries, ready to join your team in 3–10 days.
            No middlemen, no inflated agency fees — just elite global talent that performs.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="/book-a-call"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#4FFFB0] text-black text-lg font-bold shadow-[0_4px_18px_rgba(79,255,176,0.4)] transition-all hover:bg-[#3EE89F] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(79,255,176,0.55)] focus:outline-none focus:ring-2 focus:ring-[#4FFFB0]/60"
            >
              Book a Free Discovery Call
            </a>
            <a
              href="#how-it-works"
              className="text-white/80 hover:text-white transition-colors text-base md:text-lg font-medium flex items-center gap-1.5"
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
                <span className="mt-1.5 text-sm text-white/50 font-medium tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Logo slider */}
        <div className="relative z-20 mt-16">
          <CompanyLogosSlider />
        </div>
      </div>
    </section>
  );
}
