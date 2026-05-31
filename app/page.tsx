import Navigation from "./components/Navigation";
import Link from "next/link";

export const metadata = {
  title: "신우아이앤씨 - 부동산 개발 & 분양 전문",
  description: "신우아이앤씨는 부동산 개발 및 분양 중개 사업을 전문으로 하는 회사입니다.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            신우아이앤씨
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            믿을 수 있는 부동산 개발 및 분양 전문가
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

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">주요 서비스</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-4">01</div>
              <h3 className="text-xl font-bold mb-2">부동산 개발</h3>
              <p className="text-gray-600">
                전문적인 노하우로 우수한 부동산 프로젝트를 개발하고 있습니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-4">02</div>
              <h3 className="text-xl font-bold mb-2">분양 중개</h3>
              <p className="text-gray-600">
                신뢰성 있는 분양 정보와 전문가 상담으로 최적의 거래를 중개합니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-4">03</div>
              <h3 className="text-xl font-bold mb-2">자문 서비스</h3>
              <p className="text-gray-600">
                경험 많은 전문가들이 최적의 부동산 자문을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            더 자세한 정보가 필요하신가요?
          </h2>
          <p className="text-blue-100 mb-6">
            저희 전문가 팀이 항상 준비되어 있습니다.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            지금 문의하기
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
