'use client';

import { useEffect, useRef, useCallback } from 'react';
import { createNoise3D } from 'simplex-noise';

interface VortexBackgroundProps {
  className?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

const TAU = 2 * Math.PI;

function rand(n: number) { return n * Math.random(); }
function randRange(n: number) { return n - rand(2 * n); }
function fadeInOut(t: number, m: number) {
  const hm = 0.5 * m;
  return Math.abs(((t + hm) % m) - hm) / hm;
}
function lerp(n1: number, n2: number, speed: number) {
  return (1 - speed) * n1 + speed * n2;
}

export function VortexBackground({
  className = '',
  particleCount = 700,
  rangeY = 100,
  baseHue = 180,
  baseSpeed = 0.0,
  rangeSpeed = 1.5,
  baseRadius = 2,
  rangeRadius = 3,
  backgroundColor = '#04090f',
}: VortexBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise3D = createNoise3D();
  const particlePropsLength = particleCount * 9;
  const particleProps = useRef(new Float32Array(particlePropsLength));
  const center = useRef([0, 0]);
  const tick = useRef(0);
  const rafId = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const HALF_TAU = 0.5 * TAU;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;

  const initParticle = useCallback((i: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const x = rand(canvas.width);
    const y = center.current[1] + randRange(rangeY);
    const vx = 0, vy = 0, life = 0;
    const ttl = 50 + rand(150);
    const speed = baseSpeed + rand(rangeSpeed);
    const radius = baseRadius + rand(rangeRadius);
    const hue = baseHue + rand(60);
    particleProps.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  }, [rangeY, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue]);

  const drawParticle = useCallback(
    (x: number, y: number, x2: number, y2: number, life: number, ttl: number, radius: number, hue: number, ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }, []
  );

  const updateParticle = useCallback(
    (i: number, ctx: CanvasRenderingContext2D) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i, i9=8+i;
      const x = particleProps.current[i];
      const y = particleProps.current[i2];
      const n = noise3D(x * xOff, y * yOff, tick.current * zOff) * HALF_TAU;
      let vx = lerp(particleProps.current[i3], Math.cos(n), 0.5);
      let vy = lerp(particleProps.current[i4], Math.sin(n), 0.5);

      // Mouse repulsion
      const mdx = x - mouseRef.current.x;
      const mdy = y - mouseRef.current.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 140 && mdist > 0) {
        const force = (1 - mdist / 140) * 2.5;
        vx += (mdx / mdist) * force;
        vy += (mdy / mdist) * force;
      }

      let life = particleProps.current[i5];
      const ttl = particleProps.current[i6];
      const speed = particleProps.current[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = particleProps.current[i8];
      const hue = particleProps.current[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);
      life++;
      particleProps.current[i] = x2;
      particleProps.current[i2] = y2;
      particleProps.current[i3] = vx;
      particleProps.current[i4] = vy;
      particleProps.current[i5] = life;
      if (life > ttl || x2 < 0 || x2 > canvas.width || y2 < 0 || y2 > canvas.height) {
        initParticle(i);
      }
    }, [drawParticle, initParticle, noise3D, HALF_TAU]
  );

  const draw = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      tick.current++;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlePropsLength; i += 9) {
        updateParticle(i, ctx);
      }
      rafId.current = requestAnimationFrame(() => draw(canvas, ctx));
    }, [backgroundColor, particlePropsLength, updateParticle]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      center.current = [0.5 * canvas.width, 0.5 * canvas.height];
    };
    resize();

    for (let i = 0; i < particlePropsLength; i += 9) {
      initParticle(i);
    }

    draw(canvas, ctx);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, [draw, initParticle, particlePropsLength]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
