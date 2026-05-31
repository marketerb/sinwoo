"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CompanyInfo } from "@/lib/supabase-client";

interface FormErrors {
  company_name?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export default function CompanyPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    company_name: "",
    phone: "",
    email: "",
    address: "",
    business_number: "",
    description: "",
  });

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  async function fetchCompanyInfo() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/company");
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "기본정보를 불러올 수 없습니다.");
      }
      const data = await response.json();
      if (data && data.company_name) {
        setFormData({
          company_name: data.company_name || "",
          phone: data.phone || "",
          email: data.email || "",
          address: data.address || "",
          business_number: data.business_number || "",
          description: data.description || "",
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "기본정보를 불러올 수 없습니다.";
      setError(message);
      console.error("Error fetching company info:", err);
    } finally {
      setLoading(false);
    }
  }

  function validateForm(): boolean {
    const errors: FormErrors = {};

    if (!formData.company_name.trim()) {
      errors.company_name = "회사명을 입력해주세요.";
    } else if (formData.company_name.length > 100) {
      errors.company_name = "회사명은 100자 이내여야 합니다.";
    }

    if (!formData.phone.trim()) {
      errors.phone = "전화번호를 입력해주세요.";
    } else if (!/^[\d\-\s()]+$/.test(formData.phone)) {
      errors.phone = "올바른 전화번호 형식이 아닙니다.";
    }

    if (!formData.email.trim()) {
      errors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!formData.address.trim()) {
      errors.address = "주소를 입력해주세요.";
    } else if (formData.address.length > 200) {
      errors.address = "주소는 200자 이내여야 합니다.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      setError("입력 정보를 확인해주세요.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch("/api/company", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "저장에 실패했습니다.");
      }

      setSuccess("기본정보가 저장되었습니다.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "저장에 실패했습니다.";
      setError(message);
      console.error("Error saving company info:", err);
    } finally {
      setSaving(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            ← 돌아가기
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">기본정보 수정</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-700 hover:text-red-900 font-bold"
            >
              닫기
            </button>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex justify-between items-center">
            <span>{success}</span>
            <button
              onClick={() => setSuccess("")}
              className="text-green-700 hover:text-green-900 font-bold"
            >
              닫기
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  회사명 *
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={(e) => {
                    handleChange(e);
                    if (formErrors.company_name) setFormErrors({ ...formErrors, company_name: undefined });
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.company_name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  maxLength={100}
                />
                {formErrors.company_name && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.company_name}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{formData.company_name.length}/100</p>
              </div>


              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  전화번호 *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    handleChange(e);
                    if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                  }}
                  placeholder="02-1234-5678"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleChange(e);
                    if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                  }}
                  placeholder="info@company.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {formErrors.email && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  주소 *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={(e) => {
                    handleChange(e);
                    if (formErrors.address) setFormErrors({ ...formErrors, address: undefined });
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.address
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  maxLength={200}
                />
                {formErrors.address && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.address}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{formData.address.length}/200</p>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  회사소개
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-6 border-t">
              <Link
                href="/dashboard"
                className={`flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-center font-semibold ${saving ? "pointer-events-none opacity-50" : ""}`}
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {saving ? "저장 중..." : "저장"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
