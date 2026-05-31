"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { href: "#home", label: "HOME" },
    { href: "#about", label: "COMPANY" },
    { href: "#business", label: "BUSINESS" },
    { href: "#portfolio", label: "PORTFOLIO" },
    { href: "#contact", label: "CONTACT" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
      setScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Navigation */}
      <nav
        className={`sticky top-1 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a
              href="#home"
              className={`text-2xl font-bold transition-all ${
                scrolled
                  ? "text-purple-600"
                  : "text-white drop-shadow-lg"
              }`}
            >
              CND
            </a>

            {/* Desktop Menu */}
            <div
              className={`hidden md:flex items-center gap-12 ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-bold transition-colors duration-300 hover:text-purple-600 relative group ${
                    scrolled
                      ? "hover:text-purple-600"
                      : "hover:text-purple-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 w-0 group-hover:w-full`}
                  ></span>
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="hidden md:block px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all text-sm"
            >
              문의하기
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5"
              aria-label="Toggle menu"
            >
              <div
                className={`w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? "bg-gray-800" : "bg-white"
                } ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? "bg-gray-800" : "bg-white"
                } ${mobileMenuOpen ? "opacity-0" : ""}`}
              ></div>
              <div
                className={`w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? "bg-gray-800" : "bg-white"
                } ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></div>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              className={`md:hidden mt-6 pb-4 space-y-2 border-t transition-all ${
                scrolled
                  ? "border-gray-200 bg-white"
                  : "border-white/30 bg-white/10"
              } pt-4`}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block py-3 px-2 text-sm font-bold transition-colors rounded-lg ${
                    scrolled
                      ? "text-gray-800 hover:text-purple-600 hover:bg-purple-50"
                      : "text-white hover:text-purple-300 hover:bg-white/10"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="block py-3 px-2 mt-4 pt-4 border-t text-sm font-bold text-center text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                문의하기
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
