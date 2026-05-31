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
        className="relative h-screen bg-cover bg-center flex items-center justify-center px-4"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22%3E%3Crect fill=%22%23667eea%22 width=%221200%22 height=%22600%22/%3E%3C/svg%3E")',
        }}
      >
        <div className="max-w-5xl mx-auto text-center text-white">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            부동산의 가치를<br />
            설계하고 완성합니다
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            사업의 시작과 끝을 책임지는 부동산 전문 파트너
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#portfolio"
              className="px-10 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all text-lg"
            >
              포트폴리오
            </a>
            <a
              href="#contact"
              className="px-10 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/20 transition-all text-lg"
            >
              문의하기
            </a>
          </div>
        </div>
      </section>

      {/* 2. COMPANY */}
      <section id="about" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                대표사업
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                부동산 개발, 분양대행, 투자자문, PM까지<br />
                10년 이상의 경험으로 프로젝트의 가능성을 현실로 만듭니다.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-purple-600">10+</div>
                  <div className="text-gray-700">Years Experience</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-purple-600">30+</div>
                  <div className="text-gray-700">Completed Projects</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 h-96 rounded-xl"></div>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS */}
      <section id="business" className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-20">
            사업영역
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: "🏗️",
                title: "분양대행",
                desc: "신뢰할 수 있는 분양정보와 전문적인 마케팅",
              },
              {
                icon: "💡",
                title: "개발 컨설팅",
                desc: "시장분석과 사업성 검토를 통한 최적화된 전략",
              },
              {
                icon: "💰",
                title: "투자자문",
                desc: "수익성 높은 포트폴리오 구성을 위한 자문",
              },
              {
                icon: "📋",
                title: "개발 PM",
                desc: "기획부터 완공까지 전 과정의 통합 관리",
              },
            ].map((business, idx) => (
              <div key={idx} className="bg-white p-10 rounded-xl shadow-md">
                <div className="text-5xl mb-4">{business.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {business.title}
                </h3>
                <p className="text-gray-700">{business.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PORTFOLIO */}
      <section id="portfolio" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-20">
            포트폴리오
          </h2>
          {loading ? (
            <div className="text-center text-gray-600">로딩 중...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {portfolios.length > 0
                ? portfolios.map((project) => (
                    <div
                      key={project.id}
                      className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-all"
                    >
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-4xl mb-2">🏢</div>
                            <p className="font-semibold">{project.title}</p>
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600">{project.location}</p>
                      </div>
                    </div>
                  ))
                : projectNames.map((project, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-all"
                    >
                      <div className="w-full h-64 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-4xl mb-2">🏢</div>
                          <p className="font-semibold text-sm">{project.title}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
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

      {/* 5. CEO MESSAGE */}
      <section id="ceo-message" className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">CEO 인사말</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 h-80 rounded-xl"></div>
              <div>
                <p className="text-2xl font-bold text-purple-600 mb-4">
                  "고객의 성공이<br />곧 우리의 성공입니다."
                </p>
                <p className="text-gray-700 leading-relaxed">
                  풍부한 경험과 전문성을 바탕으로 프로젝트의 성공을 위한 최적의 솔루션을 제공하겠습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-20">
            문의하기
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">연락처</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1 uppercase">
                    주소
                  </p>
                  <p className="text-gray-800 leading-relaxed">
                    서울특별시 강서구 마곡중앙6로 45<br />
                    리더스퀘어마곡
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1 uppercase">
                    전화
                  </p>
                  <p className="text-gray-800">02-6941-0884</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1 uppercase">
                    이메일
                  </p>
                  <p className="text-gray-800">sinwooinc2014@naver.com</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">간단한 문의</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="이름"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <input
                  type="email"
                  placeholder="이메일"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <textarea
                  placeholder="문의 내용"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-all text-lg"
                >
                  문의하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-800">
            <div>
              <h3 className="text-white font-bold mb-4">신우아이앤씨</h3>
              <p className="text-sm">부동산 개발 | 분양대행 | 투자자문 | 개발 PM</p>
            </div>
            <div className="flex justify-end gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="text-sm text-center text-gray-400">
            <p>&copy; 2024 신우아이앤씨. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
