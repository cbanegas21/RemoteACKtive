"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/#hero" },
    { label: "Why Us", href: "/#why" },
    { label: "Services", href: "/#services" },
    { label: "Departments", href: "/#departments" },
    { label: "About", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background-dark/95 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1600px] px-6 lg:px-16 py-6">
        <div className="flex items-center justify-between gap-10">
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-[55px] h-[55px]">
              <Image src="/images/logo.png" alt="Remote ACKtive Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-xl transition text-white group-hover:text-primary-teal whitespace-nowrap">Remote ACKtive</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-[17px] transition text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link href="/book-a-call" className="px-7 py-3 rounded-full bg-[#4FFFB0] text-black font-bold text-[16px] hover:bg-[#3EE89F] hover:text-black transition shadow-md hover:shadow-lg whitespace-nowrap">
              Book a Call
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg transition hover:bg-white/10 text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-white/10 bg-[#0F1926] rounded-lg">
            <div className="flex flex-col gap-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium transition px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/book-a-call" className="px-6 py-2.5 rounded-full bg-[#4FFFB0] text-black font-bold hover:bg-[#3EE89F] hover:text-black transition text-center shadow-md">
                Book a Call
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}