"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { History } from "@/lib/supabase-client";

interface HistoryWithDates extends History {
  created_at: string;
}

interface FormErrors {
  year?: string;
  title?: string;
  description?: string;
}

export default function HistoryPage() {
  const [histories, setHistories] = useState<HistoryWithDates[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/history");
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "연혁을 불러올 수 없습니다.");
      }
      const data = await response.json();
      setHistories(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "연혁을 불러올 수 없습니다.";
      setError(message);
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      year: new Date().getFullYear(),
      title: "",
      description: "",
    });
    setEditingId(null);
    setFormErrors({});
  }

  function validateForm(): boolean {
    const errors: FormErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.year) {
      errors.year = "연도를 입력해주세요.";
    } else if (formData.year < 1900) {
      errors.year = "연도는 1900년 이상이어야 합니다.";
    } else if (formData.year > currentYear + 10) {
      errors.year = `연도는 ${currentYear + 10}년 이하여야 합니다.`;
    }

    if (!formData.title.trim()) {
      errors.title = "제목을 입력해주세요.";
    } else if (formData.title.length > 100) {
      errors.title = "제목은 100자 이내여야 합니다.";
    }

    if (!formData.description.trim()) {
      errors.description = "설명을 입력해주세요.";
    } else if (formData.description.length > 500) {
      errors.description = "설명은 500자 이내여야 합니다.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function openAddModal() {
    resetForm();
    setShowModal(true);
  }

  function openEditModal(history: HistoryWithDates) {
    setFormData({
      year: history.year,
      title: history.title,
      description: history.description,
    });
    setEditingId(history.id!);
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

      const method = editingId ? "PUT" : "POST";
      const body = {
        ...(editingId && { id: editingId }),
        year: parseInt(formData.year.toString()),
        title: formData.title.trim(),
        description: formData.description.trim(),
      };

      const response = await fetch("/api/history", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "저장에 실패했습니다.");
      }

      setSuccess(editingId ? "연혁이 수정되었습니다." : "연혁이 추가되었습니다.");
      setShowModal(false);
      resetForm();
      await fetchHistory();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "저장에 실패했습니다.";
      setError(message);
      console.error("Error saving history:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) return;

    try {
      setError("");
      setSuccess("");

      const response = await fetch("/api/history", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "삭제에 실패했습니다.");
      }

      setSuccess("연혁이 삭제되었습니다.");
      await fetchHistory();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "삭제에 실패했습니다.";
      setError(message);
      console.error("Error deleting history:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
              ← 돌아가기
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 mt-2">연혁 관리</h1>
          </div>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
        ) : histories.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">연혁이 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    연도
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    설명
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody>
                {histories.map((history) => (
                  <tr key={history.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {history.year}년
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {history.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {history.description.substring(0, 50)}
                      {history.description.length > 50 ? "..." : ""}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => openEditModal(history)}
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(history.id!)}
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
                {editingId ? "연혁 수정" : "새 연혁 추가"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  연도 *
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => {
                    setFormData({ ...formData, year: parseInt(e.target.value) });
                    if (formErrors.year) setFormErrors({ ...formErrors, year: undefined });
                  }}
                  min="1900"
                  max={new Date().getFullYear() + 10}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.year
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {formErrors.year && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.year}</p>
                )}
              </div>

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
                      : "border-gray-300 focus:ring-blue-500"
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
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  maxLength={500}
                />
                {formErrors.description && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.description}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{formData.description.length}/500</p>
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
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
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
