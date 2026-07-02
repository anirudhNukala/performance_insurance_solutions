"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-navy-900 transition-shadow duration-200 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <button onClick={() => scrollTo("#home")} className="text-left">
            <span className="text-white font-semibold text-base leading-tight block">
              JSR Insurance Services
            </span>
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">
              LLC
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-slate-300 hover:text-white text-sm px-4 py-2 rounded transition-colors duration-150"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="ml-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold text-sm px-5 py-2 rounded transition-colors duration-150"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle navigation"
          >
            <div className="w-5 space-y-1.5">
              <span className={`block h-0.5 bg-white transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-200 ${menuOpen ? "max-h-64 pb-4" : "max-h-0"}`}>
          <div className="border-t border-navy-700 pt-3 space-y-1">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="block w-full text-left text-slate-300 hover:text-white text-sm px-3 py-2.5 rounded transition-colors duration-150"
              >
                {l.label}
              </button>
            ))}
            <div className="pt-2 px-3">
              <button
                onClick={() => scrollTo("#contact")}
                className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold text-sm px-5 py-2.5 rounded transition-colors duration-150"
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
