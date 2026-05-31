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

  return (
    <div className="bg-white">
      <Navigation />

      {/* HOME: Hero Section */}
      <section id="home" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">신우아이앤씨</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            믿을 수 있는 부동산 개발 및 분양 전문가
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#portfolio"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
            >
              포트폴리오 보기
            </a>
            <a
              href="#contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block"
            >
              문의하기
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT: 회사소개 */}
      <section id="about" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">회사소개</h2>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">신우아이앤씨</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                주식회사 신우아이앤씨는 부동산 개발 및 분양 중개 사업을 전문으로 하는 회사입니다.
                20년 이상의 경험과 신뢰를 바탕으로 최고 수준의 서비스를 제공하고 있습니다.
              </p>
              <p className="text-gray-600">
                <strong>주소:</strong> 서울특별시 강서구 마곡중앙6로 45<br/>
                <strong>전화:</strong> 02-6941-0884<br/>
                <strong>이메일:</strong> sinwooinc2014@naver.com
              </p>
            </div>
            <div className="bg-blue-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-blue-600">주요 성과</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ 35개 이상 성공적인 부동산 프로젝트</li>
                <li>✓ 2,000+ 고객 만족도 99% 이상</li>
                <li>✓ 업계 최고 수준의 전문 인력</li>
                <li>✓ 신뢰와 투명성의 경영 원칙</li>
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <h3 className="text-3xl font-bold text-center mb-12">연혁</h3>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="text-right w-24 font-bold text-blue-600 text-lg">2014년</div>
              <div className="pb-6 border-l-4 border-blue-600 pl-6">
                <p className="text-gray-700">주식회사 신우아이앤씨 설립</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-right w-24 font-bold text-blue-600 text-lg">2016년</div>
              <div className="pb-6 border-l-4 border-blue-600 pl-6">
                <p className="text-gray-700">10개 프로젝트 완료, 업계 진출</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-right w-24 font-bold text-blue-600 text-lg">2020년</div>
              <div className="pb-6 border-l-4 border-blue-600 pl-6">
                <p className="text-gray-700">25개 프로젝트 누적 완료</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-right w-24 font-bold text-blue-600 text-lg">2024년</div>
              <div className="pb-6 border-l-4 border-blue-600 pl-6">
                <p className="text-gray-700">35개 이상 프로젝트 완료, 업계 선두 기업</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS: 사업영역 */}
      <section id="business" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">사업영역</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border-2 border-blue-200">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">부동산 개발</h3>
              <p className="text-gray-700">
                전문적인 노하우와 시장 분석을 통해 수익성 높은 부동산 프로젝트를 개발합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border-2 border-blue-200">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">분양 중개</h3>
              <p className="text-gray-700">
                신뢰성 있는 분양 정보와 전문가 상담으로 최적의 거래를 중개합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border-2 border-blue-200">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">자문 서비스</h3>
              <p className="text-gray-700">
                경험 많은 전문가들이 투자, 운영, 거래 등 모든 분야의 자문을 제공합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border-2 border-blue-200">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">프로젝트 관리</h3>
              <p className="text-gray-700">
                기획부터 준공까지 전 과정을 통합적으로 관리합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS: 진행절차 */}
      <section id="process" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">부동산 개발 프로세스</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
              <h3 className="font-bold text-gray-800 mb-2">시장분석</h3>
              <p className="text-sm text-gray-600">시장 동향 및 입지 분석</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
              <h3 className="font-bold text-gray-800 mb-2">기획/설계</h3>
              <p className="text-sm text-gray-600">최적의 개발 계획 수립</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
              <h3 className="font-bold text-gray-800 mb-2">인허가</h3>
              <p className="text-sm text-gray-600">행정 절차 및 허가 획득</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
              <h3 className="font-bold text-gray-800 mb-2">시공</h3>
              <p className="text-sm text-gray-600">고품질 건설 수행</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">5</div>
              <h3 className="font-bold text-gray-800 mb-2">분양</h3>
              <p className="text-sm text-gray-600">성공적인 분양 완료</p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO: 포트폴리오 */}
      <section id="portfolio" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">포트폴리오</h2>
          {loading ? (
            <div className="text-center text-gray-600">로딩 중...</div>
          ) : portfolios.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {portfolios.slice(0, 6).map((portfolio) => (
                <div key={portfolio.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {portfolio.image_url && (
                    <img src={portfolio.image_url} alt={portfolio.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{portfolio.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{portfolio.location}</p>
                    <p className="text-sm text-gray-700">{portfolio.description?.substring(0, 80)}...</p>
                    <span className="inline-block mt-3 text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-600 rounded">
                      {portfolio.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">포트폴리오가 없습니다.</div>
          )}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">더 많은 프로젝트 보기</p>
            <a href="/dashboard" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              관리자 대시보드
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT: 문의 및 CTA */}
      <section id="contact" className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">문의하기</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">연락처</h3>
              <div className="space-y-4 text-blue-100">
                <p><strong>회사명:</strong> 주식회사 신우아이앤씨</p>
                <p><strong>주소:</strong> 서울특별시 강서구 마곡중앙6로 45, 에이동 6층 603-씨10호</p>
                <p><strong>전화:</strong> 02-6941-0884</p>
                <p><strong>이메일:</strong> sinwooinc2014@naver.com</p>
                <p><strong>영업시간:</strong> 월-금 09:00 ~ 18:00</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">간단한 문의</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="이름"
                  className="w-full px-4 py-2 rounded-lg text-gray-800"
                  required
                />
                <input
                  type="email"
                  placeholder="이메일"
                  className="w-full px-4 py-2 rounded-lg text-gray-800"
                  required
                />
                <textarea
                  placeholder="문의 내용"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg text-gray-800"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 font-bold py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  문의하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 신우아이앤씨. All rights reserved.</p>
          <p className="text-sm mt-2">부동산 개발 | 분양 중개 | 자문 서비스</p>
        </div>
      </footer>
    </div>
  );
}
