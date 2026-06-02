"use client";

import Navigation from "./components/Navigation";
import { useState, useEffect, useRef } from "react";

const G = {
  gold: "#b8935a", gold2: "#d4ad6e", goldPale: "#faf5ec",
  dark: "#16161a", dark2: "#2e2e36", muted: "#7a7a85",
  light: "#f9f8f5", lighter: "#fdfcfa",
  border: "rgba(0,0,0,0.07)", borderGold: "rgba(184,147,90,0.2)",
};
const gradText = { background: `linear-gradient(135deg,${G.gold},${G.gold2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } as React.CSSProperties;

/* SVG 아이콘 헬퍼 — Feather/Heroicons 스타일 라인 아이콘 */
const Ico = ({ d, size = 28, multi }: { d: string | string[]; size?: number; multi?: boolean }) => (
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
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const statsRef = useRef<HTMLElement>(null);
  const [statsOn, setStatsOn] = useState(false);
  const [counts, setCounts] = useState({ y: 0, p: 0, u: 0, s: 0, b: 0 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => { fetchPortfolios(); }, []);

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
  }, [loading]);

  useEffect(() => {
    const c = document.getElementById("cur"), r = document.getElementById("curR");
    if (!c || !r) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; c.style.left = mx + "px"; c.style.top = my + "px"; };
    document.addEventListener("mousemove", onMove);
    let af: number;
    const anim = () => { rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1; r.style.left = rx + "px"; r.style.top = ry + "px"; af = requestAnimationFrame(anim); };
    af = requestAnimationFrame(anim);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(af); };
  }, []);

  /* 스크롤 탑버튼 표시 여부 */
  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function animateCounts() {
    const targets = { y: 10, p: 40, u: 12000, s: 100, b: 6 };
    const dur = 1500, start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCounts({ y: Math.floor(e * targets.y), p: Math.floor(e * targets.p), u: Math.floor(e * targets.u), s: Math.floor(e * targets.s), b: Math.floor(e * targets.b) });
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  async function fetchPortfolios() {
    try {
      const res = await fetch("/api/portfolios");
      if (res.ok) setPortfolios((await res.json()) || []);
    } catch { } finally { setLoading(false); }
  }

  const marqueeItems = ["분양대행", "부동산 개발 컨설팅", "투자자문", "개발 PM", "100% 성공 분양", "SINWOO Inc.", "분양대행", "부동산 개발 컨설팅", "투자자문", "개발 PM", "100% 성공 분양", "SINWOO Inc."];

  const fallbackProjects = [
    { title: "보라매 파르크힐", sub: "서울 동작구 · 7개동 768세대", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&auto=format&q=70" },
    { title: "이문 아이파크 자이 3단지", sub: "서울 동대문구 · 7개동 152세대", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&q=70" },
    { title: "천안 힐스테이트 두정역", sub: "충남 천안시 · 11개동 997세대", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&q=70" },
  ];

  const timeline = [
    { year: "2014", name: "마곡힐스테이트 M&L라마다" }, { year: "2015", name: "여의도프라임뷰 1차" },
    { year: "2015", name: "대한마크포리스" }, { year: "2015", name: "마곡 프라임뷰 2차" },
    { year: "2015", name: "배곧한국리조트 1차" }, { year: "2016", name: "배곧한국리조트 2차" },
    { year: "2016", name: "마곡문정테크노 9·10" }, { year: "2017", name: "위례 스카이아이파리스" },
    { year: "2017", name: "인터라식 헤리온 메트로파크" }, { year: "2018", name: "마곡 M타임" },
    { year: "2018", name: "마곡지구 마그793" }, { year: "2019", name: "조림 켄트내폴" },
    { year: "2020", name: "블루지 주차빌딩" }, { year: "2021", name: "마곡 그레이스" },
    { year: "2021", name: "마곡 르웨스트" }, { year: "2022", name: "포항 아이파크" },
    { year: "2023", name: "수원 세마 헤드프리미어원 퍼스" }, { year: "2023", name: "상도 트르지스 클라베뉴" },
    { year: "2024", name: "신길 AK 푸르지오" }, { year: "2024", name: "신광교 클라우드시티" },
    { year: "2024", name: "이이 헤리든 (지역주택조합)" }, { year: "2025", name: "천안 힐스테이트 두정역" },
    { year: "2025", name: "이문 아이파크 자이 3단지" }, { year: "2025", name: "보라매 파르크힐" },
    { year: "2026", name: "힐스테이트 회룡역파크뷰" },
  ];

  const featuredProjects = portfolios.length > 0
    ? portfolios.slice(0, 6).map(p => ({ title: p.title, sub: p.location, img: p.image_url || "" }))
    : fallbackProjects;

  return (
    <div style={{ background: "#fff" }}>
      <div className="cursor" id="cur" />
      <div className="cursor-ring" id="curR" />
      <Navigation />

      {/* ─── HERO ─── */}
      <section
        id="home"
        className="flex flex-col justify-end relative overflow-hidden px-5 sm:px-10 md:px-12 pb-16 md:pb-20"
        style={{ background: G.lighter, minHeight: "calc(100vh - 80px)" }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${G.border} 1px,transparent 1px),linear-gradient(90deg,${G.border} 1px,transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 70% at 70% 30%,rgba(184,147,90,0.07) 0%,transparent 60%),radial-gradient(ellipse 50% 60% at 10% 70%,rgba(184,147,90,0.04) 0%,transparent 50%)" }} />
        <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden lg:block" style={{ writingMode: "vertical-lr", fontSize: ".6rem", letterSpacing: "4px", color: G.muted, textTransform: "uppercase", opacity: .5 }}>
          SINWOO Inc. · Est. 2015 · Seoul
        </div>
        <div className="absolute right-10 bottom-24 hidden lg:flex flex-col items-center gap-3">
          <div style={{ width: "1px", height: "60px", background: `linear-gradient(to bottom,transparent,${G.gold})`, animation: "scrollLine 1.8s ease-in-out infinite" }} />
          <span style={{ fontSize: ".6rem", color: G.muted }}>scroll</span>
        </div>
        <div className="relative z-10 max-w-7xl">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full" style={{ border: `1px solid ${G.borderGold}`, color: G.gold, fontSize: ".7rem", letterSpacing: "2px", background: "rgba(184,147,90,0.04)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: G.gold, animation: "pulse 2s ease infinite", display: "inline-block" }} />
            전문 분양대행 · 부동산 솔루션
          </div>
          <h1 className="mb-8" style={{ fontWeight: 900, lineHeight: "1.05", letterSpacing: "-2px", fontSize: "clamp(38px,6.5vw,96px)" }}>
            <span style={{ color: G.dark, display: "block" }}>부동산의 가치를</span>
            <span style={{ display: "block", ...gradText, fontFamily: "'Nanum Myeongjo','Playfair Display',serif" }}>
              설계하고 완성합니다.
            </span>
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 flex-wrap">
            <p style={{ maxWidth: "380px", fontSize: ".92rem", color: G.muted, lineHeight: "1.9" }}>
              개발 컨설팅부터 분양대행, 투자자문, PM까지<br />
              사업의 시작과 끝을 책임지는 <span style={{ color: G.gold, fontWeight: 600 }}>부동산 전문 파트너</span>입니다.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="#portfolio" className="btn-gold">포트폴리오 보기 →</a>
              <a href="#contact" className="btn-line">문의하기</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div style={{ borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}`, padding: "16px 0", overflow: "hidden", background: "#fff" }}>
        <div style={{ display: "flex", animation: "marqueeScroll 22s linear infinite", whiteSpace: "nowrap" }}>
          {marqueeItems.map((item, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "20px", padding: "0 36px", fontSize: ".72rem", letterSpacing: "3px", textTransform: "uppercase", color: G.muted, whiteSpace: "nowrap" }}>
              {item} <span style={{ color: G.gold }}>◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section ref={statsRef} style={{ background: "#fff", borderBottom: `1px solid ${G.border}`, padding: "80px 48px" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5">
            {[
              { num: `${counts.y}`, unit: "+", label: "경력 (Years)" },
              { num: `${counts.p}`, unit: "+", label: "프로젝트 실적" },
              { num: counts.u.toLocaleString(), unit: "+", label: "총 분양 세대수" },
              { num: `${counts.s}`, unit: "%", label: "성공 분양 목표" },
              { num: `${counts.b}`, unit: "개", label: "전문 영업본부" },
            ].map((s, i) => (
              <div key={i} className="text-center" style={{ padding: "32px 16px", borderRight: i < 4 ? `1px solid ${G.border}` : "none", transition: "background .3s", cursor: "default" }}
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

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ background: G.light, padding: "88px 48px" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div className="fade-in-on-scroll">
              <div className="s-tag">About SINWOO</div>
              <h2 className="s-title mb-7">신우아이앤씨<br /><span style={gradText}>소개</span></h2>
              <p style={{ fontSize: "1rem", color: G.muted, lineHeight: 2, marginBottom: "28px", maxWidth: "460px" }}>
                <strong style={{ color: G.gold, fontWeight: 600 }}>주식회사 신우아이앤씨</strong>는 전문적인 지식과 경험을 바탕으로 고객의 가치와 신뢰를 최우선으로 삼는 <strong style={{ color: G.gold, fontWeight: 600 }}>전문 부동산 솔루션 프로바이더</strong>입니다.<br /><br />
                시장분석, 개발기획, 투자자문, 분양마케팅, 프로젝트 관리까지 사업 전 과정의 통합 솔루션을 제공합니다.
              </p>
              <div style={{ background: "#fff", border: `1px solid ${G.borderGold}`, padding: "20px 24px", borderRadius: "16px", boxShadow: `0 4px 20px rgba(184,147,90,0.06)`, marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", fontStyle: "italic", fontFamily: "'Playfair Display',serif", color: G.gold, marginBottom: "6px" }}>"Above &amp; Beyond"</h3>
                <p style={{ fontSize: ".8rem", color: G.muted, lineHeight: "1.7" }}>기대를 뛰어넘다, 그 이상을 위해 최선을 다하는 신우아이앤씨의 약속입니다.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { k: "대표이사", v: "이성우" },
                  { k: "업종", v: "부동산 개발 및 분양대행" },
                  { k: "소재지", v: "서울특별시 강서구 마곡중앙6로 45, 리더스퀘어마곡 6층" },
                  { k: "이메일", v: "sinwooinc2014@naver.com" },
                  { k: "사업자번호", v: "192-88-02038", gold: true },
                  { k: "설립일", v: "2021년 05월 31일" },
                ].map((item, i) => (
                  <div key={i} className={`info-pill ${(item as any).gold ? "ip-gold" : ""}`}>
                    <span className="ip-key">{item.k}</span>
                    <span className="ip-val">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ transitionDelay: "150ms" }}>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { icon: icons.layers, title: "맞춤형 전략", desc: "프로젝트별 최적 전략과 이용기획" },
                  { icon: icons.award,  title: "풍부한 경험", desc: "10년 40건+ 성공 프로젝트 노하우" },
                  { icon: icons.share,  title: "전문 네트워크", desc: "건설사·시행사 전문 협력 네트워크" },
                  { icon: icons.chat,   title: "커뮤니케이션", desc: "신속한 소통으로 프로젝트 가속화" },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "20px", borderRadius: "14px", background: "#fff", border: `1px solid ${G.border}`, transition: "all .3s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = G.borderGold; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(184,147,90,0.06)`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = G.border; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}>
                    <div style={{ color: G.gold, marginBottom: "8px" }}>
                      <Ico d={item.icon} size={22} />
                    </div>
                    <div style={{ fontSize: ".82rem", fontWeight: 700, color: G.dark, marginBottom: "4px" }}>{item.title}</div>
                    <div style={{ fontSize: ".72rem", color: G.muted, lineHeight: "1.5" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "24px", background: G.goldPale, borderRadius: "14px", border: `1px solid ${G.borderGold}` }}>
                <div style={{ fontSize: ".72rem", letterSpacing: "2px", color: G.gold, textTransform: "uppercase", fontWeight: 700, marginBottom: "10px" }}>Why SINWOO?</div>
                <div style={{ fontSize: ".82rem", color: G.dark2, lineHeight: "1.8" }}>
                  ✓ 10년+ 분양대행 전문 경험<br />
                  ✓ 40건+ 성공 프로젝트 실적<br />
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
      <section id="business" style={{ background: "#fff", padding: "88px 48px" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end flex-wrap gap-6 mb-12">
            <div>
              <div className="s-tag">Services</div>
              <h2 className="s-title">전문 서비스 <span style={gradText}>영역</span></h2>
            </div>
            <p style={{ maxWidth: "300px", fontSize: ".85rem", color: G.muted, lineHeight: "1.8" }}>
              현장 특성을 최적화한 맞춤형 전략으로 프로젝트의 성공을 이끕니다.
            </p>
          </div>
          <div className="bento">
            <div className="bc b1 fade-in-on-scroll">
              <div className="bc-num">01 / Distribution</div>
              <div className="bc-icon" style={{ color: G.gold }}><Ico d={icons.building} size={38} /></div>
              <div className="bc-en">Distribution</div>
              <div className="bc-kr">분양대행</div>
              <p className="bc-desc">아파트, 오피스텔, 지식산업센터 등 현장특성에 적합한 마케팅 방식을 개발하고 전문 영업조직을 구성·운영하여 100% 성공 분양을 목표로 합니다.</p>
              <div className="bc-tags">
                {["지식산업센터", "복합상업시설", "아파트", "오피스텔", "호텔"].map((t, i) => <span key={i} className="bc-tag">{t}</span>)}
              </div>
            </div>
            <div className="bc b2 fade-in-on-scroll" style={{ transitionDelay: "80ms" }}>
              <div className="bc-num">02 / Consulting</div>
              <div className="bc-icon" style={{ color: G.gold }}><Ico d={icons.chartBars} size={38} /></div>
              <div className="bc-en">Consulting</div>
              <div className="bc-kr">부동산 개발 컨설팅</div>
              <p className="bc-desc">최유효 이용분석과 가격분석을 통해 최적의 전략으로 고객 이익을 극대화합니다.</p>
              <div className="bc-tags">
                {["시장조사", "SWOT분석", "사업성검토", "전략수립"].map((t, i) => <span key={i} className="bc-tag">{t}</span>)}
              </div>
            </div>
            <div className="bc b3 fade-in-on-scroll" style={{ transitionDelay: "160ms" }}>
              <div className="bc-num">03 / Investment</div>
              <div className="bc-icon" style={{ color: G.gold }}><Ico d={icons.trendUp} size={38} /></div>
              <div className="bc-en">Investment</div>
              <div className="bc-kr">부동산 투자자문</div>
              <p className="bc-desc">준공 전후 건축물 매입·매각을 위한 최적의 투자솔루션.</p>
              <div className="bc-tags">
                {["매입자문", "매각자문", "공동주택"].map((t, i) => <span key={i} className="bc-tag">{t}</span>)}
              </div>
            </div>
            <div className="bc b4 fade-in-on-scroll" style={{ transitionDelay: "240ms" }}>
              <div className="bc-num">04 / PM</div>
              <div className="bc-icon" style={{ color: G.gold }}><Ico d={icons.clipboard} size={38} /></div>
              <div className="bc-en">Project Management</div>
              <div className="bc-kr">부동산 개발 PM</div>
              <p className="bc-desc">사업지 선정부터 사후관리까지 프로젝트 전 과정 대행.</p>
              <div className="bc-tags">
                {["사업기획", "분양", "이후관리"].map((t, i) => <span key={i} className="bc-tag">{t}</span>)}
              </div>
            </div>
            <div className="bc b5 bc-highlight fade-in-on-scroll" style={{ transitionDelay: "320ms" }}>
              <div className="bc-num" style={{ color: G.gold }}>SINWOO VALUE</div>
              <div style={{ color: G.gold, margin: "16px 0" }}><Ico d={icons.star} size={38} /></div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: G.dark, marginBottom: "10px", lineHeight: "1.4" }}>맞춤형 전략 ·<br />전문 네트워크</div>
              <div style={{ fontSize: ".78rem", color: G.muted, lineHeight: "1.8" }}>사람 · 공정 가치경영 · 네트워크 · 전도적 역량으로 모든 프로젝트에 최선을 다합니다.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="process" style={{ background: G.light, padding: "88px 48px" }}>
        <div className="max-w-7xl mx-auto">
          <div className="s-tag">진행 절차</div>
          <h2 className="s-title mb-12">PROCESS</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-9 left-[8.33%] right-[8.33%]" style={{ height: "1px", background: `linear-gradient(to right,${G.goldPale},${G.gold2},${G.goldPale})` }} />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative">
              {[
                { s: "01", title: "시장조사",   icon: icons.search },
                { s: "02", title: "사업성 검토", icon: icons.docCheck },
                { s: "03", title: "전략수립",   icon: icons.target },
                { s: "04", title: "마케팅기획", icon: icons.megaphone },
                { s: "05", title: "분양운영",   icon: icons.home },
                { s: "06", title: "사후관리",   icon: icons.shield },
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center fade-in-on-scroll" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: `1px solid ${G.borderGold}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px", background: G.goldPale, boxShadow: "0 4px 20px rgba(184,147,90,0.1)", transition: "transform .3s", cursor: "default", color: G.gold }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ""}>
                    <Ico d={p.icon} size={28} />
                  </div>
                  <p style={{ fontSize: ".65rem", color: G.gold, fontWeight: 700, letterSpacing: "1px", marginBottom: "4px" }}>STEP {p.s}</p>
                  <p style={{ fontSize: ".8rem", fontWeight: 700, color: G.dark }}>{p.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section id="portfolio" style={{ background: G.light, padding: "88px 48px", borderTop: `1px solid ${G.border}` }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end flex-wrap gap-6 mb-12">
            <div>
              <div className="s-tag">Portfolio</div>
              <h2 className="s-title">사업 <span style={gradText}>실적</span></h2>
            </div>
            <div style={{ fontSize: "clamp(50px,7vw,90px)", fontWeight: 900, letterSpacing: "-4px", lineHeight: 1, ...gradText }}>
              40<span style={{ fontSize: "1rem", color: G.muted, WebkitTextFillColor: G.muted, letterSpacing: 0, fontWeight: 400 }}>+ Projects</span>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: "20px", border: `1px solid ${G.border}`, padding: "28px 32px", marginBottom: "40px" }}>
            <div style={{ fontSize: ".65rem", letterSpacing: "3px", color: G.gold, textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>▸ 2014 → 2026 전체 진행 프로젝트</div>
            <div className="tl-grid">
              {timeline.map((item, i) => (
                <div key={i} className="tl-item">
                  <span className="tl-yr">{item.year}</span>
                  <span className="tl-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featuredProjects.map((p: any, i) => (
              <div key={i} className="fade-in-on-scroll" style={{ borderRadius: "18px", overflow: "hidden", background: "#fff", border: `1px solid ${G.border}`, transition: "all .4s", transitionDelay: `${i * 60}ms` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 60px rgba(0,0,0,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = G.borderGold; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; (e.currentTarget as HTMLElement).style.borderColor = G.border; }}>
                <div style={{ height: "200px", overflow: "hidden", position: "relative", background: G.light }}>
                  {p.img ? <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .65 }} loading="lazy" /> : <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${G.gold},${G.gold2})` }} />}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 50%)" }} />
                </div>
                <div style={{ padding: "22px" }}>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: G.dark, marginBottom: "6px" }}>{p.title}</div>
                  <div style={{ fontSize: ".75rem", color: G.muted }}>{p.sub || (p as any).location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CEO MESSAGE ─── */}
      <section id="ceo-message" style={{ background: G.lighter, padding: "88px 48px", borderTop: `1px solid ${G.border}` }}>
        <div className="max-w-4xl mx-auto fade-in-on-scroll">
          <div style={{ background: "#fff", border: `1px solid ${G.borderGold}`, borderRadius: "24px", padding: "clamp(32px,5vw,64px)", boxShadow: "0 20px 60px rgba(184,147,90,0.06)" }}>
            <div style={{ fontSize: ".65rem", letterSpacing: "4px", textTransform: "uppercase", color: G.gold, marginBottom: "20px", fontWeight: 700 }}>CEO MESSAGE</div>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,42px)", fontWeight: 800, color: G.dark, lineHeight: "1.3", marginBottom: "24px", fontStyle: "italic", fontFamily: "'Nanum Myeongjo','Playfair Display',serif" }}>
              "고객의 성공이 곧 우리의 성장입니다."
            </h2>
            <p style={{ fontSize: "1rem", color: G.muted, lineHeight: 2, maxWidth: "600px" }}>
              풍부한 경험과 전문성을 바탕으로 프로젝트의 성공을 위한 최적의 솔루션을 제공하겠습니다. 신우아이앤씨는 고객과의 신뢰 관계를 최우선으로 생각하며, 언제나 고객의 편에서 최선의 노력을 다하겠습니다.
            </p>
            <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: `1px solid ${G.border}` }}>
              <div style={{ fontSize: ".88rem", color: G.dark, fontWeight: 700 }}>이성우</div>
              <div style={{ fontSize: ".75rem", color: G.muted, marginTop: "4px" }}>주식회사 신우아이앤씨 대표이사</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ background: "#fff", padding: "88px 48px" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div className="fade-in-on-scroll">
              <div className="s-tag">Contact</div>
              <h2 className="s-title mb-10">오시는 <span style={gradText}>길</span></h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { icon: icons.mail,   label: "Email",    val: "sinwooinc2014@naver.com", href: "mailto:sinwooinc2014@naver.com" },
                  { icon: icons.printer, label: "Fax",     val: "02-6941-0884" },
                  { icon: icons.mapPin, label: "Location", val: "서울특별시 강서구 마곡중앙6로 45\n리더스퀘어마곡 6층 (5호선 발산역 인근)" },
                ].map((item, i) => (
                  <div key={i} className="cc-card">
                    <div className="cc-icon" style={{ color: G.gold }}><Ico d={item.icon} size={20} /></div>
                    <div>
                      <div className="cc-label">{item.label}</div>
                      {item.href
                        ? <a href={item.href} className="cc-val" style={{ textDecoration: "none" }}>{item.val}</a>
                        : <div className="cc-val" style={{ whiteSpace: "pre-line" }}>{item.val}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ transitionDelay: "150ms" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: G.dark, marginBottom: "24px" }}>무료 상담 신청</h3>
              <div style={{ background: "#fff", border: `1px solid ${G.border}`, borderRadius: "20px", padding: "40px" }}>
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
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: G.dark, padding: "48px", color: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "40px", marginBottom: "32px", paddingBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div style={{ fontSize: ".85rem", fontWeight: 700, color: G.gold, letterSpacing: "2px", marginBottom: "4px" }}>◇ SINWOO Inc. — 신우아이앤씨</div>
              <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "1px" }}>Above &amp; Beyond · 전문 부동산 솔루션 프로바이더</div>
            </div>
            <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
              {[["#about","회사소개"],["#business","서비스"],["#process","프로세스"],["#portfolio","실적"],["#contact","상담신청"]].map(([h,l],i) => (
                <a key={i} href={h} style={{ fontSize: ".72rem", color: "rgba(255,255,255,0.4)", letterSpacing: "1px", transition: "color .3s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = G.gold}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"}>{l}</a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", fontSize: ".68rem", color: "rgba(255,255,255,0.25)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <span>사업자등록번호 192-88-02038</span>
              <span>법인등록번호 110111-7898799</span>
              <span>대표 이성우</span>
              <span>서울특별시 강서구 마곡중앙6로 45 리더스퀘어마곡 6층</span>
            </div>
            <div>©{new Date().getFullYear()} 주식회사 신우아이앤씨. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* ─── SCROLL TO TOP ─── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="맨 위로"
        style={{
          position: "fixed", bottom: "28px", right: "28px", zIndex: 99,
          width: "48px", height: "48px", borderRadius: "50%",
          background: G.gold, color: "#fff", border: "none",
          boxShadow: "0 8px 24px rgba(184,147,90,0.35)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "opacity .4s, transform .4s, box-shadow .3s",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)",
          pointerEvents: showTop ? "auto" : "none",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px) scale(1.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 32px rgba(184,147,90,0.45)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = showTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(184,147,90,0.35)"; }}
      >
        <Ico d={icons.chevronUp} size={20} />
      </button>
    </div>
  );
}
