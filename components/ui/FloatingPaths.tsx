'use client';

import { motion } from 'framer-motion';

export function FloatingPaths({ position = 1, opacity = 1 }: { position?: number; opacity?: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M${-380 - i * 5 * position} ${-189 + i * 33}C${-380 - i * 5 * position} ${-189 + i * 33} ${-312 - i * 5 * position} ${216 - i * 33} ${152 - i * 5 * position} ${343 - i * 33}C${616 - i * 5 * position} ${470 - i * 33} ${684 - i * 5 * position} ${875 - i * 33} ${684 - i * 5 * position} ${875 - i * 33}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity }}>
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.015}
            className="text-teal-400"
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2], pathOffset: [0, 1, 0] }}
            transition={{ duration: 20 + (path.id % 8) * 2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </svg>
    </div>
  );
}
