"use client";

import { useState } from "react";
import Navigation from "../components/Navigation";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 실제 구현 시 API 호출 추가
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">문의</h1>
          <p className="text-blue-100 text-lg">언제든지 저희에게 연락해주세요</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-8">연락처 정보</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">전화</h3>
                  <p className="text-gray-600">
                    <a
                      href="tel:+82-2-1234-5678"
                      className="hover:text-blue-600 transition-colors"
                    >
                      02-1234-5678
                    </a>
                  </p>
                  <p className="text-gray-600 text-sm">평일 09:00 - 18:00</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">이메일</h3>
                  <p className="text-gray-600">
                    <a
                      href="mailto:info@sinwoo.com"
                      className="hover:text-blue-600 transition-colors"
                    >
                      info@sinwoo.com
                    </a>
                  </p>
                  <p className="text-gray-600 text-sm">24시간 접수</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">주소</h3>
                  <p className="text-gray-600">
                    서울시 강남구 테헤란로 123<br />
                    신우빌딩 4층
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">사업자 정보</h3>
                  <p className="text-gray-600 text-sm">
                    사업자등록번호: 123-45-67890<br />
                    대표이사: 홍길동
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">영업시간</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>월 - 금</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>토요일</span>
                    <span>10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>일요일</span>
                    <span>휴무</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-8">문의 양식</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  문의가 정상적으로 전송되었습니다. 빠른 시간 내에 연락드리겠습니다.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    성명 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="이름을 입력하세요"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    이메일 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="이메일을 입력하세요"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    전화번호 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="010-1234-5678"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    제목 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="제목을 입력하세요"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    메시지 <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="문의 내용을 입력하세요"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? "전송 중..." : "문의 전송"}
                  </button>
                </div>

                <p className="text-xs text-gray-500">
                  필수 항목(*)을 모두 입력하시고 전송해주세요.
                </p>
              </form>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-8">자주 묻는 질문</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  보통 응답 시간은 얼마나 걸리나요?
                </h3>
                <p className="text-gray-600">
                  업무시간 중 접수된 문의는 24시간 이내에 답변드립니다.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  자료 요청은 어떻게 하나요?
                </h3>
                <p className="text-gray-600">
                  문의 양식에서 "자료 요청"을 선택하고 필요한 정보를 입력해주세요.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  개인정보는 안전하게 관리되나요?
                </h3>
                <p className="text-gray-600">
                  귀하의 개인정보는 개인정보보호정책에 따라 안전하게 관리되며, 문의 처리를 위해서만 사용됩니다.
                </p>
              </div>
            </div>
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
