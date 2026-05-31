"use client";

import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Link from "next/link";

interface Portfolio {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  image_url: string;
  created_at: string;
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchPortfolios();
  }, []);

  async function fetchPortfolios() {
    try {
      setLoading(true);
      const response = await fetch("/api/portfolios");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setPortfolios(data || []);
      setError("");
    } catch (err) {
      setError("포트폴리오를 불러올 수 없습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredPortfolios = portfolios.filter((p) => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  const statusOptions = [
    { value: "all", label: "전체" },
    { value: "진행중", label: "진행중" },
    { value: "완료", label: "완료" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">포트폴리오</h1>
          <p className="text-blue-100 text-lg">신우아이앤씨의 주요 프로젝트들을 만나보세요</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Filter */}
          <div className="flex justify-center mb-12 gap-2 flex-wrap">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  filter === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">로딩 중...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredPortfolios.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <p className="text-gray-600 text-lg">
                {filter === "all"
                  ? "포트폴리오가 없습니다."
                  : `${filter} 중인 프로젝트가 없습니다.`}
              </p>
            </div>
          )}

          {/* Portfolio Grid */}
          {!loading && filteredPortfolios.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {/* Image */}
                  {portfolio.image_url ? (
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={portfolio.image_url}
                        alt={portfolio.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                      이미지 없음
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          portfolio.status === "완료"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {portfolio.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {portfolio.title}
                    </h3>

                    {/* Location */}
                    <p className="text-gray-600 text-sm mb-3 flex items-start">
                      <span className="text-blue-600 mr-2">📍</span>
                      {portfolio.location}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {portfolio.description}
                    </p>

                    {/* Meta */}
                    <p className="text-xs text-gray-400">
                      {new Date(portfolio.created_at).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {!loading && portfolios.length > 0 && (
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">성과</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {portfolios.length}
                </div>
                <p className="text-gray-600">진행 및 완료된 프로젝트</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {portfolios.filter((p) => p.status === "완료").length}
                </div>
                <p className="text-gray-600">완료된 프로젝트</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {portfolios.filter((p) => p.status === "진행중").length}
                </div>
                <p className="text-gray-600">진행 중인 프로젝트</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
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
