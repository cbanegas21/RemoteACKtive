'use client';

import { useRef, useState, MouseEvent } from 'react';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'ghost';
  color?: string;
  rippleColor?: string;
  type?: 'button' | 'submit';
}

export function RippleButton({
  children,
  onClick,
  className = '',
  variant = 'default',
  color = '#a8e8f5',
  rippleColor = 'rgba(255,255,255,0.35)',
  type = 'button',
}: RippleButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  };

  const variantStyle: React.CSSProperties =
    variant === 'ghost'
      ? { background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }
      : { background: color, color: '#090F0D', border: 'none' };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={(e) => { addRipple(e); onClick?.(); }}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 0, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s ease', ...variantStyle }}
      className={className}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{ position: 'absolute', left: r.x, top: r.y, width: 0, height: 0, borderRadius: '50%', background: rippleColor, transform: 'translate(-50%, -50%) scale(0)', animation: 'ripple 0.7s ease-out forwards', pointerEvents: 'none' }}
        />
      ))}
      {children}
      <style>{`@keyframes ripple { to { width: 300px; height: 300px; opacity: 0; transform: translate(-50%, -50%) scale(1); } }`}</style>
    </button>
  );
}

export function HoverFillButton({
  children,
  color = '#a8e8f5',
  textColor = '#090F0D',
  className = '',
  href,
  onClick,
}: {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const style = { border: `1px solid ${color}`, color: hovered ? textColor : color, background: hovered ? color : 'transparent', transition: 'all 0.3s' };

  if (href) {
    return (
      <a href={href} className={`relative overflow-hidden font-bold text-sm px-7 py-3 rounded-full inline-flex items-center gap-2 ${className}`} style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`relative overflow-hidden font-bold text-sm px-7 py-3 rounded-full inline-flex items-center gap-2 ${className}`} style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {children}
    </button>
  );
}
