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
    return NextResponse.json(
      { error: "Failed to fetch company info" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { company_name, phone, email, address, business_number, description } =
      body;

    if (!company_name || !phone || !email || !address || !business_number) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const companyInfo: Partial<CompanyInfo> = {
      company_name,
      phone,
      email,
      address,
      business_number,
      description: description || "",
    };

    const updated = await updateCompanyInfo(companyInfo);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating company info:", error);
    return NextResponse.json(
      { error: "Failed to update company info" },
      { status: 500 }
    );
  }
}
