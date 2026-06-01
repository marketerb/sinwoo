"use client";

import Navigation from "./components/Navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
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

  // 프리미엄 그래디언트 색상 배열
  const gradients = [
    "from-yellow-700 via-yellow-600 to-yellow-800",
    "from-amber-700 via-yellow-600 to-amber-900",
    "from-orange-700 via-amber-600 to-orange-900",
    "from-yellow-600 via-amber-500 to-yellow-800",
    "from-amber-600 via-yellow-500 to-amber-800",
    "from-orange-600 via-yellow-500 to-orange-800",
  ];

  const projectNames = [
    { title: "보라매 파르크힐", location: "서울 동작구" },
    { title: "이문 아이파크 자이", location: "서울 종로구" },
    { title: "천안 힐스테이트 두정역", location: "충남 천안시" },
    { title: "신광교 클라우드시티", location: "광주 광산구" },
    { title: "신길 AK 푸르지오", location: "서울 영등포구" },
    { title: "상도 푸르지오 클라베뉴", location: "서울 동작구" },
    { title: "강남 한우리아", location: "서울 강남구" },
    { title: "서초 래미안 강변", location: "서울 서초구" },
    { title: "부천 크린시티", location: "경기 부천시" },
    { title: "안양 푸르지오 평촌", location: "경기 안양시" },
    { title: "인천 송도 팰리스", location: "인천 연수구" },
    { title: "대전 한강변 아파트", location: "대전 유성구" },
    { title: "대구 수성 클라우드", location: "대구 수성구" },
    { title: "부산 동해 일루미네이션", location: "부산 해운대구" },
    { title: "울산 남구 이지스", location: "울산 남구" },
    { title: "광주 북구 동산", location: "광주 북구" },
    { title: "대전 유성 뉴타운", location: "대전 유성구" },
    { title: "세종 행복도시 센트럴", location: "세종 중앙동" },
    { title: "경주 불국사 뷰", location: "경주 불국동" },
    { title: "포항 해상 프리미엄", location: "포항 북구" },
    { title: "전주 전주시 한옥마을", location: "전주 완산구" },
    { title: "여수 신항 해양타운", location: "여수 해양시" },
    { title: "순천 신도시 중심", location: "순천 중앙동" },
    { title: "나주 산업도시 프로젝트", location: "나주 고동" },
    { title: "무안 신도시 발전", location: "무안 읍내" },
    { title: "청주 흥덕구 평택", location: "청주 흥덕구" },
    { title: "천안 아산신도시", location: "아산 공주면" },
    { title: "공주 유교문화 주거", location: "공주 중앙동" },
    { title: "보령 해양관광도시", location: "보령 신진" },
    { title: "강릉 해변 복합도시", location: "강릉 중앙동" },
    { title: "원주 신도시 중심부", location: "원주 단계동" },
    { title: "춘천 호반도시", location: "춘천 중앙동" },
    { title: "속초 해안 프로젝트", location: "속초 교동" },
    { title: "동해 해양도시", location: "동해 중앙동" },
  ];

  return (
    <div className="bg-white">
      <Navigation />

      {/* 1. HERO - PREMIUM DESIGN */}
      <section
        id="home"
        className="relative h-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4 overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(15,17,22,0.75) 0%, rgba(212,175,55,0.15) 100%), url("https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&h=1080&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Premium gradient overlay with depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40"></div>

        {/* Animated accent elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-yellow-700/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-yellow-600/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto text-center text-white relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-fade-in" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-1px' }}>
            부동산의 가치를<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 animate-text-glow">
              설계하고 완성합니다
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto animate-fade-in animation-delay-200 font-light" style={{ letterSpacing: '0.5px' }}>
            사업의 시작과 끝을 책임지는 부동산 전문 파트너
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in animation-delay-400">
            <a
              href="#portfolio"
              className="px-10 py-4 bg-gradient-to-r from-yellow-600 to-yellow-800 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 text-lg shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10">포트폴리오</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="#contact"
              className="px-10 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/15 transition-all duration-300 text-lg backdrop-blur-md hover:shadow-lg group"
            >
              <span className="flex items-center gap-2">
                문의하기
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Premium scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-float">
          <span className="text-white text-xs font-semibold tracking-widest mb-3 opacity-70">SCROLL</span>
          <div className="border-2 border-white/50 rounded-full p-2 hover:border-yellow-300/50 transition-colors">
            <svg
              className="w-5 h-5 text-white animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. COMPANY - PREMIUM DESIGN */}
      <section id="about" className="py-32 px-4 bg-white relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl -z-10 opacity-50"></div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <span className="text-yellow-700 font-semibold tracking-widest uppercase text-sm">회사 소개</span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                대표사업
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-10" style={{ letterSpacing: '0.3px' }}>
                부동산 개발, 분양대행, 투자자문, PM까지<br className="hidden md:block" />
                <span className="font-semibold">10년 이상의 경험</span>으로 프로젝트의 가능성을 현실로 만듭니다.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-6 group">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-800">10+</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Years</div>
                    <div className="text-gray-700 font-medium">Experience & Expertise</div>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-800">30+</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Projects</div>
                    <div className="text-gray-700 font-medium">Completed Successfully</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group animate-slide-up animation-delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-700/20 to-yellow-900/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-900 h-96 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 text-yellow-200 opacity-10">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h18v18H3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS - PREMIUM CARDS */}
      <section id="business" className="py-32 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-slide-up">
            <span className="text-yellow-700 font-semibold tracking-widest uppercase text-sm">전문 영역</span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              사업영역
            </h2>
            <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
              신우아이앤씨는 부동산 산업의 모든 영역에서 최고의 서비스를 제공합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🏗️",
                title: "분양대행",
                desc: "신뢰할 수 있는 분양정보와 전문적인 마케팅으로 최대의 수익을 창출합니다.",
              },
              {
                icon: "💡",
                title: "개발 컨설팅",
                desc: "시장분석과 사업성 검토를 통한 최적화된 전략 수립으로 사업 성공을 보장합니다.",
              },
              {
                icon: "💰",
                title: "투자자문",
                desc: "수익성 높은 포트폴리오 구성을 위한 맞춤형 자문 서비스를 제공합니다.",
              },
              {
                icon: "📋",
                title: "개발 PM",
                desc: "기획부터 완공까지 전 과정의 통합 관리로 프로젝트 완벽 수행을 실현합니다.",
              },
            ].map((business, idx) => (
              <div
                key={idx}
                className="card-premium bg-white p-10 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start gap-6 h-full flex-col">
                  <div className="text-5xl">{business.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {business.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{business.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PORTFOLIO - PREMIUM GRID */}
      <section id="portfolio" className="py-32 px-4 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl -z-10 opacity-40"></div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-slide-up">
            <span className="text-yellow-700 font-semibold tracking-widest uppercase text-sm">프로젝트 포트폴리오</span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              포트폴리오
            </h2>
            <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
              신우아이앤씨의 성공적인 프로젝트들을 살펴보세요.
            </p>
          </div>
          {loading ? (
            <div className="text-center text-gray-600 py-12">로딩 중...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {portfolios.length > 0
                ? portfolios.map((project, idx) => (
                    <div
                      key={project.id}
                      className="card-premium overflow-hidden animate-slide-up"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-4xl mb-2">🏢</div>
                            <p className="font-semibold text-sm px-2 line-clamp-2">{project.title}</p>
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600">{project.location}</p>
                      </div>
                    </div>
                  ))
                : projectNames.map((project, idx) => (
                    <div
                      key={idx}
                      className="card-premium overflow-hidden group animate-slide-up"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className={`w-full h-64 bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center overflow-hidden relative`}>
                        <div className="text-white text-center relative z-10">
                          <div className="text-4xl mb-2">🏢</div>
                          <p className="font-semibold text-sm px-2 line-clamp-2">{project.title}</p>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600">{project.location}</p>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. CEO MESSAGE - PREMIUM */}
      <section id="ceo-message" className="py-32 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-600/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-12 md:p-16 shadow-2xl border border-yellow-100/20 animate-slide-up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative group order-2 md:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-yellow-500 to-yellow-700 h-80 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
              <div className="order-1 md:order-2 animate-slide-up animation-delay-200">
                <span className="text-yellow-700 font-semibold tracking-widest uppercase text-sm">CEO 메시지</span>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "고객의 성공이<br />곧 우리의 성공입니다."
                </p>
                <p className="text-gray-700 leading-relaxed text-lg" style={{ letterSpacing: '0.3px' }}>
                  풍부한 경험과 전문성을 바탕으로 프로젝트의 성공을 위한 최적의 솔루션을 제공하겠습니다. 신우아이앤씨는 고객과의 신뢰 관계를 최우선으로 생각하며, 언제나 고객의 편에서 최선의 노력을 다하겠습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT - PREMIUM FORM */}
      <section id="contact" className="py-32 px-4 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl -z-10 opacity-40"></div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-slide-up">
            <span className="text-yellow-700 font-semibold tracking-widest uppercase text-sm">문의</span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              문의하기
            </h2>
            <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
              언제든지 편하게 연락주세요. 최고의 서비스로 응답하겠습니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="animate-slide-up">
              <h3 className="text-2xl font-bold text-gray-900 mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>연락처</h3>
              <div className="space-y-8">
                <div className="group">
                  <p className="text-sm text-yellow-700 font-semibold mb-2 uppercase tracking-wider">주소</p>
                  <p className="text-gray-800 leading-relaxed text-lg font-medium">
                    서울특별시 강서구 마곡중앙6로 45<br />
                    리더스퀘어마곡
                  </p>
                </div>
                <div className="group">
                  <p className="text-sm text-yellow-700 font-semibold mb-2 uppercase tracking-wider">전화</p>
                  <a href="tel:0269410884" className="text-gray-800 text-lg font-medium hover:text-yellow-700 transition-colors">
                    02-6941-0884
                  </a>
                </div>
                <div className="group">
                  <p className="text-sm text-yellow-700 font-semibold mb-2 uppercase tracking-wider">이메일</p>
                  <a href="mailto:sinwooinc2014@naver.com" className="text-gray-800 text-lg font-medium hover:text-yellow-700 transition-colors">
                    sinwooinc2014@naver.com
                  </a>
                </div>
              </div>
            </div>
            <div className="animate-slide-up animation-delay-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>간단한 문의</h3>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="이름"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-700 focus:bg-white transition-all text-gray-900 placeholder-gray-500"
                  required
                />
                <input
                  type="email"
                  placeholder="이메일"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-700 focus:bg-white transition-all text-gray-900 placeholder-gray-500"
                  required
                />
                <textarea
                  placeholder="문의 내용"
                  rows={4}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-700 focus:bg-white transition-all text-gray-900 placeholder-gray-500 resize-none"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all duration-300 text-lg shadow-lg hover:from-yellow-700 hover:to-yellow-900 relative overflow-hidden group"
                >
                  <span className="relative z-10">문의하기</span>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - PREMIUM */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-16 px-4 relative overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-700/50 to-transparent"></div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-gray-800">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏢</span>
                <h3 className="text-white font-bold text-lg">신우아이앤씨</h3>
              </div>
              <p className="text-sm text-gray-400">
                부동산 개발 | 분양대행 | 투자자문 | 개발 PM
              </p>
            </div>
            <div className="hidden md:block">
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">빠른 링크</h4>
              <div className="space-y-2">
                <a href="#about" className="text-gray-400 hover:text-yellow-500 transition text-sm">회사소개</a>
                <a href="#business" className="text-gray-400 hover:text-yellow-500 transition text-sm block">사업영역</a>
                <a href="#portfolio" className="text-gray-400 hover:text-yellow-500 transition text-sm block">포트폴리오</a>
              </div>
            </div>
            <div className="flex justify-end gap-6">
              <a href="https://www.linkedin.com/company/sinwooinc/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors hover:scale-110 duration-300" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://twitter.com/sinwooinc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors hover:scale-110 duration-300" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </a>
              <a href="https://www.facebook.com/sinwooinc/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors hover:scale-110 duration-300" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="text-sm text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} 신우아이앤씨. All rights reserved.</p>
            <p className="text-xs mt-2">부동산 개발 전문 파트너 | Trusted Real Estate Development Partner</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
