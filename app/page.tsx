"use client";

import Navigation from "./components/Navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPortfolios();
    setupIntersectionObserver();
  }, []);

  async function fetchPortfolios() {
    try {
      const response = await fetch("/api/portfolios");
      if (response.ok) {
        const data = await response.json();
        setPortfolios(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch portfolios:", error);
    } finally {
      setLoading(false);
    }
  }

  function setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
  }

  const isVisible = (id: string) => visibleSections.has(id);

  const projectNames = [
    { title: "보라매 파르크힐", location: "서울" },
    { title: "이문 아이파크 자이", location: "서울" },
    { title: "천안 힐스테이트 두정역", location: "천안" },
    { title: "신광교 클라우드시티", location: "광주" },
    { title: "신길 AK 푸르지오", location: "서울" },
    { title: "상도 푸르지오 클라베뉴", location: "서울" },
  ];

  return (
    <div className="bg-white">
      <Navigation />

      {/* 1. HERO */}
      <section
        id="home"
        className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4 pt-16 overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1
            className={`text-6xl md:text-7xl font-bold mb-8 leading-tight transition-all duration-1000 ${
              isVisible("home")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            부동산의 가치를<br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              설계하고
            </span>
            <br />
            완성합니다
          </h1>
          <p
            className={`text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible("home")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            개발 컨설팅부터 분양대행, 투자자문, PM까지<br />
            사업의 시작과 끝을 책임지는 부동산 전문 파트너
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${
              isVisible("home")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="#portfolio"
              className="px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/50 text-lg"
            >
              포트폴리오 보기
            </a>
            <a
              href="#contact"
              className="px-10 py-4 border-2 border-blue-400 text-blue-300 font-bold rounded-lg hover:bg-blue-600/20 transition-all text-lg"
            >
              문의하기
            </a>
          </div>
        </div>
      </section>

      {/* 2. COMPANY */}
      <section
        id="about"
        className={`py-32 px-4 bg-white transition-all duration-1000 ${
          isVisible("about") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              회사소개
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              10년 이상의 경험으로 프로젝트의 가능성을 현실로 만듭니다
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {[
              { num: "10+", label: "Years Experience", desc: "다년간의 실전 경험" },
              { num: "30+", label: "Projects", desc: "성공한 프로젝트" },
              { num: "∞", label: "Network", desc: "전국 파트너 네트워크" },
              { num: "100%", label: "Satisfaction", desc: "고객 중심 서비스" },
            ].map((metric, idx) => (
              <div
                key={idx}
                className={`bg-slate-50 border border-slate-200 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-500 delay-${idx * 100} ${
                  isVisible("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="text-5xl font-bold text-blue-600 mb-3">
                  {metric.num}
                </div>
                <p className="text-slate-900 font-semibold mb-1">{metric.label}</p>
                <p className="text-slate-600 text-sm">{metric.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-700 leading-relaxed max-w-3xl mx-auto text-lg">
            시장분석, 개발기획, 투자자문, 분양마케팅, 프로젝트 관리까지<br />
            <span className="font-semibold">사업 전 과정에 대한 통합 솔루션</span>을 제공합니다.
          </p>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section
        id="values"
        className={`py-32 px-4 bg-slate-50 transition-all duration-1000 ${
          isVisible("values") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-slate-900 mb-20">
            핵심 가치
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "👤", title: "사람 중심", desc: "고객과 직원을 소중히" },
              { icon: "🤝", title: "함께 성장", desc: "고객의 성공이 우리의 성장" },
              { icon: "🔗", title: "전문가 네트워크", desc: "업계 최고 수준의 팀" },
              { icon: "📈", title: "시장 선도", desc: "혁신적 솔루션 제시" },
            ].map((value, idx) => (
              <div
                key={idx}
                className={`text-center transition-all duration-700 delay-${idx * 100} ${
                  isVisible("values") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUSINESS */}
      <section
        id="business"
        className={`py-32 px-4 bg-white transition-all duration-1000 ${
          isVisible("business") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-slate-900 mb-20">
            사업 영역
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🏗️",
                title: "분양대행",
                desc: "신뢰할 수 있는 분양정보와 전문적인 마케팅으로 최단 시간 내 분양 성공",
              },
              {
                icon: "💡",
                title: "개발 컨설팅",
                desc: "시장분석과 사업성 검토를 통해 최적화된 개발 전략 제시",
              },
              {
                icon: "💰",
                title: "투자자문",
                desc: "장기적이고 수익성 높은 포트폴리오 구성을 위한 전문가 자문",
              },
              {
                icon: "📋",
                title: "개발 PM",
                desc: "기획부터 완공까지 전 과정의 프로젝트 관리로 성공 보장",
              },
            ].map((business, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-10 rounded-xl hover:shadow-lg transition-all duration-500 delay-${idx * 100} ${
                  isVisible("business")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="text-5xl mb-4">{business.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {business.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">{business.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS */}
      <section id="process" className="py-32 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-slate-900 mb-20">
            사업 프로세스
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              "시장조사",
              "사업성 검토",
              "전략수립",
              "마케팅기획",
              "분양운영",
              "사후관리",
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 hover:bg-blue-700 transition-colors">
                  {idx + 1}
                </div>
                <p className="font-semibold text-slate-900 text-center text-sm md:text-base">
                  {step}
                </p>
                {idx < 5 && (
                  <div className="hidden md:block w-8 h-0.5 bg-blue-300 mt-4 mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PORTFOLIO */}
      <section
        id="portfolio"
        className={`py-32 px-4 bg-white transition-all duration-1000 ${
          isVisible("portfolio") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-slate-900 mb-20">
            포트폴리오
          </h2>
          {loading ? (
            <div className="text-center text-slate-600">로딩 중...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {portfolios.length > 0
                ? portfolios.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all"
                    >
                      {project.image_url && (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-slate-900 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4">
                          {project.location}
                        </p>
                        <span className="inline-block text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))
                : projectNames.map((project, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all"
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-48 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-4xl mb-2">🏢</div>
                          <p className="font-semibold">{project.title}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-slate-900 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4">
                          {project.location}
                        </p>
                        <span className="inline-block text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                          완공
                        </span>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. CEO MESSAGE */}
      <section id="ceo-message" className="py-32 px-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">CEO 메시지</h2>
          <p className="text-2xl md:text-3xl leading-relaxed mb-8 text-slate-300">
            "고객의 성공이 곧 우리의 성장입니다."
          </p>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            풍부한 경험과 전문성을 바탕으로<br />
            프로젝트의 성공을 위한 최적의 솔루션을 제공하겠습니다.
          </p>
        </div>
      </section>

      {/* 8. CONTACT */}
      <section
        id="contact"
        className={`py-32 px-4 bg-slate-50 transition-all duration-1000 ${
          isVisible("contact") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-slate-900 mb-20">
            문의하기
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8">연락처</h3>
              <div className="space-y-6 text-slate-700">
                <div>
                  <p className="text-sm text-slate-600 font-semibold mb-1 uppercase">
                    회사명
                  </p>
                  <p className="text-lg font-semibold">주식회사 신우아이앤씨</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 font-semibold mb-1 uppercase">
                    주소
                  </p>
                  <p className="text-lg font-semibold">
                    서울특별시 강서구 마곡중앙6로 45<br />
                    리더스퀘어마곡
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 font-semibold mb-1 uppercase">
                    전화
                  </p>
                  <p className="text-lg font-semibold">02-6941-0884</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 font-semibold mb-1 uppercase">
                    이메일
                  </p>
                  <p className="text-lg font-semibold">sinwooinc2014@naver.com</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8">간단한 문의</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="이름"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <input
                  type="email"
                  placeholder="이메일"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <input
                  type="tel"
                  placeholder="전화번호"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <textarea
                  placeholder="문의 내용"
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg text-lg"
                >
                  문의하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-semibold text-slate-300">
            &copy; 2024 신우아이앤씨. All rights reserved.
          </p>
          <p className="text-sm mt-3">
            분양대행 | 부동산 개발 컨설팅 | 투자자문 | 개발 PM
          </p>
        </div>
      </footer>
    </div>
  );
}
