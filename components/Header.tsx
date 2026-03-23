"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/#hero" },
    { label: "Why Us", href: "/#why" },
    { label: "Services", href: "/#services" },
    { label: "Departments", href: "/#departments" },
    { label: "About", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ];

  const isActiveBlog = pathname === "/blog" || pathname?.startsWith("/blog/");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl bg-[#0F1926]/85 border-b border-white/8 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-[1600px] px-6 lg:px-14 py-4 lg:py-5">
          <div className="flex items-center justify-between gap-8">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-[58px] h-[58px] transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Remote ACKtive Logo"
                  fill
                  sizes="58px"
                  priority
                  className="object-contain"
                />
              </div>
              <span
                className="font-bold text-xl lg:text-2xl text-white group-hover:text-[#57C5CF] transition-colors duration-200 whitespace-nowrap"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Remote ACKtive
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navLinks.map((link) => {
                const isBlogActive = link.href === "/blog" && isActiveBlog;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative font-bold text-[15px] px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors duration-200 group/nav
                      ${isBlogActive ? "text-[#57C5CF]" : "text-white/80 hover:text-white"}`}
                  >
                    {link.label}
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-1 left-3.5 right-3.5 h-px bg-[#57C5CF] rounded-full transition-all duration-200 origin-left
                        ${isBlogActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover/nav:scale-x-100 group-hover/nav:opacity-100"}`}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <Link
                href="/book-a-call"
                className="btn-grad rounded-full px-7 py-3 font-bold text-[15px] whitespace-nowrap transition-all duration-200 hover:shadow-[0_0_24px_rgba(11,135,147,0.55)]"
              >
                Book a Call
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl transition-colors hover:bg-white/10 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#57C5CF]"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu — full screen overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0F1926]/97 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <div
          className={`relative z-10 flex flex-col min-h-full px-6 pt-24 pb-12 transition-all duration-300 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          {/* Nav links */}
          <nav className="flex flex-col gap-1 mb-8" role="navigation" aria-label="Mobile navigation">
            {navLinks.map((link, i) => {
              const isBlogActive = link.href === "/blog" && isActiveBlog;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-bold text-xl py-4 px-4 rounded-xl transition-all duration-200 border border-transparent
                    ${
                      isBlogActive
                        ? "text-[#57C5CF] bg-[#57C5CF]/8 border-[#57C5CF]/20"
                        : "text-white/80 hover:text-white hover:bg-white/6 hover:border-white/10"
                    }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${i * 30}ms` : "0ms",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA button */}
          <div className="mt-auto">
            <Link
              href="/book-a-call"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-grad rounded-2xl px-8 py-4 font-bold text-lg text-center shadow-xl block w-full"
            >
              Book a Call
            </Link>
            <p className="text-white/30 text-xs text-center mt-4 font-medium">
              Free 30-min discovery call · No commitment
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
