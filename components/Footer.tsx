"use client";
import Image from "next/image";
import { Mail, Phone, Linkedin, CalendarCheck, Facebook, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us",    href: "/#about" },
      { label: "Our Services", href: "/#services" },
      { label: "Departments", href: "/#departments" },
      { label: "Blog",        href: "/blog" },
      { label: "FAQ",         href: "/#faq" },
    ],
    resources: [
      { label: "Book a Call",     href: "/book-a-call" },
      { label: "Why Choose Us",   href: "/#why" },
      { label: "Contact",         href: "/#contact" },
      { label: "Privacy Policy",  href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  };

  const socialLinks = [
    {
      href: "https://www.linkedin.com/company/108573561/",
      label: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      href: "https://www.facebook.com/profile.php?id=61575144124346",
      label: "Facebook",
      icon: <Facebook className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="bg-[#060F1E] text-white border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 py-14">

        {/* Top grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="relative w-9 h-9">
                <Image
                  src="/images/logowhite.png"
                  alt="Remote ACKtive Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Remote ACKtive
              </span>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-xs">
              Your gateway to the top 5% of global talent. We vet, place, and
              support elite remote professionals so you can scale faster for
              less.
            </p>

            {/* Address */}
            <div className="flex items-center gap-2 text-white/60 text-xs mb-6">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#57C5CF]/60" />
              <span>1621 Central Ave, Cheyenne, WY 82001</span>
            </div>

            {/* CTA button */}
            <a
              href="/book-a-call"
              className="inline-flex items-center gap-2 btn-gradient text-[#060F1E] text-sm font-bold px-5 py-2.5 rounded-full"
            >
              <CalendarCheck className="w-4 h-4" />
              Book a Free Call
            </a>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/8 text-white/60 hover:bg-[#57C5CF]/20 hover:text-[#57C5CF] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact bar */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap gap-6">
            <a
              href="mailto:admin@remoteacktive.com"
              className="flex items-center gap-2 text-white/55 text-sm hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-[#57C5CF]" />
              admin@remoteacktive.com
            </a>
            <a
              href="tel:+14152511945"
              className="flex items-center gap-2 text-white/55 text-sm hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-[#57C5CF]" />
              +1 (415) 251-1945
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/60">
          <p>© {currentYear} Remote ACKtive. All rights reserved.</p>
          <p className="text-white/50">
            Built for businesses that think globally.
          </p>
        </div>

      </div>
    </footer>
  );
}
