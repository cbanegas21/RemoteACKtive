'use client';

import { Component, ReactNode, ErrorInfo } from 'react';
import dynamic from 'next/dynamic';

// ─── Lazy-load Three.js globe ─────────────────────────────────────────────────
// The globe chunk (~146 KiB) was blocking the main thread for 27+ seconds on
// initial load. Dynamically importing it with ssr:false defers the entire
// Three.js bundle until after the critical render path completes.
const GitHubHeroGlobe = dynamic(() => import('./GitHubHeroGlobe'), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-full animate-pulse"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, rgba(87,197,207,0.18) 0%, rgba(87,197,207,0.06) 40%, transparent 65%)',
      }}
    />
  ),
});

// ─── Error Boundary ───────────────────────────────────────────────────────────
// Catches WebGL / Three.js crashes so the rest of the hero never breaks.
// Falls back to a soft teal glow that preserves the visual feel.
interface EBState { hasError: boolean }

class GlobeErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): EBState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    // Log so devs can see it; don't surface to the user
    console.warn('[Globe] WebGL initialization failed:', error.message);
  }

  render() {
    if (this.state.hasError) {
      // Graceful fallback — keeps the teal radial glow visible
      return (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(87,197,207,0.20) 0%, rgba(87,197,207,0.08) 35%, transparent 65%)',
          }}
        />
      );
    }
    return this.props.children;
  }
}

// ─── Public wrapper ───────────────────────────────────────────────────────────
// Drop-in replacement for <GitHubHeroGlobe /> everywhere.
export default function GlobeWithFallback({ className }: { className?: string }) {
  return (
    <GlobeErrorBoundary>
      <GitHubHeroGlobe className={className} />
    </GlobeErrorBoundary>
  );
}
