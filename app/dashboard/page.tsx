"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">신우아이앤씨 관리자</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Portfolio Management */}
          <Link href="/dashboard/portfolio">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
              <div className="text-4xl mb-4">🏢</div>
              <h2 className="text-xl font-bold mb-2">포트폴리오 관리</h2>
              <p className="text-gray-600 text-sm">프로젝트 및 이미지 관리</p>
            </div>
          </Link>

          {/* History Management */}
          <Link href="/dashboard/history">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
              <div className="text-4xl mb-4">📅</div>
              <h2 className="text-xl font-bold mb-2">연혁 관리</h2>
              <p className="text-gray-600 text-sm">회사 연혁 및 이벤트 관리</p>
            </div>
          </Link>

          {/* Company Info */}
          <Link href="/dashboard/company">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
              <div className="text-4xl mb-4">🏛️</div>
              <h2 className="text-xl font-bold mb-2">기본정보 수정</h2>
              <p className="text-gray-600 text-sm">회사 정보 수정</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
