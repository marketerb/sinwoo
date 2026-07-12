"use client";

import Navigation from "./components/Navigation";
import { useState, useEffect, useRef } from "react";

/* 모노크롬 미니멀 — 골드는 극소량 액센트로만 사용 */
const G = {
  gold: "#b8935a", gold2: "#d4ad6e", goldPale: "#faf5ec",
  dark: "#111111",
  dark2: "#333333", muted: "#6b6b6b",
  light: "#FAFAFA",
  lighter: "#F5F5F5",
  border: "rgba(0,0,0,0.08)", borderGold: "rgba(0,0,0,0.08)",
};
/* 구 골드 그라데이션 자리 — 모노크롬에서는 딥블랙 솔리드 */
const gradText = { color: G.dark } as React.CSSProperties;

/* SVG 아이콘 헬퍼 — Feather/Heroicons 스타일 라인 아이콘 */
const Ico = ({ d, size = 28 }: { d: string | string[]; size?: number }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const icons = {
  building:   ["M2 19h20M4.5 19V6a1 1 0 011-1h13a1 1 0 011 1v13M9 19v-5h6v5M9 9h.01M12 9h.01M15 9h.01M9 13h.01M12 13h.01M15 13h.01"],
  chartBars:  ["M3 3v18h18M7 16V9M12 16V5M17 16v-4"],
  trendUp:    ["M22 7L13.5 15.5 8.5 10.5 2 17M16 7h6v6"],
  clipboard:  ["M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"],
  star:       ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
  search:     ["M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"],
  docCheck:   ["M9 12l2 2 4-4M7 4.5A2 2 0 015 6.5v11A2 2 0 007 19.5h10A2 2 0 0019 17.5v-11A2 2 0 0017 4.5M9 4.5h6"],
  target:     ["M12 22a10 10 0 100-20 10 10 0 000 20zM12 18a6 6 0 100-12 6 6 0 000 12zM12 14a2 2 0 100-4 2 2 0 000 4z"],
  megaphone:  ["M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"],
  home:       ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10"],
  shield:     ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4"],
  layers:     ["M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"],
  award:      ["M12 2a6 6 0 100 12 6 6 0 000-12zM15.477 12.89L17 22l-5-3-5 3 1.523-9.11"],
  share:      ["M18 2a3 3 0 100 6 3 3 0 000-6zM6 9a3 3 0 100 6 3 3 0 000-6zM18 16a3 3 0 100 6 3 3 0 000-6zM8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"],
  chat:       ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
  mail:       ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6"],
  printer:    ["M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z"],
  mapPin:     ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 10a2 2 0 100-4 2 2 0 000 4z"],
  chevronUp:  ["M18 15l-6-6-6 6"],
};

export default function Home() {
  const statsRef = useRef<HTMLElement>(null);
  const [statsOn, setStatsOn] = useState(false);
  const [counts, setCounts] = useState({ y: 0, p: 0, u: 0, s: 0, b: 0 });
  const [showTop, setShowTop] = useState(false);
  const [company, setCompany] = useState<{ phone?: string; email?: string; address?: string; kakao_channel?: string } | null>(null);
  /* 히어로 배경영상 — 모바일은 경량 SD, 데스크톱은 HD (마운트 후 선택해 불필요 다운로드 방지) */
  const [heroVideo, setHeroVideo] = useState<string | null>(null);

  useEffect(() => { fetchCompany(); }, []);

  useEffect(() => {
    setHeroVideo(window.matchMedia("(max-width: 767px)").matches ? "/hero-bg-mobile.mp4" : "/hero-bg.mp4");
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !statsOn) { setStatsOn(true); animateCounts(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [statsOn]);

  useEffect(() => {
    const items = document.querySelectorAll(".fade-in-on-scroll");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.06 });
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* 스크롤 탑버튼 표시 여부 */
  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function animateCounts() {
    /* 지명원 기준: 2015~2026 진행 프로젝트 32건, 확인 가능 분양 세대·실 11,000+ */
    const targets = { y: 10, p: 30, u: 11000, s: 100, b: 6 };
    const dur = 1500, start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCounts({ y: Math.floor(e * targets.y), p: Math.floor(e * targets.p), u: Math.floor(e * targets.u), s: Math.floor(e * targets.s), b: Math.floor(e * targets.b) });
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  async function fetchCompany() {
    try {
      const res = await fetch("/api/company");
      if (res.ok) setCompany(await res.json());
    } catch { }
  }

  /* 지명원(회사소개서) 기준 현장명 — 최신 연도 우선, ★ = 회사 연혁 마일스톤 */
  const timelineGroups: { year: string; items: { name: string; milestone?: boolean }[] }[] = [
    { year: "2026", items: [{ name: "힐스테이트 회룡역파크뷰" }] },
    { year: "2025", items: [{ name: "동작구 보라매 파르크힐" }, { name: "이문 아이파크자이 3단지" }, { name: "천안 힐스테이트 두정역" }] },
    { year: "2024", items: [{ name: "이수 헤리드" }, { name: "신광교 클라우드시티" }, { name: "신길 AK 푸르지오" }] },
    { year: "2023", items: [{ name: "상도 푸르지오 클라베뉴" }, { name: "한화 포레나 인천학익" }, { name: "오산 세마 현대프리미어 캠퍼스" }] },
    { year: "2022", items: [{ name: "지축 아쿠아테라스몰" }, { name: "포항 아이파크" }] },
    { year: "2021", items: [{ name: "마곡 르웨스트" }, { name: "마곡 그랑시엘" }, { name: "신우아이앤씨 설립", milestone: true }] },
    { year: "2020", items: [{ name: "블루원 주차타워" }] },
    { year: "2019", items: [{ name: "김포 상미공단 센트럴 팩토리움" }, { name: "송림센트럴타워" }] },
    { year: "2018", items: [{ name: "마곡지구 매그넘793" }, { name: "마곡 M타워" }] },
    { year: "2017", items: [{ name: "해운대 뷰띠크테라스 호텔" }, { name: "인하대 헤리움 메트로타워" }, { name: "영종도 스카이파크리움" }, { name: "하이앤드컴퍼니 법인변경", milestone: true }] },
    { year: "2016", items: [{ name: "가산 경우 유미어스" }, { name: "에이스네스트빌" }, { name: "충북혁신도시 밀라움" }, { name: "마곡 문영퀸즈파크10" }, { name: "마곡 문영퀸즈파크9" }, { name: "배곧 힘찬헤리움2" }] },
    { year: "2015", items: [{ name: "배곧 힘찬헤리움1" }, { name: "마곡 프라이빗 타워2" }, { name: "동탄마크폴리스" }, { name: "안강프라이빗타워" }, { name: "하이앤드컴퍼니 설립", milestone: true }] },
  ];

  return (
    <div style={{ background: "#fff" }}>
      <Navigation />

      {/* ─── HERO ─── */}
      {/* nav는 fixed라 document flow 차지 안 함 → 100vh 사용, paddingTop으로 nav 여백 확보 */}
      <section
        id="home"
        className="flex flex-col justify-end relative overflow-hidden px-5 sm:px-10 md:px-12 pb-16 md:pb-20"
        style={{ minHeight: "100svh", paddingTop: "100px", background: "#0a0a0a url('/hero-poster.jpg') center/cover no-repeat" }}
      >
        {/* Background video — 마운트 후 화면폭에 맞는 소스만 로드 */}
        {heroVideo && (
          <video
            autoPlay muted loop playsInline preload="auto" poster="/hero-poster.jpg"
            key={heroVideo}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        {/* Dark overlay — 텍스트 가독성 */}
        <div className="absolute inset-0" style={{ zIndex: 1, background: "linear-gradient(180deg,rgba(0,0,0,0.60) 0%,rgba(0,0,0,0.42) 42%,rgba(0,0,0,0.82) 100%)" }} />

        {/* Ghost Watermark — 대형 타이포, 영상 위 은은하게 */}
        <div className="absolute hidden lg:block" style={{
          top: "20%", left: 0, right: 0, zIndex: 2,
          fontSize: "clamp(80px,13vw,200px)", fontWeight: 900,
          color: "rgba(255,255,255,0.07)",
          letterSpacing: "-6px", lineHeight: 1,
          userSelect: "none", pointerEvents: "none",
          paddingLeft: "5vw", whiteSpace: "nowrap", overflow: "hidden",
        }}>신우아이앤씨</div>

        {/* Side label */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden lg:block" style={{ zIndex: 2, writingMode: "vertical-lr", fontSize: ".6rem", letterSpacing: "4px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
          SINWOO Inc. · Est. 2015 · Seoul
        </div>

        {/* Scroll indicator */}
        <div className="absolute right-10 bottom-24 hidden lg:flex flex-col items-center gap-3" style={{ zIndex: 2 }}>
          <div style={{ width: "1px", height: "60px", background: `linear-gradient(to bottom,transparent,rgba(255,255,255,0.9))`, animation: "scrollLine 1.8s ease-in-out infinite" }} />
          <span style={{ fontSize: ".6rem", color: "rgba(255,255,255,0.6)" }}>scroll</span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-10" style={{ color: "rgba(255,255,255,0.92)", fontSize: ".68rem", letterSpacing: "3px", fontWeight: 700, textTransform: "uppercase" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: G.gold, animation: "pulse 2s ease infinite", display: "inline-block" }} />
            전문 분양대행 · 부동산 솔루션
          </div>

          {/* Title */}
          <h1 className="mb-10" style={{ fontWeight: 900, lineHeight: "1.0", letterSpacing: "-2px", fontSize: "clamp(38px,6.5vw,96px)", textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}>
            <span style={{ color: "#fff", display: "block" }}>부동산의 가치를</span>
            <span style={{ display: "block", color: "#fff", fontFamily: "'Nanum Myeongjo','Playfair Display',serif" }}>
              설계하고 완성합니다.
            </span>
          </h1>

          {/* Bottom row: desc + CTA */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 flex-wrap">
            <p style={{ maxWidth: "380px", fontSize: ".92rem", color: "rgba(255,255,255,0.78)", lineHeight: "1.9" }}>
              개발 컨설팅부터 분양대행, 투자자문, PM까지<br />
              사업의 시작과 끝을 책임지는 <span style={{ color: "#fff", fontWeight: 700 }}>부동산 전문 파트너</span>입니다.
            </p>
            {/* White primary + outlined-white secondary (영상 위 대비) */}
            <div className="flex gap-3 flex-wrap">
              <a href="#portfolio" className="btn-hero-primary">포트폴리오 보기 →</a>
              <a href="#contact" className="btn-hero-line">문의하기</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section ref={statsRef} style={{ background: "#fff", borderBottom: `1px solid ${G.border}`, padding: "clamp(56px,9vw,96px) clamp(20px,5vw,48px)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5">
            {[
              { num: `${counts.y}`, unit: "+", label: "경력 (Years)" },
              { num: `${counts.p}`, unit: "+", label: "프로젝트 실적" },
              { num: counts.u.toLocaleString(), unit: "+", label: "누적 분양 세대·실" },
              { num: `${counts.s}`, unit: "%", label: "성공 분양 목표" },
              { num: `${counts.b}`, unit: "개", label: "전문 영업본부" },
            ].map((s, i) => (
              <div key={i} className={`text-center ${i === 4 ? "col-span-2 md:col-span-1" : ""}`} style={{ padding: "clamp(24px,4vw,40px) 16px", borderRight: i < 4 ? `1px solid ${G.border}` : "none", transition: "background .3s", cursor: "default" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = G.goldPale}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ""}>
                <div style={{ fontSize: "clamp(36px,4vw,60px)", fontWeight: 900, letterSpacing: "-3px", lineHeight: 1, ...gradText }}>
                  {s.num}<span style={{ fontSize: ".9rem", fontWeight: 400, color: G.muted, WebkitTextFillColor: G.muted }}>{s.unit}</span>
                </div>
                <div style={{ fontSize: ".72rem", color: G.muted, letterSpacing: "1px", marginTop: "6px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNER BRANDS ─── */}
      <section style={{ background: G.lighter, borderBottom: `1px solid ${G.border}`, padding: "clamp(48px,7vw,72px) clamp(20px,5vw,48px)" }}>
        <div className="max-w-7xl mx-auto text-center">
          <div style={{ fontSize: ".65rem", letterSpacing: "3px", color: G.gold, textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>Partners</div>
          <p style={{ fontSize: ".85rem", color: G.muted, marginBottom: "36px" }}>신우아이앤씨가 분양을 함께한 주요 브랜드</p>
          <div className="brand-strip">
            {["힐스테이트", "아이파크", "자이 Xi", "푸르지오", "한화 포레나", "두산위브", "힘찬건설", "문영건설", "현대 프리미어캠퍼스", "마크폴리스"].map((b, i) => (
              <span key={i} className="brand-chip fade-in-on-scroll" style={{ transitionDelay: `${i * 40}ms` }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ background: G.light, padding: "clamp(64px,10vw,104px) clamp(20px,5vw,48px)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 md:gap-24 items-start">
            <div className="fade-in-on-scroll">
              <div className="s-tag">About SINWOO</div>
              <div className="s-rule" />
              <h2 className="s-title mb-8">신우아이앤씨<br /><span style={gradText}>소개</span></h2>
              <p style={{ fontSize: "1rem", color: G.muted, lineHeight: 2, marginBottom: "32px", maxWidth: "460px" }}>
                <strong style={{ color: G.dark, fontWeight: 700 }}>주식회사 신우아이앤씨</strong>는 전문적인 지식과 경험을 바탕으로 고객의 가치와 신뢰를 최우선으로 삼는 <strong style={{ color: G.dark, fontWeight: 700 }}>전문 부동산 솔루션 프로바이더</strong>입니다.<br /><br />
                시장분석, 개발기획, 투자자문, 분양마케팅, 프로젝트 관리까지 사업 전 과정의 통합 솔루션을 제공합니다.
              </p>
              <div style={{ background: "#fff", border: `1px solid ${G.border}`, padding: "20px 24px", borderRadius: "16px", boxShadow: `0 4px 20px rgba(0,0,0,0.05)`, marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", fontStyle: "italic", fontFamily: "'Playfair Display',serif", color: G.dark, marginBottom: "6px" }}>"Above &amp; Beyond"</h3>
                <p style={{ fontSize: ".8rem", color: G.muted, lineHeight: "1.7" }}>기대를 뛰어넘다, 그 이상을 위해 최선을 다하는 신우아이앤씨의 약속입니다.</p>
              </div>
              {/* 회사 정보 필 — 비공개 처리 */}
            </div>
            <div className="fade-in-on-scroll" style={{ transitionDelay: "150ms" }}>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { icon: icons.layers, title: "맞춤형 전략", desc: "프로젝트별 최적 전략과 이용기획" },
                  { icon: icons.award,  title: "풍부한 경험", desc: "10년 30건+ 성공 프로젝트 노하우" },
                  { icon: icons.share,  title: "전문 네트워크", desc: "건설사·시행사 전문 협력 네트워크" },
                  { icon: icons.chat,   title: "커뮤니케이션", desc: "신속한 소통으로 프로젝트 가속화" },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "20px", borderRadius: "14px", background: "#fff", border: `1px solid ${G.border}`, transition: "all .3s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = G.borderGold; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(0,0,0,0.05)`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = G.border; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}>
                    <div style={{ color: G.dark, marginBottom: "8px" }}>
                      <Ico d={item.icon} size={22} />
                    </div>
                    <div style={{ fontSize: ".82rem", fontWeight: 700, color: G.dark, marginBottom: "4px" }}>{item.title}</div>
                    <div style={{ fontSize: ".72rem", color: G.muted, lineHeight: "1.5" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "24px", background: G.lighter, borderRadius: "14px", border: `1px solid ${G.border}` }}>
                <div style={{ fontSize: ".72rem", letterSpacing: "2px", color: G.gold, textTransform: "uppercase", fontWeight: 700, marginBottom: "10px" }}>Why SINWOO?</div>
                <div style={{ fontSize: ".82rem", color: G.dark2, lineHeight: "1.8" }}>
                  ✓ 10년+ 분양대행 전문 경험<br />
                  ✓ 30건+ 성공 프로젝트 실적<br />
                  ✓ 6개 전문 영업본부 보유<br />
                  ✓ 대형 건설 브랜드 협력 이력<br />
                  ✓ 성공 분양 100% 목표의식
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES BENTO ─── */}
      <section id="business" style={{ background: "#fff", padding: "clamp(64px,10vw,104px) clamp(20px,5vw,48px)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end flex-wrap gap-6 mb-16">
            <div>
              <div className="s-tag">Services</div>
              <div className="s-rule" />
              <h2 className="s-title">전문 서비스 <span style={gradText}>영역</span></h2>
            </div>
            <p style={{ maxWidth: "300px", fontSize: ".85rem", color: G.muted, lineHeight: "1.8" }}>
              현장 특성을 최적화한 맞춤형 전략으로 프로젝트의 성공을 이끕니다.
            </p>
          </div>
          <div className="bento">
            <div className="bc b1 fade-in-on-scroll">
              <div className="bc-num">01 / Distribution</div>
              <div className="bc-icon" style={{ color: G.dark }}><Ico d={icons.building} size={38} /></div>
              <div className="bc-en">Distribution</div>
              <div className="bc-kr">분양대행</div>
              <p className="bc-desc">아파트, 오피스텔, 지식산업센터 등 현장특성에 적합한 마케팅 방식을 개발하고 전문 영업조직을 구성·운영하여 100% 성공 분양을 목표로 합니다.</p>
              <div className="bc-tags">
                {["지식산업센터", "복합상업시설", "아파트", "오피스텔", "호텔"].map((t, i) => <span key={i} className="bc-tag">{t}</span>)}
              </div>
            </div>
            <div className="bc b2 fade-in-on-scroll" style={{ transitionDelay: "80ms" }}>
              <div className="bc-num">02 / Consulting</div>
              <div className="bc-icon" style={{ color: G.dark }}><Ico d={icons.chartBars} size={38} /></div>
              <div className="bc-en">Consulting</div>
              <div className="bc-kr">부동산 개발 컨설팅</div>
              <p className="bc-desc">최유효 이용분석과 가격분석을 통해 최적의 전략으로 고객 이익을 극대화합니다.</p>
              <div className="bc-tags">
                {["시장조사", "SWOT분석", "사업성검토", "전략수립"].map((t, i) => <span key={i} className="bc-tag">{t}</span>)}
              </div>
            </div>
            <div className="bc b3 fade-in-on-scroll" style={{ transitionDelay: "160ms" }}>
              <div className="bc-num">03 / Investment</div>
              <div className="bc-icon" style={{ color: G.dark }}><Ico d={icons.trendUp} size={38} /></div>
              <div className="bc-en">Investment</div>
              <div className="bc-kr">부동산 투자자문</div>
              <p className="bc-desc">준공 전후 건축물 매입·매각을 위한 최적의 투자솔루션.</p>
              <div className="bc-tags">
                {["매입자문", "매각자문", "공동주택"].map((t, i) => <span key={i} className="bc-tag">{t}</span>)}
              </div>
            </div>
            <div className="bc b4 fade-in-on-scroll" style={{ transitionDelay: "240ms" }}>
              <div className="bc-num">04 / PM</div>
              <div className="bc-icon" style={{ color: G.dark }}><Ico d={icons.clipboard} size={38} /></div>
              <div className="bc-en">Project Management</div>
              <div className="bc-kr">부동산 개발 PM</div>
              <p className="bc-desc">사업지 선정부터 사후관리까지 프로젝트 전 과정 대행.</p>
              <div className="bc-tags">
                {["사업기획", "분양", "이후관리"].map((t, i) => <span key={i} className="bc-tag">{t}</span>)}
              </div>
            </div>
            <div className="bc b5 bc-highlight fade-in-on-scroll" style={{ transitionDelay: "320ms" }}>
              <div className="bc-num" style={{ color: G.gold }}>SINWOO VALUE</div>
              <div style={{ color: G.dark, margin: "16px 0" }}><Ico d={icons.star} size={38} /></div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: G.dark, marginBottom: "10px", lineHeight: "1.4" }}>맞춤형 전략 ·<br />전문 네트워크</div>
              <div style={{ fontSize: ".78rem", color: G.muted, lineHeight: "1.8" }}>사람 · 공정 가치경영 · 네트워크 · 전도적 역량으로 모든 프로젝트에 최선을 다합니다.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="process" style={{ background: G.light, padding: "clamp(64px,10vw,104px) clamp(20px,5vw,48px)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="s-tag">분양대행 진행 절차</div>
          <div className="s-rule" />
          <h2 className="s-title mb-4">PROCESS</h2>
          <p style={{ fontSize: ".88rem", color: G.muted, lineHeight: "1.8", marginBottom: "56px", maxWidth: "560px" }}>
            사업지 의뢰부터 계약·고객관리까지, 현장특성에 적합한 마케팅 방안을 개발하고 전문 영업조직을 구성·투입하여 <strong style={{ color: G.dark }}>100% 성공 분양</strong>을 목적으로 합니다.
          </p>
          <div className="relative">
            <div className="hidden md:block absolute top-9 left-[8.33%] right-[8.33%]" style={{ height: "1px", background: `linear-gradient(to right,transparent,${G.border},transparent)` }} />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 relative">
              {[
                { s: "01", title: "분양대행 의뢰", desc: "업무범위 결정 · 대행계약 · 전담팀 구성", icon: icons.docCheck },
                { s: "02", title: "환경분석·검토", desc: "입지환경 · 관련법규 · 사업타당성", icon: icons.search },
                { s: "03", title: "타겟 설정",     desc: "표적시장 선정 · 상품 컨셉 · 수요측정", icon: icons.target },
                { s: "04", title: "마케팅 전략수립", desc: "상품 차별화 · 광고홍보 기획 · DB확보", icon: icons.chartBars },
                { s: "05", title: "사전 마케팅",   desc: "사업설명회 · 가망고객 확보 · 홍보", icon: icons.megaphone },
                { s: "06", title: "분양운영·계약", desc: "청약·분양 상담 / 계약 / 고객관리", icon: icons.home },
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center fade-in-on-scroll" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: `1px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px", background: G.light, boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transition: "transform .3s, border-color .3s, box-shadow .3s", cursor: "default", color: G.dark }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(184,147,90,0.35)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(184,147,90,0.18)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.borderColor = G.border; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}>
                    <Ico d={p.icon} size={28} />
                  </div>
                  <p style={{ fontSize: ".65rem", color: G.gold, fontWeight: 700, letterSpacing: "1px", marginBottom: "4px" }}>STEP {p.s}</p>
                  <p style={{ fontSize: ".82rem", fontWeight: 700, color: G.dark, marginBottom: "4px" }}>{p.title}</p>
                  <p style={{ fontSize: ".68rem", color: G.muted, lineHeight: "1.6" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 조직 구성 — 지명원 조직도 반영 */}
          <div style={{ marginTop: "64px", background: "#fff", border: `1px solid ${G.border}`, borderRadius: "20px", padding: "clamp(28px,4.5vw,44px)" }} className="fade-in-on-scroll">
            <div style={{ fontSize: ".65rem", letterSpacing: "3px", color: G.gold, textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>Organization</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
              <p style={{ fontSize: "1.05rem", fontWeight: 700, color: G.dark }}>현장에 투입되는 전문 조직</p>
              <p style={{ fontSize: ".78rem", color: G.muted }}>대표이사 직속 개발사업부·마케팅기획부 + 6개 전문 영업본부</p>
            </div>
            <div className="org-grid">
              {[
                { t: "개발사업부", d: "시장조사 · 타당성조사 · 사업제안 · 부동산개발·시행" },
                { t: "마케팅기획부", d: "분양대행 전문 마케팅 기획" },
                { t: "영업관리팀", d: "영업본부 운영 · 계약 관리" },
                { t: "영업 1~6본부", d: "현장별 전문 영업조직 구성·투입" },
                { t: "법률·세무 고문", d: "프로젝트 리스크 자문" },
              ].map((o, i) => (
                <div key={i} className="org-card">
                  <div style={{ fontSize: ".85rem", fontWeight: 700, color: G.dark, marginBottom: "4px" }}>{o.t}</div>
                  <div style={{ fontSize: ".72rem", color: G.muted, lineHeight: "1.6" }}>{o.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section id="portfolio" style={{ background: G.light, padding: "clamp(64px,10vw,104px) clamp(20px,5vw,48px)", borderTop: `1px solid ${G.border}` }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end flex-wrap gap-6 mb-16">
            <div>
              <div className="s-tag">Portfolio</div>
              <div className="s-rule" />
              <h2 className="s-title">사업 <span style={gradText}>실적</span></h2>
            </div>
            <div style={{ fontSize: "clamp(50px,7vw,90px)", fontWeight: 900, letterSpacing: "-4px", lineHeight: 1, ...gradText }}>
              30<span style={{ fontSize: "1rem", color: G.gold, letterSpacing: 0, fontWeight: 400 }}>+ Projects</span>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: "20px", border: `1px solid ${G.border}`, padding: "clamp(24px,4.5vw,40px)", marginBottom: "48px" }}>
            <div style={{ fontSize: ".65rem", letterSpacing: "3px", color: G.gold, textTransform: "uppercase", marginBottom: "24px", fontWeight: 700 }}>▸ 2015 → 2026 전체 진행 프로젝트</div>
            {timelineGroups.map((group) => (
              <div key={group.year} className="tl-group fade-in-on-scroll">
                <div className="tl-group-year">{group.year}</div>
                <div className="tl-group-items">
                  {group.items.map((item, i) => (
                    <span key={i} className={item.milestone ? "tl-chip tl-chip-milestone" : "tl-chip"}>
                      {item.milestone && "◆ "}{item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CEO MESSAGE ─── */}
      <section id="ceo-message" style={{ background: G.lighter, padding: "clamp(64px,10vw,104px) clamp(20px,5vw,48px)", borderTop: `1px solid ${G.border}` }}>
        <div className="max-w-4xl mx-auto fade-in-on-scroll">
          <div style={{ background: "#fff", border: `1px solid ${G.borderGold}`, borderRadius: "24px", padding: "clamp(36px,5.5vw,72px)", boxShadow: "0 20px 60px rgba(184,147,90,0.08)" }}>
            <div style={{ fontSize: ".65rem", letterSpacing: "4px", textTransform: "uppercase", color: G.gold, marginBottom: "20px", fontWeight: 700 }}>CEO MESSAGE</div>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,42px)", fontWeight: 800, color: G.dark, lineHeight: "1.3", marginBottom: "24px", fontStyle: "italic", fontFamily: "'Nanum Myeongjo','Playfair Display',serif" }}>
              "고객의 성공이 곧 우리의 성장입니다."
            </h2>
            <p style={{ fontSize: "1rem", color: G.muted, lineHeight: 2, maxWidth: "600px" }}>
              풍부한 경험과 전문성을 바탕으로 프로젝트의 성공을 위한 최적의 솔루션을 제공하겠습니다. 신우아이앤씨는 고객과의 신뢰 관계를 최우선으로 생각하며, 언제나 고객의 편에서 최선의 노력을 다하겠습니다.
            </p>
            <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: `1px solid ${G.border}` }}>
              <div style={{ fontSize: ".88rem", color: G.dark, fontWeight: 700 }}>임중용</div>
              <div style={{ fontSize: ".75rem", color: G.muted, marginTop: "4px" }}>주식회사 신우아이앤씨 대표이사</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ background: "#fff", padding: "clamp(64px,10vw,104px) clamp(20px,5vw,48px)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20">

            {/* 연락처 + 네이버 지도 */}
            <div className="fade-in-on-scroll">
              <div className="s-tag">Contact</div>
              <div className="s-rule" />
              <h2 className="s-title mb-10">오시는 <span style={gradText}>길</span></h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
                {/* 전화 — DB 값 우선, 없으면 대표번호 */}
                <div className="cc-card">
                  <div className="cc-icon" style={{ color: G.dark }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="cc-label">대표전화</div>
                    <a href={`tel:${(company?.phone || "1877-8489").replace(/[^0-9]/g,"")}`} className="cc-val" style={{ textDecoration: "none", fontWeight: 700 }}>{company?.phone || "1877-8489"}</a>
                  </div>
                </div>
                <div className="cc-card">
                  <div className="cc-icon" style={{ color: G.dark }}><Ico d={icons.mail} size={20} /></div>
                  <div>
                    <div className="cc-label">Email</div>
                    <a href={`mailto:${company?.email || "sinwooinc2014@naver.com"}`} className="cc-val" style={{ textDecoration: "none" }}>
                      {company?.email || "sinwooinc2014@naver.com"}
                    </a>
                  </div>
                </div>
                <div className="cc-card">
                  <div className="cc-icon" style={{ color: G.dark }}><Ico d={icons.mapPin} size={20} /></div>
                  <div>
                    <div className="cc-label">Location</div>
                    <div className="cc-val" style={{ whiteSpace: "pre-line" }}>
                      {company?.address || "서울특별시 강서구 마곡중앙6로 45\n리더스퀘어마곡 6층 (5호선 발산역 인근)"}
                    </div>
                  </div>
                </div>
              </div>

              {/* 네이버 지도 영역 */}
              <div style={{ borderRadius: "16px", overflow: "hidden", border: `1px solid ${G.border}`, position: "relative" }}>
                {/* 지도 헤더 */}
                <div style={{ padding: "12px 16px", background: "#fff", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: G.gold, display: "inline-block" }} />
                  <span style={{ fontSize: ".75rem", color: G.muted }}>서울 강서구 마곡 · SINWOO Inc.</span>
                </div>
                {/* 지도 플레이스홀더 (배경 이미지 스타일) */}
                <div style={{
                  height: "240px",
                  background: G.lighter,
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.05) 1px,transparent 1px),
                    linear-gradient(90deg,rgba(0,0,0,0.05) 1px,transparent 1px)`,
                  backgroundSize: "30px 30px",
                  display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px",
                  position: "relative"
                }}>
                  {/* 핀 마커 */}
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: G.dark, display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", boxShadow: `0 0 0 12px rgba(0,0,0,0.06)`,
                    animation: "pulseBadge 2s ease infinite"
                  }}>
                    <Ico d={icons.mapPin} size={24} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: ".82rem", fontWeight: 700, color: G.dark }}>리더스퀘어마곡 6층</p>
                    <p style={{ fontSize: ".72rem", color: G.muted }}>마곡중앙6로 45</p>
                  </div>
                  {/* 네이버 지도 링크 버튼 */}
                  <a
                    href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EA%B0%95%EC%84%9C%EA%B5%AC%20%EB%A7%88%EA%B3%A1%EC%A4%91%EC%95%996%EB%A1%9C%2045%20%EB%A6%AC%EB%8D%94%EC%8A%A4%ED%80%98%EC%96%B4%EB%A7%88%EA%B3%A1"
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      padding: "10px 24px", borderRadius: "100px",
                      background: "#03c75a", color: "#fff",
                      fontSize: ".78rem", fontWeight: 700, textDecoration: "none",
                      boxShadow: "0 4px 16px rgba(3,199,90,0.25)",
                      transition: "all .3s"
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(3,199,90,0.35)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(3,199,90,0.25)"}
                  >
                    네이버 지도로 보기 →
                  </a>
                </div>
              </div>
            </div>

            {/* 상담 신청 폼 */}
            <div className="fade-in-on-scroll" style={{ transitionDelay: "150ms" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: G.dark, marginBottom: "24px" }}>무료 상담 신청</h3>
              <div style={{ background: "#fff", border: `1px solid ${G.border}`, borderRadius: "20px", padding: "clamp(24px,5vw,40px)" }}>
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert("상담 신청이 완료되었습니다.\n담당자가 24시간 내 연락드리겠습니다.\n\n감사합니다. — 신우아이앤씨"); }}>
                  <div><label className="form-label">성함 / 회사명</label><input type="text" className="form-input" placeholder="예) ○○건설 홍길동 부장" required /></div>
                  <div><label className="form-label">연락처</label><input type="tel" className="form-input" placeholder="010-0000-0000" required /></div>
                  <div><label className="form-label">이메일</label><input type="email" className="form-input" placeholder="example@company.com" /></div>
                  <div>
                    <label className="form-label">관심 서비스</label>
                    <select className="form-input" style={{ appearance: "none" }}>
                      <option value="">서비스를 선택해주세요</option>
                      <option>분양대행</option><option>부동산 개발 컨설팅</option>
                      <option>부동산 투자자문</option><option>부동산 개발 PM</option>
                      <option>기타 문의</option>
                    </select>
                  </div>
                  <div><label className="form-label">프로젝트 내용</label><textarea className="form-input" placeholder="사업지 위치, 규모, 유형 등 간략한 내용을 적어주세요." rows={4} style={{ resize: "vertical" }} /></div>
                  <button type="submit" className="form-submit">상담 신청하기</button>
                  <p style={{ textAlign: "center", marginTop: "12px", fontSize: ".68rem", color: G.muted }}>* 상담 내용은 비밀이 보장되며, 24시간 내 회신 드립니다.</p>
                </form>
              </div>

              {/* 카카오톡 채널 버튼 (설정된 경우) */}
              {company?.kakao_channel && (
                <a href={company.kakao_channel} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "12px", padding: "14px", borderRadius: "12px", background: "#fee500", color: "#3c1e1e", fontWeight: 700, fontSize: ".85rem", textDecoration: "none", transition: "opacity .2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = ".85"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#3c1e1e"><path d="M12 3C6.48 3 2 6.92 2 11.75c0 3.04 1.76 5.7 4.4 7.3-.15.54-.54 1.96-.63 2.27-.1.37.14.37.29.27.12-.08 1.9-1.29 2.68-1.82.73.1 1.48.16 2.26.16 5.52 0 10-3.92 10-8.75C22 6.92 17.52 3 12 3z"/></svg>
                  카카오톡으로 상담하기
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: G.dark, padding: "clamp(40px,7vw,64px) clamp(20px,5vw,48px)", color: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "40px", marginBottom: "40px", paddingBottom: "40px", borderBottom: "1px solid rgba(184,147,90,0.15)" }}>
            <div>
              <div style={{ fontSize: ".85rem", fontWeight: 700, color: G.gold, letterSpacing: "2px", marginBottom: "4px" }}>◇ SINWOO Inc. — 신우아이앤씨</div>
              <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "1px" }}>Above &amp; Beyond · 전문 부동산 솔루션 프로바이더</div>
            </div>
            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              {[["#about","회사소개"],["#business","서비스"],["#process","프로세스"],["#portfolio","실적"],["#contact","상담신청"]].map(([h,l],i) => (
                <a key={i} href={h} style={{ fontSize: ".72rem", color: "rgba(255,255,255,0.4)", letterSpacing: "1px", transition: "color .3s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = G.gold}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"}>{l}</a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", fontSize: ".68rem", color: "rgba(255,255,255,0.25)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <span>대표전화 1877-8489</span>
              <span>사업자등록번호 192-88-02038</span>
              <span>법인등록번호 110111-7898799</span>
              <span>대표 임중용</span>
              <span>서울특별시 강서구 마곡중앙6로 45 리더스퀘어마곡 6층</span>
            </div>
            <div>©{new Date().getFullYear()} 주식회사 신우아이앤씨. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* ─── 모바일 전화 바로걸기 ─── */}
      {(
        <a
          href={`tel:${(company?.phone || "1877-8489").replace(/[^0-9]/g, "")}`}
          className="md:hidden"
          style={{
            position: "fixed", bottom: "88px", right: "28px", zIndex: 99,
            width: "48px", height: "48px", borderRadius: "50%",
            background: G.dark, color: "#fff", border: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none",
            transition: "opacity .4s, transform .4s",
            opacity: showTop ? 1 : 0,
            transform: showTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)",
            pointerEvents: showTop ? "auto" : "none",
          }}
          aria-label="전화 바로걸기"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
        </a>
      )}

      {/* ─── SCROLL TO TOP ─── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="맨 위로"
        style={{
          position: "fixed", bottom: "28px", right: "28px", zIndex: 99,
          width: "48px", height: "48px", borderRadius: "50%",
          background: G.dark, color: "#fff", border: "none",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "opacity .4s, transform .4s, box-shadow .3s",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)",
          pointerEvents: showTop ? "auto" : "none",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px) scale(1.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 32px rgba(0,0,0,0.32)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = showTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)"; }}
      >
        <Ico d={icons.chevronUp} size={20} />
      </button>
    </div>
  );
}
