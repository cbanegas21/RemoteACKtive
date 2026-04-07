"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const dropdownItems = {
  Services: [
    { label: "Remote Outsourcing", href: "/#services", desc: "We find and vet the talent — you hire." },
    { label: "Full Service Staffing", href: "/#services", desc: "End-to-end hiring, onboarding & management." },
  ],
  Departments: [
    { label: "Engineering & Dev", href: "/#departments" },
    { label: "Design & Creative", href: "/#departments" },
    { label: "Sales & Marketing", href: "/#departments" },
    { label: "Operations & Admin", href: "/#departments" },
    { label: "Finance & Legal", href: "/#departments" },
    { label: "Customer Support", href: "/#departments" },
  ],
  Company: [
    { label: "Why Us", href: "/#why" },
    { label: "About", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ],
};

type DropdownKey = keyof typeof dropdownItems;

function NavItem({
  label,
  href,
  active,
  setActive,
  isActiveBlog,
}: {
  label: string;
  href?: string;
  active: DropdownKey | null;
  setActive: (item: DropdownKey | null) => void;
  isActiveBlog?: boolean;
}) {
  const hasDropdown = label in dropdownItems;
  const isOpen = active === label;

  if (!hasDropdown) {
    return (
      <Link
        href={href!}
        className={`relative font-semibold text-[14px] px-3.5 py-2 rounded-full whitespace-nowrap transition-colors duration-200 group/nav
          ${isActiveBlog ? "text-[#a8e8f5]" : "text-white/75 hover:text-white"}`}
        onMouseEnter={() => setActive(null)}
      >
        {label}
        <span
          className={`absolute bottom-1 left-3.5 right-3.5 h-px bg-[#a8e8f5] rounded-full transition-all duration-200 origin-left
            ${isActiveBlog ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover/nav:scale-x-100 group-hover/nav:opacity-100"}`}
          aria-hidden="true"
        />
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setActive(label as DropdownKey)}
    >
      <button
        className={`flex items-center gap-1 font-semibold text-[14px] px-3.5 py-2 rounded-full whitespace-nowrap transition-colors duration-200
          ${isOpen ? "text-white" : "text-white/75 hover:text-white"}`}
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#a8e8f5]" : ""}`}
        />
      </button>

      {/* CSS-only dropdown — no framer-motion */}
      <div
        className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 pt-2 z-50 transition-all duration-150 ${
          isOpen
            ? "opacity-100 visible pointer-events-auto translate-y-0"
            : "opacity-0 invisible pointer-events-none translate-y-1"
        }`}
      >
        <div className="bg-[#04090f] rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
          <div className="p-2 min-w-[180px]">
            {(dropdownItems[label as DropdownKey] as { label: string; href: string; desc?: string }[]).map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setActive(null)}
                className="flex flex-col px-4 py-2.5 rounded-xl hover:bg-white/8 transition-colors group/item"
              >
                <span className="text-[13px] font-semibold text-white/85 group-hover/item:text-white transition-colors">
                  {item.label}
                </span>
                {item.desc && (
                  <span className="text-[11px] text-white/60 mt-0.5">{item.desc}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<DropdownKey | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActiveBlog = pathname === "/blog" || pathname?.startsWith("/blog/");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#04090f]/95 lg:backdrop-blur-xl border-b border-white/8 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-[1600px] px-6 lg:px-14 py-3 lg:py-4">
          <div className="flex items-center justify-between gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-[52px] h-[52px] transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Remote ACKtive Logo"
                  fill
                  sizes="52px"
                  priority
                  className="object-contain"
                />
              </div>
              <span
                className="font-bold text-xl lg:text-2xl text-white group-hover:text-[#a8e8f5] transition-colors duration-200 whitespace-nowrap"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Remote ACKtive
              </span>
            </Link>

            {/* Desktop floating pill nav */}
            <div
              ref={navRef}
              className="hidden lg:flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm"
              onMouseLeave={() => setActive(null)}
            >
              <NavItem label="Home" href="/#hero" active={active} setActive={setActive} />
              <NavItem label="Services" active={active} setActive={setActive} />
              <NavItem label="Departments" active={active} setActive={setActive} />
              <NavItem label="Company" active={active} setActive={setActive} />
              <NavItem label="Blog" href="/blog" active={active} setActive={setActive} isActiveBlog={isActiveBlog} />
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <Link
                href="/book-a-call"
                className="rounded-full px-7 py-3 font-bold text-[15px] whitespace-nowrap text-[#04090f] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_28px_rgba(184,252,232,0.35)]"
                style={{ background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 60%, #b8fce8 100%)" }}
              >
                Book a Call
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl transition-colors hover:bg-white/10 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a8e8f5]"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="absolute inset-0 bg-[#04090f]/98" onClick={() => setIsMobileMenuOpen(false)} />

        <div className={`relative z-10 flex flex-col min-h-full px-6 pt-24 pb-12 transition-all duration-300 ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"}`}>
          <nav className="flex flex-col gap-1 mb-8">
            <Link href="/#hero" onClick={() => setIsMobileMenuOpen(false)}
              className="font-semibold text-xl py-4 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/6 transition-all">
              Home
            </Link>

            {(Object.keys(dropdownItems) as DropdownKey[]).map((section) => (
              <div key={section}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === section ? null : section)}
                  className="w-full flex items-center justify-between font-semibold text-xl py-4 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/6 transition-all"
                >
                  {section}
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileExpanded === section ? "rotate-180 text-[#a8e8f5]" : ""}`} />
                </button>
                {/* CSS grid accordion — no framer-motion */}
                <div className={`grid transition-all duration-200 ease-in-out pl-4 ${
                  mobileExpanded === section ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}>
                  <div className="min-h-0 overflow-hidden">
                    {(dropdownItems[section] as { label: string; href: string }[]).map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 px-4 text-base text-white/60 hover:text-[#a8e8f5] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-auto">
            <Link
              href="/book-a-call"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-2xl px-8 py-4 font-bold text-lg text-center block w-full text-[#04090f]"
              style={{ background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 60%, #b8fce8 100%)" }}
            >
              Book a Call
            </Link>
            <p className="text-white/50 text-xs text-center mt-4 font-medium">
              Free 30-min discovery call · No commitment
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
