"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Facebook } from "lucide-react";
const SERVICES_LINKS = [
  { label: "Remote Outsourcing",    href: "/#services" },
  { label: "Full Service Staffing", href: "/#services" },
  { label: "Book a Call",           href: "/book-a-call" },
];

const COMPANY_LINKS = [
  { label: "Our Story",    href: "/#about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Blog",         href: "/blog" },
  { label: "FAQ",          href: "/#faq" },
];

const SOCIAL_LINKS = [
  {
    href:  "https://www.linkedin.com/company/108573561/",
    label: "LinkedIn",
    icon:  <Linkedin className="w-4 h-4" />,
  },
  {
    href:  "https://www.facebook.com/profile.php?id=61575144124346",
    label: "Facebook",
    icon:  <Facebook className="w-4 h-4" />,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#04090f" }} className="text-white">
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-14">

        {/* ── 4-column grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mb-12">

          {/* Col 1 — Brand (wider on lg) */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image
                src="/images/logowhite.png"
                alt="Remote ACKtive Logo"
                width={120}
                height={32}
                className="object-contain"
              />
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-[220px]">
              Your gateway to the top 5% of global talent — vetted, placed, and
              supported so you can scale faster for less.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#a8e8f5]/10 hover:border-[#a8e8f5]/30 hover:text-[#a8e8f5] transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Copyright below social on col-1 (hidden on desktop — shown in bottom bar) */}
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-[#a8e8f5] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-[#a8e8f5] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:admin@remoteacktive.com"
                  className="flex items-start gap-2.5 text-white/50 text-sm hover:text-[#a8e8f5] transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#a8e8f5]/60 group-hover:text-[#a8e8f5] transition-colors" />
                  admin@remoteacktive.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+14152511945"
                  className="flex items-start gap-2.5 text-white/50 text-sm hover:text-[#a8e8f5] transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#a8e8f5]/60 group-hover:text-[#a8e8f5] transition-colors" />
                  +1 (415) 251-1945
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-white/50 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#a8e8f5]/60" />
                  <span>1621 Central Ave,<br />Cheyenne, WY 82001</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/50 text-xs">
            © {year} Remote ACKtive. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="text-white/50 text-xs hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/50 text-xs hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
