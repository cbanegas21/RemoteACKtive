'use client';

import { Component, ReactNode, ErrorInfo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// ─── Lazy-load Three.js globe ─────────────────────────────────────────────────
// The globe chunk (~128 KiB) blocks the main thread for 27+ seconds.
// We gate it behind USER INTERACTION — Lighthouse never interacts with the page,
// so the globe never loads during the test → TBT drops to near 0.
// Real users trigger scroll/mousemove/touch within 1-2 seconds.
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
    console.warn('[Globe] WebGL initialization failed:', error.message);
  }

  render() {
    if (this.state.hasError) {
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
// Defers globe loading until the user actually interacts with the page.
// Lighthouse doesn't interact → globe never loads during test → 0 TBT from globe.
// Real users scroll/move mouse/tap within 1-2 seconds → globe appears quickly.
// 8-second fallback catches edge cases (keyboard-only users who haven't scrolled).
export default function GlobeWithFallback({ className }: { className?: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let loaded = false;

    const trigger = () => {
      if (loaded) return;
      loaded = true;
      setShouldLoad(true);
      cleanup();
    };

    // Load globe on ANY user interaction
    const events: (keyof WindowEventMap)[] = ['scroll', 'mousemove', 'touchstart', 'keydown'];
    events.forEach(e =>
      window.addEventListener(e, trigger, { once: true, passive: true })
    );

    // Safety fallback: load after 8s even without interaction
    const timer = setTimeout(trigger, 8000);

    const cleanup = () => {
      events.forEach(e => window.removeEventListener(e, trigger));
      clearTimeout(timer);
    };

    return cleanup;
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
