"use client";

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
    { href: "#process", label: "프로세스" },
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
      setIsHeroSection(scrollTop < window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMenu = () => {
    setMobileMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  /* 라이트 hero 배경이므로 항상 어두운 바 색상 */
  const barColor = "bg-gray-700";

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100/30 z-50 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 transition-all duration-300"
          style={{ width: `${scrollProgress}%`, boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)" }}
        />
      </div>

      {/* Navigation — hero는 이제 라이트 배경이므로 dark overlay 제거 */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-500 ${
          mobileMenuOpen
            ? "bg-white shadow-lg"
            : scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-md"
            : "bg-white/60 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">

            {/* Logo — 아이콘 박스 제거, 텍스트만 */}
            <a href="#home" className="flex flex-col leading-tight transition-all duration-300 group">
              <span className="text-xs font-bold tracking-widest text-yellow-700 opacity-70 group-hover:opacity-100 transition-opacity">SINWOO INC.</span>
              <span className="text-base font-bold text-yellow-800 group-hover:text-yellow-700 transition-colors">신우아이앤씨</span>
            </a>

            {/* Desktop Menu — 항상 다크 텍스트 (라이트 배경) */}
            <div className="hidden md:flex items-center gap-10 text-gray-700">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold transition-all duration-300 relative group hover:text-yellow-700"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-600 to-yellow-500 transition-all duration-300 w-0 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-bold rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all text-sm shadow-md hover:shadow-lg duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">문의하기</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300" />
            </a>

            {/* Hamburger Button */}
            <button
              onClick={mobileMenuOpen ? closeMenu : openMenu}
              className="md:hidden flex flex-col gap-1.5 p-3 -mr-2 transition-opacity hover:opacity-70"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className={`w-6 h-1.5 rounded-full transition-all duration-400 ${barColor} ${
                mobileMenuOpen ? "rotate-45 translate-y-3" : ""
              }`} />
              <div className={`w-6 h-1.5 rounded-full transition-all duration-400 ${barColor} ${
                mobileMenuOpen ? "scale-0" : "scale-100"
              }`} />
              <div className={`w-6 h-1.5 rounded-full transition-all duration-400 ${barColor} ${
                mobileMenuOpen ? "-rotate-45 -translate-y-3" : ""
              }`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile: Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile: Slide-from-right panel (always in DOM for smooth animation) */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 md:hidden shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-yellow-100">
          <div className="flex flex-col leading-tight">
            <p className="text-xs font-bold text-yellow-700 tracking-widest">SINWOO INC.</p>
            <p className="text-sm font-bold text-yellow-900">신우아이앤씨</p>
          </div>
          <button
            onClick={closeMenu}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-yellow-100 transition-colors text-gray-500 hover:text-yellow-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items with staggered animation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto space-y-1">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-4 rounded-xl text-base font-semibold text-gray-700 hover:bg-amber-50 hover:text-yellow-800 transition-all duration-200 group transform ${
                mobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-6 opacity-0"
              }`}
              style={{
                transitionDelay: mobileMenuOpen ? `${120 + index * 50}ms` : "0ms",
                transition: "background-color 0.2s, color 0.2s, transform 0.35s ease-out, opacity 0.35s ease-out",
              }}
              onClick={closeMenu}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* CTA at bottom */}
        <div
          className={`px-4 pb-8 pt-4 border-t border-gray-100 transition-all duration-300 ${
            mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: mobileMenuOpen ? `${120 + navItems.length * 50}ms` : "0ms" }}
        >
          <a
            href="#contact"
            className="block w-full py-4 px-6 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-bold text-center rounded-xl hover:from-yellow-700 hover:to-yellow-800 transition-all shadow-md hover:shadow-lg text-sm"
            onClick={closeMenu}
          >
            지금 문의하기 →
          </a>
          <p className="text-center text-xs text-gray-400 mt-4">프리미엄 부동산 개발·분양대행</p>
        </div>
      </div>
    </>
  );
}
