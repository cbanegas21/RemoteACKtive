'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const AuroraShader = dynamic(
  () => import('@/components/ui/animated-shader-background'),
  { ssr: false }
);

export function GlobalAurora() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const trigger = () => setShow(true);
    const events = ['scroll', 'mousemove', 'touchstart', 'keydown'] as const;
    events.forEach(e => window.addEventListener(e, trigger, { once: true, passive: true }));
    // 8s safety fallback — same strategy as the globe
    const t = setTimeout(trigger, 8000);
    return () => {
      events.forEach(e => window.removeEventListener(e, trigger));
      clearTimeout(t);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.45,
      }}
    >
      {/* inner relative container so AuroraShader's absolute positioning fills it */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <AuroraShader />
      </div>
    </div>
  );
}
