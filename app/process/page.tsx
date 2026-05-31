import Navigation from "../components/Navigation";
import Link from "next/link";

export const metadata = {
  title: "진행 절차 - 신우아이앤씨",
  description: "신우아이앤씨의 부동산 개발 진행 절차",
};

export default function ProcessPage() {
  const processes = [
    {
      phase: 1,
      title: "프로젝트 기획 및 분석",
      duration: "3-4개월",
      details: [
        "시장 조사 및 분석",
        "입지 분석",
        "사업타당성 검토",
        "기본계획 수립",
      ],
      color: "blue",
    },
    {
      phase: 2,
      title: "부지 확보 및 인허가",
      duration: "2-6개월",
      details: [
        "부지 선정 및 매입",
        "기본설계",
        "관련 인허가 신청",
        "각종 심의 및 승인",
      ],
      color: "indigo",
    },
    {
      phase: 3,
      title: "설계 및 시공",
      duration: "6-24개월",
      details: [
        "상세설계",
        "시공사 선정",
        "본격적인 시공",
        "품질 관리",
        "공정 관리",
      ],
      color: "purple",
    },
    {
      phase: 4,
      title: "분양 및 마케팅",
      duration: "3-12개월",
      details: [
        "분양 공급",
        "마케팅 및 홍보",
        "계약 체결",
        "고객 상담",
      ],
      color: "pink",
    },
    {
      phase: 5,
      title: "준공 및 인수도",
      duration: "1-3개월",
      details: [
        "준공 검사",
        "하자보수",
        "인수도",
        "사후관리",
      ],
      color: "green",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
      indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
      purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
      pink: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
      green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
    };
    return colorMap[color];
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">진행 절차</h1>
          <p className="text-blue-100 text-lg">신우아이앤씨의 체계적인 사업 진행 프로세스</p>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">부동산 개발 프로세스</h2>
          <p className="text-gray-600 text-center mb-12">
            기획부터 준공까지 체계적이고 전문적인 진행 절차를 따릅니다.
          </p>

          <div className="space-y-8">
            {processes.map((process, index) => {
              const colors = getColorClasses(process.color);
              return (
                <div key={index} className="relative">
                  {/* Timeline connector */}
                  {index < processes.length - 1 && (
                    <div className="absolute left-6 top-20 w-1 h-16 bg-gray-300"></div>
                  )}

                  <div className={`${colors.bg} border-2 ${colors.border} p-8 rounded-lg`}>
                    <div className="flex gap-6">
                      {/* Phase number */}
                      <div className="flex-shrink-0">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.text} bg-white font-bold text-lg border-2 ${colors.border}`}>
                          {process.phase}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {process.title}
                            </h3>
                            <p className={`${colors.text} font-semibold mb-4`}>
                              소요 기간: {process.duration}
                            </p>
                            <div className="grid md:grid-cols-2 gap-2">
                              {process.details.map((detail, idx) => (
                                <div key={idx} className="flex items-start">
                                  <span className={`${colors.text} mr-2 flex-shrink-0`}>✓</span>
                                  <span className="text-gray-700">{detail}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">진행 원칙</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3">투명성</h3>
              <p className="text-gray-600">
                모든 진행 과정을 명확하게 공개하고 정기적으로 보고합니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-3">일정 준수</h3>
              <p className="text-gray-600">
                계획된 일정을 엄격하게 관리하여 지연을 최소화합니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-3">품질 관리</h3>
              <p className="text-gray-600">
                모든 단계에서 최고의 품질을 유지하기 위해 노력합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">자주 묻는 질문</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                프로젝트 기간은 평균적으로 얼마나 걸리나요?
              </h3>
              <p className="text-gray-600">
                프로젝트의 규모와 특성에 따라 다르지만, 일반적으로 2~3년이 소요됩니다.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                진행 상황을 어떻게 확인할 수 있나요?
              </h3>
              <p className="text-gray-600">
                정기적인 진행상황 보고서 및 온라인 시스템을 통해 실시간으로 확인하실 수 있습니다.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                지연이 발생하면 어떻게 대처하나요?
              </h3>
              <p className="text-gray-600">
                철저한 일정 관리와 리스크 관리를 통해 지연을 최소화하며, 발생 시 적절한 대응책을 마련합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            자세한 상담이 필요하신가요?
          </h2>
          <p className="text-blue-100 mb-6">
            전문가 팀이 궁금한 점을 해결해드립니다.
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
