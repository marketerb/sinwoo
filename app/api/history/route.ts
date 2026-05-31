import { NextRequest, NextResponse } from "next/server";
import {
  getHistory,
  createHistory,
  updateHistory,
  deleteHistory,
  History,
} from "@/lib/supabase-client";

export async function GET() {
  try {
    const history = await getHistory();
    return NextResponse.json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, title, description } = body;

    if (!year || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const history: History = {
      year: parseInt(year),
      title,
      description,
    };

    const created = await createHistory(history);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating history:", error);
    return NextResponse.json(
      { error: "Failed to create history" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, year, title, description } = body;

    if (!id || !year || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updated = await updateHistory(id, {
      year: parseInt(year),
      title,
      description,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating history:", error);
    return NextResponse.json(
      { error: "Failed to update history" },
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

    await deleteHistory(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting history:", error);
    return NextResponse.json(
      { error: "Failed to delete history" },
      { status: 500 }
    );
  }
}
