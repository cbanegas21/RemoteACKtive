'use client';

import { useEffect, useRef } from 'react';

export function GradientBlobsBackground() {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const curX = useRef(0);
  const curY = useRef(0);
  const tgX = useRef(0);
  const tgY = useRef(0);

  useEffect(() => {
    const move = () => {
      curX.current += (tgX.current - curX.current) / 20;
      curY.current += (tgY.current - curY.current) / 20;
      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(curX.current)}px, ${Math.round(curY.current)}px)`;
      }
      requestAnimationFrame(move);
    };
    const raf = requestAnimationFrame(move);

    const handleMouseMove = (e: MouseEvent) => {
      tgX.current = e.clientX;
      tgY.current = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{
        '--color-1': '87,197,207',
        '--color-2': '79,255,176',
        '--color-3': '52,163,176',
        '--color-4': '36,139,147',
        '--color-5': '55,139,87',
      } as React.CSSProperties}
    >
      {/* SVG gooey filter */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="blob-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Dark base */}
      <div className="absolute inset-0 bg-[#04090f]" />

      {/* Blobs — heavily blurred + reduced opacity so the globe stays readable */}
      <div className="absolute inset-0" style={{ filter: 'url(#blob-blur) blur(40px)', opacity: 0.55 }}>
        <div
          className="absolute [transform-origin:center_center] animate-first"
          style={{ top: 'calc(50% - 400px)', left: 'calc(50% - 400px)', width: 800, height: 800,
            background: 'radial-gradient(circle at center, rgba(var(--color-1),0.8) 0, rgba(var(--color-1),0) 50%) no-repeat' }}
        />
        <div
          className="absolute [transform-origin:calc(50%-400px)_center] animate-second"
          style={{ top: 'calc(50% - 400px)', left: 'calc(50% - 400px)', width: 800, height: 800,
            background: 'radial-gradient(circle at center, rgba(var(--color-2),0.8) 0, rgba(var(--color-2),0) 50%) no-repeat' }}
        />
        <div
          className="absolute [transform-origin:calc(50%+400px)_center] animate-third"
          style={{ top: 'calc(50% - 400px)', left: 'calc(50% - 400px)', width: 800, height: 800,
            background: 'radial-gradient(circle at center, rgba(var(--color-3),0.8) 0, rgba(var(--color-3),0) 50%) no-repeat' }}
        />
        <div
          className="absolute [transform-origin:calc(50%-200px)_center] animate-fourth"
          style={{ top: 'calc(50% - 400px)', left: 'calc(50% - 400px)', width: 800, height: 800,
            background: 'radial-gradient(circle at center, rgba(var(--color-4),0.8) 0, rgba(var(--color-4),0) 50%) no-repeat' }}
        />
        <div
          className="absolute [transform-origin:calc(50%-800px)_calc(50%+800px)] animate-fifth"
          style={{ top: 'calc(50% - 400px)', left: 'calc(50% - 400px)', width: 800, height: 800,
            background: 'radial-gradient(circle at center, rgba(var(--color-5),0.8) 0, rgba(var(--color-5),0) 50%) no-repeat' }}
        />
        {/* Mouse-following blob */}
        <div
          ref={interactiveRef}
          className="absolute opacity-60"
          style={{ top: 'calc(50% - 400px)', left: 'calc(50% - 400px)', width: 800, height: 800,
            background: 'radial-gradient(circle at center, rgba(var(--color-2),0.8) 0, rgba(var(--color-2),0) 50%) no-repeat' }}
        />
      </div>
    </div>
  );
}
