"use client";
import Image from "next/image";
import { Mail, Phone, Linkedin, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "#about" },
      { label: "Our Services", href: "#services" },
      { label: "Departments", href: "#departments" },
      { label: "FAQ", href: "#faq" },
    ],
    resources: [
      { label: "Contact", href: "#contact" },
      { label: "Why Us", href: "#why" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  return (
    <footer className="bg-gradient-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logowhite.png"
                  alt="Remote ACKtive Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-lg">
                Remote ACKtive
              </span>
            </div>
            <p className="text-white/80 mb-4 max-w-sm">
              Your gateway to the best global talent. We recruit and operate top
              professionals so you can focus on growth.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition
                  bg-white/20 text-white hover:bg-white hover:text-primary-teal"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition
                  bg-white/20 text-white hover:bg-white hover:text-primary-teal"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition
                  bg-white/20 text-white hover:bg-white hover:text-primary-teal"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="flex flex-wrap gap-6">
            <a
              href="mailto:admin@remoteacktive.com"
              className="flex items-center gap-2 text-white/80 hover:text-white transition"
            >
              <Mail className="w-5 h-5" />
              <span>admin@remoteacktive.com</span>
            </a>
            <a
              href="tel:+14152511945"
              className="flex items-center gap-2 text-white/80 hover:text-white transition"
            >
              <Phone className="w-5 h-5" />
              <span>+1(415)2511945</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
          <p>
            © {currentYear} Remote ACKtive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}