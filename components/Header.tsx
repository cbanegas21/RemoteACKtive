"use client";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/app/providers";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  // Determine if header should use light colors (white text)
  const useLightColors = !isScrolled || theme === "dark";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "dark"
            ? "bg-ink/80 backdrop-blur-md border-b border-white/10"
            : "bg-white/80 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="flex items-center gap-2 group">
            <div className="relative w-10 h-10">
              <Image src={useLightColors ? "/images/logowhite.png" : "/images/logo.png"} alt="Remote ACKtive Logo" fill className="object-contain" />
            </div>
            <span className={`font-bold text-lg transition ${useLightColors ? "text-white group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-600"}`}>Remote ACKtive</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`font-medium transition ${useLightColors ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>{link.label}</a>
            ))}
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition ${useLightColors ? "hover:bg-white/10 text-white" : "hover:bg-gray-100 text-gray-900"}`} aria-label="Toggle theme">{theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition">Start hiring</a>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition ${useLightColors ? "hover:bg-white/10 text-white" : "hover:bg-gray-100 text-gray-900"}`} aria-label="Toggle theme">{theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 rounded-lg transition ${useLightColors ? "hover:bg-white/10 text-white" : "hover:bg-gray-100 text-gray-900"}`} aria-label="Toggle menu">{isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className={`md:hidden mt-4 py-4 border-t ${useLightColors ? "border-white/10" : "border-gray-200"}`}>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`font-medium transition px-2 py-1 ${useLightColors ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>{link.label}</a>
              ))}
              <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition text-center">Start hiring</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}