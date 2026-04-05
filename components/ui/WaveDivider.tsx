'use client';

import { useRef, useState } from 'react';

interface WavePathProps {
  height?: number;
  color?: string;
  stiffness?: number;
  className?: string;
}

export function WavePath({ height = 80, color = '#a8e8f5', stiffness = 0.05, className = '' }: WavePathProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [controlPoint, setControlPoint] = useState({ x: 0.5, y: 0.5 });
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const animatingRef = useRef(false);

  const startAnimation = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    const tick = () => {
      setControlPoint((prev) => {
        const dx = targetRef.current.x - prev.x;
        const dy = targetRef.current.y - prev.y;
        if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) { animatingRef.current = false; return prev; }
        return { x: prev.x + dx * stiffness * 10, y: prev.y + dy * stiffness * 10 };
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
    startAnimation();
  };

  const handleMouseLeave = () => { targetRef.current = { x: 0.5, y: 0.5 }; startAnimation(); };

  return (
    <svg ref={svgRef} className={`w-full cursor-pointer ${className}`} style={{ height }} viewBox="0 0 100 100" preserveAspectRatio="none" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <path d={`M 0 50 Q ${controlPoint.x * 100} ${controlPoint.y * 100} 100 50`} fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx={controlPoint.x * 100} cy={controlPoint.y * 100} r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

export function WaveDivider({ className = '', color = '#a8e8f5' }: { className?: string; color?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <WavePath height={56} color={color} stiffness={0.08} />
    </div>
  );
}
