'use client';

import { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  stiffness?: number;
  damping?: number;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
}

export function MagneticButton({
  children,
  className = '',
  style,
  strength = 0.3,
  stiffness = 400,
  damping = 25,
  onClick,
  href,
  type = 'button',
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);
  const springConfig = { stiffness, damping };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const textX = useSpring(0, { stiffness: stiffness * 0.5, damping });
  const textY = useSpring(0, { stiffness: stiffness * 0.5, damping });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(offsetX);
    y.set(offsetY);
    textX.set(offsetX * 0.4);
    textY.set(offsetY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0); textX.set(0); textY.set(0);
  };

  if (href) {
    return (
      <div ref={btnRef} className="relative inline-flex" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <motion.a href={href} style={{ x, y, ...style }} className={`relative cursor-pointer select-none ${className}`}>
          <motion.span style={{ x: textX, y: textY }} className="relative z-10 flex items-center gap-2">
            {children}
          </motion.span>
        </motion.a>
      </div>
    );
  }

  return (
    <div ref={btnRef} className="relative inline-flex" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.button type={type} style={{ x, y, ...style }} onClick={onClick} className={`relative cursor-pointer select-none ${className}`}>
        <motion.span style={{ x: textX, y: textY }} className="relative z-10 flex items-center gap-2">
          {children}
        </motion.span>
      </motion.button>
    </div>
  );
}
