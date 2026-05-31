import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // 필수 필드 검증
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 메일 발송 또는 DB 저장 (현재는 console.log만 수행)
    console.log("New contact request:", {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // 실제 구현 시 이메일 서비스나 DB에 저장
    // 예: SendGrid, Nodemailer, Supabase 등

    return NextResponse.json(
      { success: true, message: "문의가 접수되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "문의 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
