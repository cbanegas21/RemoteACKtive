'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  inactiveZone?: number;
  borderWidth?: number;
  children: React.ReactNode;
  className?: string;
}

export function GlowingEffect({
  glow = true,
  disabled = false,
  inactiveZone = 0.01,
  borderWidth = 1,
  children,
  className = '',
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || disabled) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const maxDim = Math.max(rect.width, rect.height);
      setIsActive(distance < maxDim * (0.5 + inactiveZone));
      setAngle((Math.atan2(y, x) * 180) / Math.PI + 90);
    },
    [disabled, inactiveZone]
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsActive(false)}
    >
      {!disabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          animate={{ opacity: isActive ? 1 : 0 }}
          style={{
            padding: borderWidth,
            background: `conic-gradient(from ${angle}deg at 50% 50%, #a8e8f5, #b8fce8, #a8e8f5, transparent 40%)`,
            WebkitMask: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
            WebkitMaskComposite: 'destination-out',
            maskComposite: 'exclude',
          }}
        />
      )}
      {glow && !disabled && isActive && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-30 blur-xl"
          style={{
            background: `conic-gradient(from ${angle}deg at 50% 50%, #a8e8f5, #b8fce8, transparent 40%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
