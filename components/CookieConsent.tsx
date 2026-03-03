'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateGtagConsent = (granted: boolean) => {
    if (typeof window !== 'undefined' && typeof (window as Window & { gtag?: Function }).gtag === 'function') {
      (window as Window & { gtag?: Function }).gtag!('consent', 'update', {
        ad_storage: granted ? 'granted' : 'denied',
        analytics_storage: granted ? 'granted' : 'denied',
        functionality_storage: granted ? 'granted' : 'denied',
        personalization_storage: granted ? 'granted' : 'denied',
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    updateGtagConsent(true);
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    updateGtagConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      {/* Backdrop blur edge */}
      <div className="bg-[#0D1A2D]/95 backdrop-blur-sm border-t border-[#57C5CF]/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">

          {/* Cookie icon + text */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">🍪</span>
            <div>
              <p className="text-white text-sm font-semibold mb-1">
                We use cookies to improve your experience
              </p>
              <p className="text-white/55 text-xs leading-relaxed">
                We use analytics cookies to understand how visitors use our site, and marketing cookies
                for retargeting. You can accept all cookies or decline non-essential ones.{' '}
                <Link
                  href="/privacy-policy"
                  className="text-[#57C5CF] hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white border border-white/15 hover:border-white/30 rounded-lg transition-all duration-200"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold text-[#0A1628] bg-[#4FFFB0] hover:bg-[#3de89e] rounded-lg transition-all duration-200 shadow-lg shadow-[#4FFFB0]/20"
            >
              Accept All
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
