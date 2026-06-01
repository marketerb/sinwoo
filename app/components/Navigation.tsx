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
              className={`flex items-center gap-3 transition-all duration-300 group font-semibold`}
            >
              {/* Logo Icon */}
              <div className={`flex items-center justify-center w-11 h-11 rounded-lg transition-all duration-300 ${
                scrolled
                  ? "bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-md"
                  : "bg-white/15 group-hover:bg-white/25 backdrop-blur-sm"
              }`}>
                <span className="text-xl font-bold">🏢</span>
              </div>
              {/* Logo Text */}
              <div className="flex flex-col leading-tight hidden sm:block">
                <span className={`text-xs font-bold tracking-widest opacity-80 transition-all ${
                  scrolled ? "text-yellow-700" : "text-yellow-200"
                }`}>
                  SINWOO INC.
                </span>
                <span className={`text-lg font-bold transition-all ${
                  scrolled
                    ? "text-yellow-800"
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
                  className={`text-sm font-semibold transition-all duration-300 hover:text-yellow-600 relative group ${
                    scrolled
                      ? "hover:text-yellow-700"
                      : "hover:text-yellow-200"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-600 to-yellow-500 transition-all duration-300 w-0 group-hover:w-full`}
                  ></span>
                </a>
              ))}
            </div>

            {/* CTA Button - Premium */}
            <a
              href="#contact"
              className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-bold rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all text-sm shadow-md hover:shadow-lg duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">문의하기</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300"></div>
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
              className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 hover:opacity-80 transition-opacity"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <div
                className={`w-6 h-1.5 transition-all duration-500 ${
                  scrolled ? "bg-gray-800" : "bg-white"
                } ${
                  mobileMenuOpen ? "rotate-45 translate-y-3.5" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-1.5 transition-all duration-500 ${
                  scrolled ? "bg-gray-800" : "bg-white"
                } ${mobileMenuOpen ? "scale-0" : "scale-100"}`}
              ></div>
              <div
                className={`w-6 h-1.5 transition-all duration-500 ${
                  scrolled ? "bg-gray-800" : "bg-white"
                } ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-3.5" : ""
                }`}
              ></div>
            </button>
          </div>

          {/* Mobile Menu - Full Screen Premium */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-30 md:hidden"
              onClick={() => {
                setMobileMenuOpen(false);
                document.body.style.overflow = 'auto';
              }}
            />
          )}

          {mobileMenuOpen && (
            <div className="fixed inset-0 z-35 md:hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-y-auto">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-600 opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-yellow-500 opacity-5 rounded-full blur-3xl"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 py-12">
                {/* Logo at Top */}
                <div className="absolute top-6 left-6">
                  <a
                    href="#home"
                    className="flex items-center gap-2 text-2xl font-bold text-yellow-500 drop-shadow-lg"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      document.body.style.overflow = 'auto';
                    }}
                  >
                    <span>🏢</span>
                    <span>SINWOO</span>
                  </a>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.body.style.overflow = 'auto';
                  }}
                  className="absolute top-6 right-6 text-white hover:text-yellow-400 transition-colors p-2"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Menu Items - Large and Centered */}
                <div className="text-center space-y-8 max-w-2xl">
                  {navItems.map((item, index) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`block text-5xl font-bold text-white hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 relative group ${
                        mobileMenuOpen
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: mobileMenuOpen ? `${index * 100}ms` : '0ms',
                      }}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        document.body.style.overflow = 'auto';
                      }}
                    >
                      {item.label}
                      <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 group-hover:w-24 transition-all duration-300"></span>
                    </a>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-16">
                  <a
                    href="#contact"
                    className={`inline-block px-12 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold text-lg rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                      mobileMenuOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: mobileMenuOpen ? `${navItems.length * 100}ms` : '0ms',
                    }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      document.body.style.overflow = 'auto';
                    }}
                  >
                    지금 문의하기
                  </a>
                </div>

                {/* Bottom Info */}
                <div
                  className={`absolute bottom-8 text-center text-gray-400 text-sm space-y-2 ${
                    mobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${(navItems.length + 1) * 100}ms` : '0ms',
                  }}
                >
                  <p>프리미엄 부동산 개발·분양대행</p>
                  <p>신우아이앤씨</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
