import GitHubGlobe from './GitHubHeroGlobe';
import CompanyLogosSlider from './CompanyLogosSlider';

export default function HeroWithGlobe() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-visible bg-gradient-hero"
    >
      {/* Background glow behind everything */}
      <img
        src="https://github.githubassets.com/images/modules/site/home/hero-glow.svg"
        alt=""
        className="pointer-events-none absolute -z-10 left-1/2 top-[40%] w-[220%] -translate-x-1/2 -translate-y-1/2 opacity-90 mix-blend-screen"
      />

      {/* --- BIG GLOBE — high and to the right, like GitHub --- */}
      <div className="absolute z-0 right-[-15%] top-[-30vh] w-[min(78vw,1900px)] min-w-[1200px] aspect-square">
        {/* Clean teal glow wrapper */}
        <div className="relative w-full h-full">
          {/* Teal glow - PURE BRIGHT GLOW ONLY, NO DARK SHADOW */}
          <div
            className="absolute inset-0 rounded-full -m-[8%]"
            style={{
              background: 'radial-gradient(circle, rgba(87, 197, 207, 0.6) 0%, rgba(87, 197, 207, 0.4) 20%, rgba(87, 197, 207, 0.2) 35%, rgba(87, 197, 207, 0.08) 48%, transparent 58%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
              zIndex: -1
            }}
          />
          {/* Globe with color filter - NO shadows */}
          <div
            className="pointer-events-auto touch-none w-full h-full opacity-90 mix-blend-mode-screen rounded-full"
            style={{
              filter: 'sepia(100%) saturate(400%) hue-rotate(140deg) brightness(85%)',
              boxShadow: 'none'
            }}
          >
            <GitHubGlobe />
          </div>
        </div>
      </div>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-40 md:pt-44 xl:pt-48 pb-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-[45rem] xl:max-w-[50rem] 2xl:max-w-[54rem] flex-1 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] text-white">
            Scale Your Business with Elite Global Talent
          </h1>

          <p className="mt-6 text-lg md:text-xl xl:text-2xl text-white/90 leading-relaxed">
            Save up to 70% on operational costs while accessing world-class professionals in 3-10 days
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="/book-a-call"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#4FFFB0] text-black text-lg font-bold shadow-[0_4px_12px_rgba(79,255,176,0.4)] transition-all hover:bg-[#3EE89F] hover:text-black hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(79,255,176,0.5)] focus:outline-none focus:ring-2 focus:ring-[#4FFFB0]/60"
            >
              Book a Discovery Call
            </a>

            <a
              href="#how-it-works"
              className="text-white hover:text-white/80 transition-colors text-base md:text-lg font-medium"
            >
              Learn More →
            </a>
          </div>
        </div>

        <div className="relative z-20 mt-12">
          <CompanyLogosSlider />
        </div>
      </div>
    </section>
  );
}
