'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function HandwritingText({ children, className = '', color = '#a8e8f5', duration = 1.5, delay = 0.3, rx = 12 }: {
  children: React.ReactNode; className?: string; color?: string; duration?: number; delay?: number; rx?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" aria-hidden="true">
        <motion.rect x="0" y="0" width="100%" height="100%" rx={rx} ry={rx} fill="none" stroke={color} strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration, delay, ease: 'easeInOut' }} />
      </svg>
    </span>
  );
}

export function HandwritingUnderline({ children, className = '', color = '#b8fce8', duration = 1.0, delay = 0.5 }: {
  children: React.ReactNode; className?: string; color?: string; duration?: number; delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <span ref={ref} className={`relative inline-block pb-1 ${className}`}>
      {children}
      <svg className="absolute bottom-0 left-0 w-full pointer-events-none overflow-visible" style={{ height: 8 }} aria-hidden="true" preserveAspectRatio="none">
        <motion.path d="M 0 4 Q 50% 8 100% 4" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration, delay, ease: 'easeOut' }} />
      </svg>
    </span>
  );
}
