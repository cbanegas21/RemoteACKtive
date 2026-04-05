'use client';

import { useEffect, useRef } from 'react';

interface Beam {
  x: number;
  y: number;
  width: number;
  speed: number;
  opacity: number;
  hue: number;
}

interface BeamsBackgroundProps {
  className?: string;
  beamCount?: number;
  beamColors?: number[]; // hue values
}

export function BeamsBackground({
  className = '',
  beamCount = 30,
  beamColors = [180, 195, 160, 170],
}: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    beamsRef.current = Array.from({ length: beamCount }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      width: Math.random() * 3 + 0.5,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.15 + 0.05,
      hue: beamColors[Math.floor(Math.random() * beamColors.length)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const beam of beamsRef.current) {
        beam.y -= beam.speed;

        if (beam.y < -canvas.height * 0.5) {
          beam.y = canvas.height + 100;
          beam.x = Math.random() * canvas.width;
        }

        const gradient = ctx.createLinearGradient(beam.x, beam.y, beam.x, beam.y - canvas.height * 0.6);
        gradient.addColorStop(0, `hsla(${beam.hue}, 80%, 60%, 0)`);
        gradient.addColorStop(0.3, `hsla(${beam.hue}, 80%, 70%, ${beam.opacity})`);
        gradient.addColorStop(0.7, `hsla(${beam.hue}, 80%, 80%, ${beam.opacity * 0.6})`);
        gradient.addColorStop(1, `hsla(${beam.hue}, 80%, 90%, 0)`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = beam.width;
        ctx.moveTo(beam.x, beam.y);
        ctx.lineTo(beam.x, beam.y - canvas.height * 0.6);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [beamCount, beamColors]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
