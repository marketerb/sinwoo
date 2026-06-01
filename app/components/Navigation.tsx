"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isHeroSection, setIsHeroSection] = useState(true);

  const navItems = [
    { href: "#home", label: "홈" },
    { href: "#about", label: "회사소개" },
    { href: "#business", label: "사업영역" },
    { href: "#portfolio", label: "포트폴리오" },
    { href: "#contact", label: "문의하기" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
      setScrolled(scrollTop > 50);
      // Check if still in HERO section (first viewport)
      setIsHeroSection(scrollTop < window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar - Premium */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100/30 z-50 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 transition-all duration-300 shadow-lg"
          style={{ width: `${scrollProgress}%`, boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}
        ></div>
      </div>

      {/* Navigation - Premium Design */}
      <nav
        className={`sticky top-1 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-yellow-100/50 shadow-xl"
            : isHeroSection
            ? "bg-gradient-to-b from-black/40 to-transparent backdrop-blur-md"
            : "bg-white/95 backdrop-blur-xl shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo - Premium Design */}
            <a
              href="#home"
              className={`flex items-center gap-2 transition-all duration-300 group ${
                scrolled
                  ? "text-yellow-700 hover:text-yellow-800"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {/* Logo Icon */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                scrolled
                  ? "bg-yellow-100/80"
                  : "bg-white/10 group-hover:bg-white/20"
              }`}>
                <span className="text-lg font-bold bg-gradient-to-br from-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  🏢
                </span>
              </div>
              {/* Logo Text */}
              <div className="flex flex-col leading-tight">
                <span className={`text-sm font-bold tracking-widest opacity-90 ${
                  scrolled ? "text-yellow-700" : "text-yellow-200"
                }`}>
                  SINWOO
                </span>
                <span className={`text-xl font-bold transition-all ${
                  scrolled
                    ? "text-yellow-700"
                    : "text-white drop-shadow-lg"
                }`}>
                  신우아이앤씨
                </span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div
              className={`hidden md:flex items-center gap-10 ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold transition-all duration-300 relative group px-1 py-2 ${
                    scrolled
                      ? "text-gray-700 hover:text-yellow-700"
                      : "text-white/95 hover:text-yellow-200"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                  {/* Underline Animation */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 transition-all duration-500 ease-out ${
                      scrolled ? "bg-yellow-600" : "bg-yellow-300"
                    } w-0 group-hover:w-full`}
                  ></span>
                  {/* Hover background */}
                  <span
                    className={`absolute inset-0 rounded-md transition-all duration-300 -z-10 ${
                      scrolled
                        ? "bg-yellow-50 opacity-0 group-hover:opacity-100"
                        : "bg-white/5 opacity-0 group-hover:opacity-100"
                    }`}
                  ></span>
                </a>
              ))}
            </div>

            {/* CTA Button - Premium Style */}
            <a
              href="#contact"
              className={`hidden md:block relative px-8 py-3 font-bold rounded-xl transition-all duration-300 text-sm shadow-lg hover:shadow-xl overflow-hidden group ${
                scrolled
                  ? "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:from-yellow-700 hover:to-yellow-800"
                  : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 shadow-yellow-600/40"
              }`}
            >
              {/* Shimmer effect on hover */}
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                문의하기
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (!mobileMenuOpen) {
                  document.body.style.overflow = 'hidden';
                } else {
                  document.body.style.overflow = 'auto';
                }
              }}
              className={`md:hidden flex flex-col gap-1.5 p-3 -mr-2 hover:opacity-80 transition-all rounded-lg ${
                scrolled || isHeroSection
                  ? scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                  : "hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <div
                className={`w-6 h-1 transition-all duration-500 rounded-full ${
                  scrolled ? "bg-gray-800" : "bg-white"
                } ${
                  mobileMenuOpen ? "rotate-45 translate-y-3.5" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-1 transition-all duration-500 rounded-full ${
                  scrolled ? "bg-gray-800" : "bg-white"
                } ${mobileMenuOpen ? "scale-0" : "scale-100"}`}
              ></div>
              <div
                className={`w-6 h-1 transition-all duration-500 rounded-full ${
                  scrolled ? "bg-gray-800" : "bg-white"
                } ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-3.5" : ""
                }`}
              ></div>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              className={`md:hidden mt-4 pb-6 space-y-3 border-t transition-all backdrop-blur-sm ${
                scrolled
                  ? "border-gray-200 bg-white/98"
                  : "border-white/30 bg-white"
              } pt-6`}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block py-3 px-4 text-sm font-semibold transition-all rounded-lg relative overflow-hidden group ${
                    scrolled
                      ? "text-gray-800 hover:text-yellow-700 hover:bg-yellow-50"
                      : "text-gray-800 hover:text-yellow-700 hover:bg-yellow-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-yellow-600 transition-all duration-500 w-0 group-hover:w-full`}></span>
                </a>
              ))}
              <a
                href="#contact"
                className="block py-3 px-4 mt-2 pt-4 border-t border-gray-200 text-sm font-bold text-center text-white bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all shadow-lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.body.style.overflow = 'auto';
                }}
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
