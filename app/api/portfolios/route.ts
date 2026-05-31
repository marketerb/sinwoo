import { NextRequest, NextResponse } from "next/server";
import {
  getPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  uploadPortfolioImage,
  Portfolio,
  supabaseAdmin,
} from "@/lib/supabase-client";

export async function GET() {
  try {
    const portfolios = await getPortfolios();
    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    const message = error instanceof Error ? error.message : "포트폴리오를 불러올 수 없습니다.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const status = formData.get("status") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || !location || !status) {
      return NextResponse.json(
        { error: "필수 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (imageFile) {
      try {
        imageUrl = await uploadPortfolioImage(imageFile);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return NextResponse.json(
          { error: "이미지 업로드에 실패했습니다." },
          { status: 400 }
        );
      }
    }

    const portfolio: Portfolio = {
      title,
      description,
      location,
      status,
      image_url: imageUrl,
    };

    // Use admin client to bypass RLS
    const { data, error } = await supabaseAdmin
      .from("portfolios")
      .insert([portfolio])
      .select();

    if (error) throw error;
    return NextResponse.json(data?.[0], { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    const message = error instanceof Error ? error.message : "포트폴리오 추가에 실패했습니다.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const status = formData.get("status") as string;
    const imageFile = formData.get("image") as File | null;
    const existingImageUrl = formData.get("existingImageUrl") as string;

    if (!id || !title || !description || !location || !status) {
      return NextResponse.json(
        { error: "필수 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    let imageUrl = existingImageUrl;
    if (imageFile) {
      try {
        imageUrl = await uploadPortfolioImage(imageFile);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return NextResponse.json(
          { error: "이미지 업로드에 실패했습니다." },
          { status: 400 }
        );
      }
    }

    // Use admin client to bypass RLS
    const { data, error } = await supabaseAdmin
      .from("portfolios")
      .update({
        title,
        description,
        location,
        status,
        image_url: imageUrl,
      })
      .eq("id", id)
      .select();

    if (error) throw error;
    return NextResponse.json(data?.[0]);
  } catch (error) {
    console.error("Error updating portfolio:", error);
    const message = error instanceof Error ? error.message : "포트폴리오 수정에 실패했습니다.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "포트폴리오 ID가 없습니다." }, { status: 400 });
    }

    // Use admin client to bypass RLS
    const { error } = await supabaseAdmin
      .from("portfolios")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    const message = error instanceof Error ? error.message : "포트폴리오 삭제에 실패했습니다.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
