"use client";

import { useState, useEffect } from "react";
import { COMPANY_PROFILE_PDF, COMPANY_PROFILE_FILENAME } from "../config";

const CREAM = "#F5F5F5";
const DARK  = "#111111";
const GOLD  = "#b8935a";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress]  = useState(0);

  const navItems = [
    { href: "#home",      label: "홈" },
    { href: "#about",     label: "회사소개" },
    { href: "#business",  label: "사업영역" },
    { href: "#process",   label: "프로세스" },
    { href: "#portfolio", label: "포트폴리오" },
    { href: "#contact",   label: "문의하기" },
  ];

  useEffect(() => {
    const fn = () => {
      const t = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (t / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const openMenu  = () => { setMobileMenuOpen(true);  document.body.style.overflow = "hidden"; };
  const closeMenu = () => { setMobileMenuOpen(false); document.body.style.overflow = "auto";   };

  return (
    <>
      {/* ── Scroll Progress ── */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ height: "2px" }}>
        <div style={{
          width: `${scrollProgress}%`, height: "100%",
          background: DARK,
          transition: "width .3s",
        }} />
      </div>

      {/* ── Floating Pill Navigation ── */}
      <nav style={{
        position: "fixed", top: "20px",
        left: "50%", transform: "translateX(-50%)",
        zIndex: 40,
        width: "calc(100% - 32px)", maxWidth: "1280px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderRadius: "999px",
        boxShadow: "rgba(0,0,0,0.05) 0px 4px 24px, rgba(0,0,0,0.02) 0px 1px 4px",
        border: "1px solid rgba(0,0,0,0.06)",
        padding: "10px 10px 10px 28px",
        gap: "16px",
      }}>
        {/* Logo */}
        <a href="#home" style={{ flexShrink: 0, textDecoration: "none", display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
          <span style={{ fontSize: ".58rem", fontWeight: 800, letterSpacing: "3px", color: GOLD, opacity: .85, textTransform: "uppercase" }}>SINWOO INC.</span>
          <span style={{ fontSize: ".88rem", fontWeight: 700, color: DARK, letterSpacing: "-0.02em" }}>신우아이앤씨</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center" style={{ flex: 1, justifyContent: "center", gap: "clamp(20px,3vw,40px)" }}>
          {navItems.map(item => (
            <a key={item.href} href={item.href}
              style={{ fontSize: ".82rem", fontWeight: 500, color: "#262627", textDecoration: "none", letterSpacing: "-0.01em", transition: "color .2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = DARK}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#262627"}
            >{item.label}</a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {/* 지명원 PDF — 파일이 등록된 경우에만 노출 */}
          {COMPANY_PROFILE_PDF && (
            <a href={COMPANY_PROFILE_PDF} download={COMPANY_PROFILE_FILENAME}
              className="hidden md:inline-flex"
              style={{ fontSize: ".8rem", fontWeight: 500, color: "#262627", padding: "9px 14px", whiteSpace: "nowrap", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = GOLD}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#262627"}
            >지명원 ↓</a>
          )}
          {/* Ink-Black Pill CTA */}
          <a href="#contact"
            className="hidden md:inline-flex"
            style={{
              background: DARK, color: CREAM,
              borderRadius: "999px", padding: "9px 24px",
              fontSize: ".82rem", fontWeight: 600, letterSpacing: "-0.02em",
              textDecoration: "none", transition: "background .2s",
              border: `1.5px solid ${DARK}`, whiteSpace: "nowrap",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#2e2e36"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = DARK}
          >문의하기</a>

          {/* Hamburger — circle button */}
          <button onClick={mobileMenuOpen ? closeMenu : openMenu} aria-label="메뉴"
            className="md:hidden"
            style={{ width: "42px", height: "42px", borderRadius: "50%", border: "1.5px solid rgba(0,0,0,0.1)", background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px", cursor: "pointer", flexShrink: 0 }}
          >
            <div style={{ width: "15px", height: "1.5px", background: DARK, borderRadius: "1px", transition: "all .35s ease", transform: mobileMenuOpen ? "rotate(45deg) translate(0,6.5px)" : "none" }} />
            <div style={{ width: "15px", height: "1.5px", background: DARK, borderRadius: "1px", transition: "all .35s ease", opacity: mobileMenuOpen ? 0 : 1 }} />
            <div style={{ width: "15px", height: "1.5px", background: DARK, borderRadius: "1px", transition: "all .35s ease", transform: mobileMenuOpen ? "rotate(-45deg) translate(0,-6.5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Backdrop ── */}
      <div onClick={closeMenu} style={{
        position: "fixed", inset: 0, background: "rgba(20,20,19,0.55)", zIndex: 38,
        backdropFilter: "blur(4px)", transition: "opacity .3s",
        opacity: mobileMenuOpen ? 1 : 0, pointerEvents: mobileMenuOpen ? "auto" : "none",
      }} />

      {/* ── Mobile Slide Panel ── */}
      <div style={{
        position: "fixed", top: 0, right: 0, height: "100%",
        width: "min(320px,calc(100vw - 40px))",
        background: "#fff", zIndex: 45, display: "flex", flexDirection: "column",
        transition: "transform .3s cubic-bezier(.23,1,.32,1)",
        transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
        boxShadow: "-16px 0 48px rgba(0,0,0,0.12)",
      }}>
        {/* Panel Header */}
        <div style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: CREAM, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          <div>
            <p style={{ fontSize: ".58rem", fontWeight: 800, color: GOLD, letterSpacing: "3px", textTransform: "uppercase" }}>SINWOO INC.</p>
            <p style={{ fontSize: ".88rem", fontWeight: 700, color: DARK }}>신우아이앤씨</p>
          </div>
          <button onClick={closeMenu} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="14" height="14" fill="none" stroke={DARK} strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Links */}
        <nav style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
          {navItems.map((item, i) => (
            <a key={item.href} href={item.href} onClick={closeMenu}
              style={{
                display: "block", padding: "13px 16px", borderRadius: "12px",
                fontSize: ".95rem", fontWeight: 500, color: "#262627",
                textDecoration: "none",
                transition: "background .2s, color .2s, transform .35s ease-out, opacity .35s ease-out",
                transform: mobileMenuOpen ? "translateX(0)" : "translateX(16px)",
                opacity: mobileMenuOpen ? 1 : 0,
                transitionDelay: mobileMenuOpen ? `${80 + i * 40}ms` : "0ms",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = CREAM; (e.currentTarget as HTMLElement).style.color = GOLD; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = "#262627"; }}
            >{item.label}</a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{
          padding: "16px", borderTop: "1px solid rgba(0,0,0,0.07)",
          transition: "opacity .3s, transform .3s",
          opacity: mobileMenuOpen ? 1 : 0, transform: mobileMenuOpen ? "translateY(0)" : "translateY(8px)",
          transitionDelay: mobileMenuOpen ? `${80 + navItems.length * 40}ms` : "0ms",
        }}>
          <a href="#contact" onClick={closeMenu}
            style={{ display: "block", padding: "14px", borderRadius: "999px", background: DARK, color: CREAM, fontWeight: 600, fontSize: ".9rem", textAlign: "center", textDecoration: "none", transition: "background .2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#2e2e36"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = DARK}
          >지금 문의하기 →</a>
          {COMPANY_PROFILE_PDF && (
            <a href={COMPANY_PROFILE_PDF} download={COMPANY_PROFILE_FILENAME} onClick={closeMenu}
              style={{ display: "block", marginTop: "8px", padding: "13px", borderRadius: "999px", border: "1.5px solid rgba(0,0,0,0.14)", color: "#262627", fontWeight: 600, fontSize: ".88rem", textAlign: "center", textDecoration: "none" }}
            >지명원 다운로드 ↓</a>
          )}
          <p style={{ textAlign: "center", fontSize: ".7rem", color: "#7a7a85", marginTop: "10px" }}>프리미엄 부동산 개발·분양대행</p>
        </div>
      </div>
    </>
  );
}
