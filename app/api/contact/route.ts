import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * 상담 신청 접수 → 담당자 이메일 발송
 *
 * 필요한 환경변수 (Vercel > Settings > Environment Variables):
 *   RESEND_API_KEY   (필수) resend.com 에서 발급한 API 키
 *   CONTACT_TO_EMAIL (선택) 수신 이메일. 기본값 sinwooinc2014@naver.com
 *   CONTACT_FROM_EMAIL (선택) 발신 주소. 도메인 인증 전에는 기본값 사용
 *
 * 키가 없으면 성공을 가장하지 않고 503을 반환합니다.
 * (접수되지 않았는데 "완료" 안내가 나가는 상황을 막기 위함)
 */

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "sinwooinc2014@naver.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "신우아이앤씨 문의 <onboarding@resend.dev>";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    const email = (body.email || "").trim();
    const subject = (body.subject || "").trim();
    const message = (body.message || "").trim();

    // 성함과 연락처만 필수 — 나머지는 선택
    if (!name || !phone) {
      return NextResponse.json(
        { error: "성함과 연락처를 입력해 주세요." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY 미설정 — 메일을 발송하지 못했습니다.");
      return NextResponse.json(
        { error: "현재 온라인 접수가 일시적으로 어렵습니다." },
        { status: 503 }
      );
    }

    const received = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    const rows: [string, string][] = [
      ["성함 / 회사명", name],
      ["연락처", phone],
      ["이메일", email || "-"],
      ["관심 서비스", subject || "-"],
      ["접수 일시", received],
    ];

    const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px 16px;background:#f6f6f6">
      <div style="font-family:-apple-system,'Malgun Gothic','Apple SD Gothic Neo',sans-serif;max-width:600px;margin:0 auto;color:#111;background:#fff;padding:28px;border-radius:12px">
        <div style="border-bottom:3px solid #b8935a;padding-bottom:12px;margin-bottom:24px">
          <p style="font-size:12px;letter-spacing:2px;color:#b8935a;margin:0 0 4px;font-weight:700">SINWOO INC.</p>
          <h2 style="margin:0;font-size:20px">홈페이지 상담 신청</h2>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${rows
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding:10px 12px;background:#faf5ec;border:1px solid #eee;width:130px;font-weight:700;color:#6b5a3e">${esc(k)}</td>
              <td style="padding:10px 12px;border:1px solid #eee">${esc(v)}</td>
            </tr>`
            )
            .join("")}
        </table>
        <div style="margin-top:20px">
          <p style="font-size:13px;font-weight:700;color:#6b5a3e;margin:0 0 8px">프로젝트 내용</p>
          <div style="padding:14px;background:#fafafa;border:1px solid #eee;border-radius:8px;font-size:14px;line-height:1.7;white-space:pre-wrap">${esc(message) || "-"}</div>
        </div>
        ${email ? `<p style="font-size:12px;color:#888;margin-top:20px">이 메일에 그대로 회신하면 신청자(${esc(email)})에게 전달됩니다.</p>` : ""}
      </div>
</body></html>`;

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `[홈페이지 상담] ${name}${subject ? ` · ${subject}` : ""}`,
      html,
      ...(email ? { replyTo: email } : {}),
    });

    if (error) {
      console.error("[contact] Resend 발송 실패:", error);
      return NextResponse.json(
        { error: "메일 발송에 실패했습니다." },
        { status: 502 }
      );
    }

    console.log("[contact] 발송 완료:", data?.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] 처리 중 오류:", err);
    return NextResponse.json(
      { error: "문의 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
