'use client';

import React, { useRef, useId, useEffect, CSSProperties } from 'react';
import { animate, useMotionValue, AnimationPlaybackControls } from 'framer-motion';

interface AnimationConfig { preview?: boolean; scale: number; speed: number; }
interface NoiseConfig { opacity: number; scale: number; }
interface ShadowOverlayProps {
  type?: 'preset' | 'custom';
  presetIndex?: number;
  sizing?: 'fill' | 'stretch';
  color?: string;
  animation?: AnimationConfig;
  noise?: NoiseConfig;
  style?: CSSProperties;
  className?: string;
}

function mapRange(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
  if (fromLow === fromHigh) return toLow;
  return toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
}

const useInstanceId = (): string => {
  const id = useId();
  return `shadowoverlay-${id.replace(/:/g, "")}`;
};

export function EtheralShadow({ sizing = 'fill', color = 'rgba(128,128,128,1)', animation, noise, style, className }: ShadowOverlayProps) {
  const id = useInstanceId();
  const animationEnabled = animation && animation.scale > 0;
  const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
  const hueRotateMotionValue = useMotionValue(180);
  const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);

  const displacementScale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
  const animationDuration = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;

  useEffect(() => {
    if (feColorMatrixRef.current && animationEnabled) {
      if (hueRotateAnimation.current) hueRotateAnimation.current.stop();
      hueRotateMotionValue.set(0);
      hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
        duration: animationDuration / 25,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        onUpdate: (value: number) => {
          if (feColorMatrixRef.current) feColorMatrixRef.current.setAttribute("values", String(value));
        }
      });
      return () => { if (hueRotateAnimation.current) hueRotateAnimation.current.stop(); };
    }
  }, [animationEnabled, animationDuration, hueRotateMotionValue]);

  return (
    <div className={className} style={{ overflow: "hidden", position: "relative", width: "100%", height: "100%", ...style }}>
      <div style={{ position: "absolute", inset: -displacementScale, filter: animationEnabled ? `url(#${id}) blur(4px)` : "none" }}>
        {animationEnabled && (
          <svg style={{ position: "absolute" }}>
            <defs>
              <filter id={id}>
                <feTurbulence result="undulation" numOctaves={2}
                  baseFrequency={`${mapRange(animation!.scale,0,100,0.001,0.0005)},${mapRange(animation!.scale,0,100,0.004,0.002)}`}
                  seed="0" type="turbulence" />
                <feColorMatrix ref={feColorMatrixRef} in="undulation" type="hueRotate" values="180" />
                <feColorMatrix in="dist" result="circulation" type="matrix" values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0" />
                <feDisplacementMap in="SourceGraphic" in2="circulation" scale={displacementScale} result="dist" />
                <feDisplacementMap in="dist" in2="undulation" scale={displacementScale} result="output" />
              </filter>
            </defs>
          </svg>
        )}
        <div style={{
          backgroundColor: color,
          maskImage: `radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)`,
          maskSize: sizing === "stretch" ? "100% 100%" : "cover",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          width: "100%",
          height: "100%"
        }} />
      </div>
      {noise && noise.opacity > 0 && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: `${noise.scale * 200}px`,
          backgroundRepeat: "repeat",
          opacity: noise.opacity / 2
        }} />
      )}
    </div>
  );
}
