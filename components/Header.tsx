"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

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
    { label: "Home", href: "#hero" },
    { label: "Why Us", href: "#why" },
    { label: "Services", href: "#services" },
    { label: "Departments", href: "#departments" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Use light colors when not scrolled (over hero gradient)
  const useLightColors = !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background-dark/95 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="flex items-center gap-3 group">
            <div className="relative w-20 h-20">
              <Image src="/images/logo.png" alt="Remote ACKtive Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-2xl transition text-white group-hover:text-primary-teal">Remote ACKtive</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="font-medium transition text-white/90 hover:text-white">{link.label}</a>
            ))}
            <a href="/book-a-call" className="px-6 py-2.5 rounded-full bg-primary-teal text-black font-bold hover:bg-primary-cyan hover:text-black transition shadow-md hover:shadow-lg">Book a Call</a>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg transition hover:bg-white/10 text-white" aria-label="Toggle menu">{isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="font-medium transition px-2 py-1 text-white/90 hover:text-white">{link.label}</a>
              ))}
              <a href="/book-a-call" className="px-6 py-2.5 rounded-full bg-primary-teal text-black font-bold hover:bg-primary-cyan hover:text-black transition text-center shadow-md">Book a Call</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}