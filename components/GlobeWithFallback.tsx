'use client';

import { Component, ReactNode, ErrorInfo } from 'react';
import GitHubHeroGlobe from './GitHubHeroGlobe';

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
