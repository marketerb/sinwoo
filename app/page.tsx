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

      {/* 1. HERO: 강력한 오프닝 */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            부동산의 가치를<br/>설계하고<br/>프로젝트의 성공을<br/>완성합니다
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            개발 컨설팅부터 분양대행, 투자자문, PM까지<br/>사업의 시작과 끝을 책임지는 부동산 전문 파트너입니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#portfolio"
              className="bg-white text-blue-900 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors text-lg"
            >
              포트폴리오 보기
            </a>
            <a
              href="#contact"
              className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition-colors text-lg"
            >
              문의하기
            </a>
          </div>
        </div>
      </section>

      {/* 2. COMPANY: 소개 및 주요 지표 */}
      <section id="about" className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">회사소개</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              10년 이상의 경험으로 프로젝트의 가능성을 현실로 만듭니다.
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              시장분석, 개발기획, 투자자문, 분양마케팅, 프로젝트 관리까지<br/>
              사업 전 과정에 대한 통합 솔루션을 제공합니다.
            </p>
          </div>

          {/* 주요 지표 */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-blue-600 mb-4">10+</div>
              <p className="text-gray-700 font-semibold">Years Experience</p>
              <p className="text-gray-600 text-sm mt-2">다년간의 시장 경험</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-blue-600 mb-4">30+</div>
              <p className="text-gray-700 font-semibold">Projects</p>
              <p className="text-gray-600 text-sm mt-2">성공적인 프로젝트</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-blue-600 mb-4">🌍</div>
              <p className="text-gray-700 font-semibold">Nationwide Network</p>
              <p className="text-gray-600 text-sm mt-2">전국 네트워크</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-blue-600 mb-4">👥</div>
              <p className="text-gray-700 font-semibold">Client Focused</p>
              <p className="text-gray-600 text-sm mt-2">고객 중심 서비스</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUE: 핵심 가치 */}
      <section id="values" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">핵심 가치</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">👤</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">사람 중심의 가치</h3>
              <p className="text-gray-600">고객과 직원을 소중히 여기는 경영 철학</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">고객과 함께 성장</h3>
              <p className="text-gray-600">고객의 성공이 곧 우리의 성장</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🔗</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">전문가 네트워크</h3>
              <p className="text-gray-600">업계 최고 수준의 전문가 팀</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">📈</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">시장 선도 역량</h3>
              <p className="text-gray-600">시장을 주도하는 혁신적 솔루션</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY SINWOO: 선택 이유 */}
      <section id="why" className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">신우아이앤씨를 선택해야 하는 이유</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">시장분석 기반 전략수립</h3>
              <p className="text-gray-600 leading-relaxed">
                시장 동향을 꿰뚫는 분석력으로 최적의 사업 전략을 수립합니다.
                데이터 기반의 의사결정으로 성공률을 극대화합니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">최유효 이용방안 도출</h3>
              <p className="text-gray-600 leading-relaxed">
                부동산의 가치를 극대화할 수 있는 최적의 활용 방안을 제시합니다.
                프로젝트마다 맞춤형 솔루션을 개발합니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">📢</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">맞춤형 마케팅 전략</h3>
              <p className="text-gray-600 leading-relaxed">
                타겟 고객의 심리를 파악한 정교한 마케팅 전략으로
                분양 성공률을 높입니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">사업 전 과정 통합 운영</h3>
              <p className="text-gray-600 leading-relaxed">
                기획부터 사후관리까지 한곳에서 통합적으로 관리하여
                효율성과 신뢰성을 보장합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BUSINESS: 사업 영역 */}
      <section id="business" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">사업 영역</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold mb-3">분양대행</h3>
              <p className="text-blue-100 leading-relaxed">
                신뢰할 수 있는 분양정보와 전문적인 마케팅으로
                최단 시간 내 분양 성공을 달성합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold mb-3">부동산 개발 컨설팅</h3>
              <p className="text-blue-100 leading-relaxed">
                시장분석과 사업성 검토를 통해 개발 프로젝트의
                최적화된 전략을 제시합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3">부동산 투자자문</h3>
              <p className="text-blue-100 leading-relaxed">
                장기적이고 수익성 높은 투자 포트폴리오 구성을 위한
                전문가 자문을 제공합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-2xl font-bold mb-3">부동산 개발 PM</h3>
              <p className="text-blue-100 leading-relaxed">
                기획부터 완공까지 전 과정의 프로젝트 관리로
                성공적인 사업 추진을 보장합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROCESS: 사업 진행 프로세스 */}
      <section id="process" className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">사업 진행 프로세스</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            {[
              { num: "1", title: "시장조사", desc: "시장 현황 분석" },
              { num: "2", title: "사업성 검토", desc: "수익성 검증" },
              { num: "3", title: "전략수립", desc: "실행 계획 수립" },
              { num: "4", title: "마케팅기획", desc: "마케팅 전략 수립" },
              { num: "5", title: "분양운영", desc: "분양 진행 운영" },
              { num: "6", title: "사후관리", desc: "완료 후 관리" },
            ].map((step, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 hover:bg-blue-700 transition-colors">
                  {step.num}
                </div>
                <h3 className="font-bold text-gray-900 text-center mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm text-center">{step.desc}</p>
                {idx < 5 && <div className="hidden md:block w-8 h-1 bg-blue-300 mt-4 mx-2"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO: 포트폴리오 */}
      <section id="portfolio" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">포트폴리오</h2>
          {loading ? (
            <div className="text-center text-gray-600">로딩 중...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {portfolios.length > 0
                ? portfolios.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow hover:border-blue-600"
                    >
                      {project.image_url && (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2 text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{project.location}</p>
                        <span className="inline-block text-xs font-bold px-4 py-2 bg-blue-100 text-blue-600 rounded-full">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))
                : projectNames.map((project, idx) => (
                    <div
                      key={idx}
                      className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow hover:border-blue-600"
                    >
                      <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-48 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-4xl mb-2">🏢</div>
                          <p className="font-semibold">{project.title}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2 text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{project.location}</p>
                        <span className="inline-block text-xs font-bold px-4 py-2 bg-blue-100 text-blue-600 rounded-full">
                          완공
                        </span>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </section>

      {/* 8. CEO MESSAGE: CEO 메시지 */}
      <section id="ceo-message" className="py-24 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">CEO 메시지</h2>
          <p className="text-2xl leading-relaxed mb-8">
            "고객의 성공이 곧 우리의 성장입니다."
          </p>
          <p className="text-lg text-blue-100 leading-relaxed">
            풍부한 경험과 전문성을 바탕으로 프로젝트의 성공을 위한<br/>
            최적의 솔루션을 제공하겠습니다.
          </p>
        </div>
      </section>

      {/* 9. CONTACT: 문의 */}
      <section id="contact" className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">문의하기</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">연락처</h3>
              <div className="space-y-6 text-gray-700">
                <div>
                  <p className="text-sm text-gray-600 mb-1">회사명</p>
                  <p className="text-lg font-semibold">주식회사 신우아이앤씨</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">주소</p>
                  <p className="text-lg font-semibold">서울특별시 강서구 마곡중앙6로 45<br/>리더스퀘어마곡</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">전화</p>
                  <p className="text-lg font-semibold">02-6941-0884</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">이메일</p>
                  <p className="text-lg font-semibold">sinwooinc2014@naver.com</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">간단한 문의</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="이름"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
                <input
                  type="email"
                  placeholder="이메일"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
                <input
                  type="tel"
                  placeholder="전화번호"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
                <textarea
                  placeholder="문의 내용"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg"
                >
                  문의하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-semibold">&copy; 2024 신우아이앤씨. All rights reserved.</p>
          <p className="text-sm mt-2">분양대행 | 부동산 개발 컨설팅 | 투자자문 | 개발 PM</p>
        </div>
      </footer>
    </div>
  );
}
