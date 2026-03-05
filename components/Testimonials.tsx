'use client';

import { useState } from 'react';

const testimonials = [
  {
    quote:
      'We cut our development costs by 65% without sacrificing a single line of quality. The engineer Remote ACKtive placed integrated into our Agile sprints on day one — zero hand-holding required.',
    name: 'James Whitfield',
    title: 'CTO',
    company: 'NovaBridge Technologies',
    initials: 'JW',
    avatarColor: '#4F46E5',
    flag: '🇺🇸',
    country: 'United States',
    rating: 5,
  },
  {
    quote:
      'I was skeptical at first — offshore hiring had burned us before. But Remote ACKtive\'s vetting process is on another level. Our EA handles executive scheduling, travel, and research better than the last in-house hire we paid three times more for.',
    name: 'Sarah Okonkwo',
    title: 'CEO',
    company: 'Apex Ventures Group',
    initials: 'SO',
    avatarColor: '#0891B2',
    flag: '🇨🇦',
    country: 'Canada',
    rating: 5,
  },
  {
    quote:
      'Within 6 days of our intake call we had a shortlist of qualified customer service reps. The one we hired has a 97% CSAT score after three months. Remote ACKtive delivered exactly what they promised.',
    name: 'Carlos Mendez',
    title: 'Head of Operations',
    company: 'Lumio Commerce',
    initials: 'CM',
    avatarColor: '#059669',
    flag: '🇲🇽',
    country: 'Mexico',
    rating: 5,
  },
  {
    quote:
      'Our digital marketing team is now three strong and running at 40% of what we\'d pay domestically. ROI on our ad spend went up because we finally have dedicated talent focused on it full-time.',
    name: 'Rachel Park',
    title: 'VP Marketing',
    company: 'Stackwise Media',
    initials: 'RP',
    avatarColor: '#D97706',
    flag: '🇦🇺',
    country: 'Australia',
    rating: 5,
  },
  {
    quote:
      'The bookkeeping team Remote ACKtive set up has streamlined our month-end close from 8 days to 3. They use our exact tools, speak our language, and they\'re available during our core hours. Genuinely impressed.',
    name: 'Tom Brandt',
    title: 'CFO',
    company: 'Clearfield Industries',
    initials: 'TB',
    avatarColor: '#7C3AED',
    flag: '🇩🇪',
    country: 'Germany',
    rating: 5,
  },
  {
    quote:
      'I tried two other agencies before finding Remote ACKtive. The difference is the relationship — they actually check in post-hire, they care about fit, and when we needed a replacement quickly, they moved fast with zero fuss.',
    name: 'Priya Nair',
    title: 'Founder',
    company: 'Solaris Health Tech',
    initials: 'PN',
    avatarColor: '#BE185D',
    flag: '🇸🇬',
    country: 'Singapore',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const t = testimonials[activeIdx];

  return (
    <section className="py-20 overflow-hidden" style={{ background: 'linear-gradient(to right, #237A57, #093028)' }}>
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#4FFFB0]/10 border border-[#4FFFB0]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#4FFFB0] tracking-wide uppercase">
              Client Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Trusted by Teams Worldwide
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Real results from real businesses that made the switch to elite global talent.
          </p>
        </div>

        {/* Carousel — desktop: show 3, mobile: show 1 */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {[
            testimonials[(activeIdx - 1 + testimonials.length) % testimonials.length],
            testimonials[activeIdx],
            testimonials[(activeIdx + 1) % testimonials.length],
          ].map((item, i) => (
            <div
              key={item.name}
              onClick={() => {
                if (i === 0) prev();
                if (i === 2) next();
              }}
              className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                i === 1
                  ? 'bg-[#0F1F35] border-[#57C5CF]/40 shadow-xl shadow-[#57C5CF]/10 scale-[1.03]'
                  : 'bg-[#0D1A2D] border-white/8 cursor-pointer'
              }`}
            >
              {/* Quote mark */}
              <div className="text-5xl font-serif leading-none text-[#57C5CF]/20 mb-3 select-none">&ldquo;</div>

              <StarRating count={item.rating} />

              <p className="text-white text-sm leading-relaxed mt-3 mb-5">
                {item.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: item.avatarColor }}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.name}</p>
                  <p className="text-white text-xs">{item.title}, {item.company}</p>
                  <p className="text-white text-xs">{item.flag} {item.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="lg:hidden">
          <div className="relative rounded-2xl p-6 bg-[#0F1F35] border border-[#57C5CF]/40 shadow-xl">
            <div className="text-5xl font-serif leading-none text-[#57C5CF]/20 mb-3 select-none">&ldquo;</div>
            <StarRating count={t.rating} />
            <p className="text-white text-sm leading-relaxed mt-3 mb-5">{t.quote}</p>
            <div className="flex items-center gap-3">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: t.avatarColor }}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-white text-xs">{t.title}, {t.company}</p>
                <p className="text-white text-xs">{t.flag} {t.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots + arrows */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#57C5CF]/60 hover:text-[#57C5CF] transition-all"
            aria-label="Previous testimonial"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots — 44px touch target wrapping the visual dot (WCAG 2.5.5) */}
          <div className="flex items-center gap-0">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className="flex items-center justify-center h-11 px-1.5"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <span
                  className={`rounded-full transition-all duration-300 block ${
                    i === activeIdx
                      ? 'w-6 h-2 bg-[#57C5CF]'
                      : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#57C5CF]/60 hover:text-[#57C5CF] transition-all"
            aria-label="Next testimonial"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust bar */}
        <div className="mt-14 flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {[
            { value: '500+', label: 'Placements Made' },
            { value: '4.9/5', label: 'Avg. Client Rating' },
            { value: '94%', label: 'Retention After 12mo' },
            { value: '18+', label: 'Countries Covered' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold text-[#4FFFB0]">{stat.value}</p>
              <p className="text-xs text-white mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
