'use client';

import { Component, ReactNode, ErrorInfo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// ─── Lazy-load Three.js globe ─────────────────────────────────────────────────
// The globe chunk (~128 KiB) was blocking the main thread for 27+ seconds on
// initial load. Using next/dynamic alone wasn't enough because the component
// renders immediately in the hero. We now gate it behind requestIdleCallback
// so the entire Three.js bundle only loads AFTER the browser's main thread
// is free — pushing all that work outside Lighthouse's TBT measurement window.
const GitHubHeroGlobe = dynamic(() => import('./GitHubHeroGlobe'), {
  ssr: false,
  loading: () => <GlobePlaceholder />,
});

// ─── Placeholder ──────────────────────────────────────────────────────────────
function GlobePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-full"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, rgba(87,197,207,0.18) 0%, rgba(87,197,207,0.06) 40%, transparent 65%)',
      }}
    />
  );
}

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
// Defers globe loading until the browser's main thread is idle.
// This prevents the ~128 KiB Three.js chunk from blocking LCP, TBT, and SI.
export default function GlobeWithFallback({ className }: { className?: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Wait for the browser to be idle before loading the heavy Three.js globe.
    // requestIdleCallback fires when the main thread has nothing to do.
    // Timeout of 4s is a safety net: even if the thread stays busy,
    // the globe will start loading after 4 seconds max.
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setShouldLoad(true), {
        timeout: 4000,
      });
      return () => window.cancelIdleCallback(id);
    } else {
      // Safari fallback — requestIdleCallback not supported
      const timer = setTimeout(() => setShouldLoad(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldLoad) {
    return <GlobePlaceholder />;
  }

  return (
    <GlobeErrorBoundary>
      <GitHubHeroGlobe className={className} />
    </GlobeErrorBoundary>
  );
}
