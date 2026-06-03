import { NextRequest, NextResponse } from "next/server";
import {
  getCompanyInfo,
  updateCompanyInfo,
  CompanyInfo,
} from "@/lib/supabase-client";

export async function GET() {
  try {
    const info = await getCompanyInfo();
    return NextResponse.json(info || {});
  } catch (error) {
    console.error("Error fetching company info:", error);
    const message = error instanceof Error ? error.message : "기본정보를 불러올 수 없습니다.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { company_name, phone, fax, email, address, description, ga_tracking_id, kakao_channel } = body;

    if (!company_name || !phone || !email || !address) {
      return NextResponse.json(
        { error: "필수 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    const companyInfo: Partial<CompanyInfo> = {
      company_name, phone, email, address,
    };

    if (fax !== undefined) companyInfo.fax = fax;
    if (description !== undefined) companyInfo.description = description;
    if (ga_tracking_id !== undefined) companyInfo.ga_tracking_id = ga_tracking_id;
    if (kakao_channel !== undefined) companyInfo.kakao_channel = kakao_channel;

    const updated = await updateCompanyInfo(companyInfo);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating company info:", error);
    const message = error instanceof Error ? error.message : "기본정보 저장에 실패했습니다.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
