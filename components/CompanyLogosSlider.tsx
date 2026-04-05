'use client';

import Image from 'next/image';

// Per-logo sizing to normalize visual weight across different aspect ratios
const companies = [
  { id: 'meta',        w: 160, h: 48 },
  { id: 'google',      w: 140, h: 50 },
  { id: 'microsoft',   w: 200, h: 48 },
  { id: 'slack',       w: 140, h: 50 },
  { id: 'github',      w: 140, h: 48 },
  { id: 'shopify',     w: 160, h: 48 },
  { id: 'stripe',      w: 120, h: 52 },
  { id: 'paypal',      w: 140, h: 48 },
  { id: 'amazon',      w: 140, h: 48 },
  { id: 'ibm',         w: 110, h: 48 },
  { id: 'oracle',      w: 140, h: 48 },
  { id: 'salesforce',  w: 170, h: 48 },
];

export default function CompanyLogosSlider() {
  const doubled = [...companies, ...companies];

  return (
    <section
      className="relative py-14 overflow-hidden"
      style={{ background: '#04090f' }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <p className="text-center text-lg md:text-xl font-bold text-white mb-10 max-w-xl mx-auto px-6 leading-snug">
        Join successful companies who outsource and save massively on hiring costs
      </p>

      <div className="flex overflow-hidden">
        <div
          className="flex items-center gap-16 w-max"
          style={{ animation: 'logoScroll 30s linear infinite' }}
        >
          {doubled.map((company, i) => (
            <div
              key={i}
              className="flex-none logo-item"
              style={{
                width: company.w,
                height: company.h,
                filter: 'brightness(0) invert(1)',
                opacity: 0.22,
                transition: 'opacity 0.4s ease, filter 0.4s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.opacity = '0.9';
                el.style.filter = 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(184,252,232,0.5))';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.opacity = '0.22';
                el.style.filter = 'brightness(0) invert(1)';
              }}
            >
              <Image
                src={`/images/companies/${company.id}.png`}
                alt={`${company.id} logo`}
                width={company.w}
                height={company.h}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-32" style={{ background: 'linear-gradient(to right, #04090f, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32" style={{ background: 'linear-gradient(to left, #04090f, transparent)' }} />

      <style>{`
        @keyframes logoScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
