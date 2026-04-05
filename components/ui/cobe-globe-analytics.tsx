"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

interface GlobeMarker {
  location: [number, number];
  size: number;
}

interface CobeGlobeProps {
  markers?: GlobeMarker[];
  className?: string;
  speed?: number;
  baseColor?: [number, number, number];
  glowColor?: [number, number, number];
  markerColor?: [number, number, number];
}

// 40 LATAM workers spread across countries
export const LATAM_WORKERS: GlobeMarker[] = [
  // Honduras — 5
  { location: [14.10, -87.21], size: 0.045 },
  { location: [14.08, -87.19], size: 0.04 },
  { location: [14.12, -87.23], size: 0.04 },
  { location: [14.06, -87.22], size: 0.035 },
  { location: [14.09, -87.17], size: 0.04 },

  // Colombia — 8
  { location: [4.71, -74.07], size: 0.045 },
  { location: [4.73, -74.05], size: 0.04 },
  { location: [4.69, -74.09], size: 0.04 },
  { location: [4.72, -74.10], size: 0.035 },
  { location: [6.23, -75.58], size: 0.04 },  // Medellín
  { location: [3.44, -76.52], size: 0.04 },  // Cali
  { location: [11.00, -74.80], size: 0.035 }, // Barranquilla
  { location: [4.65, -74.08], size: 0.035 },

  // Ecuador — 4
  { location: [-0.22, -78.51], size: 0.045 },
  { location: [-0.24, -78.53], size: 0.04 },
  { location: [-2.19, -79.89], size: 0.04 },  // Guayaquil
  { location: [-0.21, -78.50], size: 0.035 },

  // Chile — 4
  { location: [-33.46, -70.65], size: 0.045 },
  { location: [-33.48, -70.63], size: 0.04 },
  { location: [-33.44, -70.67], size: 0.04 },
  { location: [-36.82, -73.05], size: 0.035 }, // Concepción

  // Argentina — 6
  { location: [-34.60, -58.38], size: 0.045 },
  { location: [-34.62, -58.40], size: 0.04 },
  { location: [-34.58, -58.36], size: 0.04 },
  { location: [-31.42, -64.18], size: 0.035 }, // Córdoba
  { location: [-32.95, -60.66], size: 0.035 }, // Rosario
  { location: [-34.63, -58.42], size: 0.035 },

  // Mexico — 6
  { location: [19.43, -99.13], size: 0.045 },
  { location: [19.41, -99.15], size: 0.04 },
  { location: [20.67, -103.35], size: 0.04 }, // Guadalajara
  { location: [25.67, -100.31], size: 0.04 }, // Monterrey
  { location: [19.45, -99.11], size: 0.035 },
  { location: [21.16, -86.85], size: 0.035 }, // Cancún

  // Peru — 4
  { location: [-12.05, -77.04], size: 0.045 },
  { location: [-12.07, -77.06], size: 0.04 },
  { location: [-8.11, -79.03], size: 0.035 }, // Trujillo
  { location: [-12.03, -77.02], size: 0.035 },

  // Venezuela — 3
  { location: [10.48, -66.90], size: 0.04 },
  { location: [10.50, -66.92], size: 0.035 },
  { location: [10.07, -69.32], size: 0.035 }, // Barquisimeto
];

export function CobeGlobe({
  markers = LATAM_WORKERS,
  className = "",
  speed = 0.003,
  baseColor = [0.08, 0.09, 0.1],
  glowColor = [0.66, 0.91, 0.96],   // #a8e8f5 teal glow
  markerColor = [0.72, 0.99, 0.91], // #b8fce8 mint dots
}: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  }, []);

  const handlePointerUp = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  const handlePointerOut = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  const handleMouseMove = useCallback((e: React.PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      phiRef.current = delta / 200;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = -1.2; // start focused on Americas
    let globe: ReturnType<typeof createGlobe>;

    let rafId: number;

    const init = () => {
      const w = canvas.offsetWidth;
      if (!w) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: w,
        height: w,
        phi,
        theta: 0.25,
        dark: 1,
        diffuse: 1.4,
        mapSamples: 20000,
        mapBrightness: 5,
        baseColor,
        markerColor,
        glowColor,
        markers,
      });

      const animate = () => {
        if (pointerInteracting.current === null) phi += speed;
        globe.update({ phi: phi + phiRef.current, theta: 0.25 });
        rafId = requestAnimationFrame(animate);
      };
      animate();

      setTimeout(() => {
        if (canvas) canvas.style.opacity = "1";
      }, 100);
    };

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (globe) globe.destroy();
    };
  }, [markers, speed, baseColor, glowColor, markerColor]);

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerOut}
        onPointerMove={handleMouseMove}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
    </div>
  );
}
