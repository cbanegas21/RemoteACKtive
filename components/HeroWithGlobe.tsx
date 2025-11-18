import GitHubGlobe from './GitHubHeroGlobe';
import CompanyLogosSlider from './CompanyLogosSlider';

export default function HeroWithGlobe() {
  return (
    <section
      id="hero"
      className="relative min-h-[110vh] overflow-visible bg-gradient-hero"
    >
      {/* Background glow behind everything */}
      <img
        src="https://github.githubassets.com/images/modules/site/home/hero-glow.svg"
        alt=""
        className="pointer-events-none absolute -z-10 left-1/2 top-[40%] w-[220%] -translate-x-1/2 -translate-y-1/2 opacity-90 mix-blend-screen"
      />

      {/* --- BIG GLOBE — high and to the right, like GitHub --- */}
      <div
  className="
    pointer-events-auto touch-none
    absolute z-0
    right-[-15%]                /* lock to the right edge — no off-screen overflow */
    top-[-30vh]             /* lift the rim toward the navbar (tweak if needed) */
    w-[min(78vw,1900px)]    /* BIG, but guaranteed to fit in the viewport */
    min-w-[1200px]          /* stays large on laptops */
    aspect-square
  "
>
  <GitHubGlobe />
</div>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-28 md:pt-32 xl:pt-36 pb-16 min-h-[110vh] flex flex-col justify-between">
        <div className="max-w-[50rem] xl:max-w-[56rem] 2xl:max-w-[60rem] flex-1 flex flex-col justify-center">
          <h1 className="text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] text-white">
            Scale Your Business with Elite Global Talent
          </h1>

          <p className="mt-6 text-lg md:text-xl xl:text-2xl text-white/90 leading-relaxed">
            Save up to 70% on operational costs while accessing world-class professionals in 3-10 days
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-primary-teal text-lg font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              Book a Discovery Call
            </a>

            <a
              href="#services"
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
