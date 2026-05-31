import Navigation from "../components/Navigation";
import Link from "next/link";

export const metadata = {
  title: "회사 소개 - 신우아이앤씨",
  description: "신우아이앤씨 회사 정보 및 연혁",
};

export default function AboutPage() {
  const historyItems = [
    { year: "2020", title: "회사 설립", description: "신우아이앤씨 설립" },
    { year: "2021", title: "첫 프로젝트 완료", description: "대규모 주거 개발 프로젝트 성공적으로 완료" },
    { year: "2022", title: "사업 확장", description: "상업용 부동산 개발 사업 시작" },
    { year: "2023", title: "포트폴리오 확대", description: "5개 이상의 주요 프로젝트 진행 중" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">회사 소개</h1>
          <p className="text-blue-100 text-lg">신우아이앤씨와 함께하는 부동산 미래</p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">회사 정보</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">신우아이앤씨</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                신우아이앤씨는 부동산 개발 및 분양 중개 사업을 전문으로 하는 회사입니다.
                오랜 경험과 전문 지식을 바탕으로 고객들에게 최고의 서비스를 제공하고 있습니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                우리는 각 프로젝트의 특성을 정확히 파악하고, 고객의 니즈에 맞는 최적의 솔루션을 제시합니다.
                신뢰와 투명성을 바탕으로 지속적인 성장을 추구하고 있습니다.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6">기본 정보</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">회사명</p>
                  <p className="font-semibold text-gray-900">신우아이앤씨</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">설립연도</p>
                  <p className="font-semibold text-gray-900">2020년</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">사업 분야</p>
                  <p className="font-semibold text-gray-900">부동산 개발, 분양 중개</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">주요 프로젝트</p>
                  <p className="font-semibold text-gray-900">5개 이상</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">연혁</h2>
          <div className="space-y-6">
            {historyItems.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                    {item.year}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">팀 소개</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-blue-600">👔</span>
              </div>
              <h3 className="text-xl font-bold mb-2">경영진</h3>
              <p className="text-gray-600">
                20년 이상의 부동산 산업 경험을 보유한 전문가
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-blue-600">🏗️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">개발팀</h3>
              <p className="text-gray-600">
                프로젝트 기획 및 개발 전문가들로 구성
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-blue-600">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">고객 지원팀</h3>
              <p className="text-gray-600">
                24/7 고객 서비스 제공 담당자들
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            신우아이앤씨와 함께 성장하세요
          </h2>
          <p className="text-blue-100 mb-6">
            우리의 포트폴리오를 살펴보고 함께할 방법을 찾아보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/portfolio"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              포트폴리오 보기
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 신우아이앤씨. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
