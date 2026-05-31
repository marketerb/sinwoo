import { NextRequest, NextResponse } from "next/server";
import {
  getPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  uploadPortfolioImage,
  Portfolio,
} from "@/lib/supabase-client";

export async function GET() {
  try {
    const portfolios = await getPortfolios();
    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
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
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadPortfolioImage(imageFile);
    }

    const portfolio: Portfolio = {
      title,
      description,
      location,
      status,
      image_url: imageUrl,
    };

    const created = await createPortfolio(portfolio);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
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
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl = existingImageUrl;
    if (imageFile) {
      imageUrl = await uploadPortfolioImage(imageFile);
    }

    const updated = await updatePortfolio(id, {
      title,
      description,
      location,
      status,
      image_url: imageUrl,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await deletePortfolio(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    return NextResponse.json(
      { error: "Failed to delete portfolio" },
      { status: 500 }
    );
  }
}
