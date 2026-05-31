import Navigation from "../components/Navigation";
import Link from "next/link";

export const metadata = {
  title: "사업 영역 - 신우아이앤씨",
  description: "신우아이앤씨의 다양한 사업 영역 소개",
};

export default function BusinessPage() {
  const businesses = [
    {
      title: "주거용 부동산 개발",
      description: "아파트, 주택, 공동주택 등 주거 시설 개발",
      icon: "🏢",
      details: [
        "타운하우스 개발",
        "아파트 단지 개발",
        "주거 복합시설 개발",
      ],
    },
    {
      title: "상업용 부동산",
      description: "오피스, 상점, 업무시설 등 상업 시설 개발",
      icon: "🏪",
      details: [
        "오피스텔 개발",
        "상업 건물 개발",
        "업무 복합시설",
      ],
    },
    {
      title: "분양 중개",
      description: "다양한 부동산 프로젝트 분양 중개 서비스",
      icon: "🔑",
      details: [
        "분양 홍보 및 마케팅",
        "계약 중개",
        "고객 상담 및 지원",
      ],
    },
    {
      title: "부동산 컨설팅",
      description: "투자 및 운영 관련 전문적 자문 서비스",
      icon: "📊",
      details: [
        "투자 타당성 검토",
        "시장 분석",
        "운영 전략 수립",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">사업 영역</h1>
          <p className="text-blue-100 text-lg">다양한 부동산 솔루션 제공</p>
        </div>
      </section>

      {/* Business Areas */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {businesses.map((business, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{business.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {business.title}
                </h3>
                <p className="text-gray-600 mb-6">{business.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">주요 서비스:</p>
                  <ul className="space-y-1">
                    {business.details.map((detail, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start">
                        <span className="text-blue-600 mr-2">▸</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">사업 추진 프로세스</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="font-bold text-lg mb-2">기획 및 분석</h3>
              <p className="text-gray-600 text-sm">시장 조사 및 사업 기획</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
              <h3 className="font-bold text-lg mb-2">설계 및 인허가</h3>
              <p className="text-gray-600 text-sm">설계 및 관련 인허가 취득</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
              <h3 className="font-bold text-lg mb-2">시공</h3>
              <p className="text-gray-600 text-sm">품질 관리를 통한 시공</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4</div>
              <h3 className="font-bold text-lg mb-2">분양 및 완공</h3>
              <p className="text-gray-600 text-sm">분양 및 인수도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">포트폴리오</h2>
          <p className="text-center text-gray-600 mb-8">
            현재 진행 중이거나 완료된 프로젝트들을 확인해보세요.
          </p>
          <div className="text-center">
            <Link
              href="/portfolio"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              전체 포트폴리오 보기
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            함께할 프로젝트가 있으신가요?
          </h2>
          <p className="text-blue-100 mb-6">
            신우아이앤씨와 함께 성공적인 프로젝트를 진행하세요.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            문의하기
          </Link>
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
