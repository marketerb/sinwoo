"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Portfolio } from "@/lib/supabase-client";

interface PortfolioWithDates extends Portfolio {
  created_at: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  location?: string;
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<PortfolioWithDates[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    status: "진행중",
    image: null as File | null,
    existingImageUrl: "",
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  async function fetchPortfolios() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/portfolios");
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "포트폴리오를 불러올 수 없습니다.");
      }
      const data = await response.json();
      setPortfolios(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "포트폴리오를 불러올 수 없습니다.";
      setError(message);
      console.error("Error fetching portfolios:", err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      description: "",
      location: "",
      status: "진행중",
      image: null,
      existingImageUrl: "",
    });
    setEditingId(null);
    setFormErrors({});
  }

  function validateForm(): boolean {
    const errors: FormErrors = {};

    if (!formData.title.trim()) {
      errors.title = "제목을 입력해주세요.";
    } else if (formData.title.length > 100) {
      errors.title = "제목은 100자 이내여야 합니다.";
    }

    if (!formData.description.trim()) {
      errors.description = "설명을 입력해주세요.";
    } else if (formData.description.length > 1000) {
      errors.description = "설명은 1000자 이내여야 합니다.";
    }

    if (!formData.location.trim()) {
      errors.location = "위치를 입력해주세요.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function openAddModal() {
    resetForm();
    setShowModal(true);
  }

  function openEditModal(portfolio: PortfolioWithDates) {
    setFormData({
      title: portfolio.title,
      description: portfolio.description,
      location: portfolio.location,
      status: portfolio.status,
      image: null,
      existingImageUrl: portfolio.image_url,
    });
    setEditingId(portfolio.id!);
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      setError("입력 정보를 확인해주세요.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("location", formData.location.trim());
      formDataToSend.append("status", formData.status);
      formDataToSend.append("existingImageUrl", formData.existingImageUrl);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const method = editingId ? "PUT" : "POST";
      if (editingId) {
        formDataToSend.append("id", editingId);
      }

      const response = await fetch("/api/portfolios", {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "저장에 실패했습니다.");
      }

      setSuccess(editingId ? "포트폴리오가 수정되었습니다." : "포트폴리오가 추가되었습니다.");
      setShowModal(false);
      resetForm();
      await fetchPortfolios();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "저장에 실패했습니다.";
      setError(message);
      console.error("Error saving portfolio:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) return;

    try {
      setError("");
      setSuccess("");

      const response = await fetch("/api/portfolios", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "삭제에 실패했습니다.");
      }

      setSuccess("포트폴리오가 삭제되었습니다.");
      await fetchPortfolios();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "삭제에 실패했습니다.";
      setError(message);
      console.error("Error deleting portfolio:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Link href="/dashboard" className="text-yellow-600 hover:text-yellow-700">
              ← 돌아가기
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 mt-2">
              포트폴리오 관리
            </h1>
          </div>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          >
            + 추가
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">로딩 중...</p>
          </div>
        ) : portfolios.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">포트폴리오가 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    위치
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    이미지
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody>
                {portfolios.map((portfolio) => (
                  <tr key={portfolio.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {portfolio.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {portfolio.location}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                          portfolio.status === "완료"
                            ? "bg-green-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {portfolio.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {portfolio.image_url ? (
                        <img
                          src={portfolio.image_url}
                          alt={portfolio.title}
                          className="h-10 w-10 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400">없음</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => openEditModal(portfolio)}
                        className="text-yellow-600 hover:text-yellow-700 font-semibold"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(portfolio.id!)}
                        className="text-red-600 hover:text-red-700 font-semibold"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "포트폴리오 수정" : "새 포트폴리오 추가"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (formErrors.title) setFormErrors({ ...formErrors, title: undefined });
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.title
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-yellow-600"
                  }`}
                  maxLength={100}
                />
                {formErrors.title && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.title}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{formData.title.length}/100</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  설명 *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (formErrors.description) setFormErrors({ ...formErrors, description: undefined });
                  }}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.description
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-yellow-600"
                  }`}
                  maxLength={1000}
                />
                {formErrors.description && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.description}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{formData.description.length}/1000</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  위치 *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => {
                    setFormData({ ...formData, location: e.target.value });
                    if (formErrors.location) setFormErrors({ ...formErrors, location: undefined });
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.location
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-yellow-600"
                  }`}
                />
                {formErrors.location && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  상태
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  required
                >
                  <option value="진행중">진행중</option>
                  <option value="완료">완료</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  이미지
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
                {formData.existingImageUrl && !formData.image && (
                  <p className="text-xs text-gray-600 mt-1">
                    현재 이미지: {formData.existingImageUrl}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
                >
                  {submitting ? (editingId ? "수정 중..." : "추가 중...") : (editingId ? "수정" : "추가")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
