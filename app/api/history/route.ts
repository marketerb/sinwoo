import { NextRequest, NextResponse } from "next/server";
import {
  getHistory,
  createHistory,
  updateHistory,
  deleteHistory,
  History,
  supabaseAdmin,
} from "@/lib/supabase-client";

export async function GET() {
  try {
    const history = await getHistory();
    return NextResponse.json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    const message = error instanceof Error ? error.message : "연혁을 불러올 수 없습니다.";
    return NextResponse.json(
      { error: message },
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
        { error: "필수 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    const history: History = {
      year: parseInt(year),
      title,
      description,
    };

    // Use admin client to bypass RLS
    const { data, error } = await supabaseAdmin
      .from("history")
      .insert([history])
      .select();

    if (error) {
      throw new Error(error.message || "연혁 추가에 실패했습니다.");
    }
    return NextResponse.json(data?.[0], { status: 201 });
  } catch (error) {
    console.error("[POST /api/history] Caught error:", error);
    const message = error instanceof Error ? error.message : "연혁 추가에 실패했습니다.";
    return NextResponse.json(
      { error: message },
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
        { error: "필수 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // Use admin client to bypass RLS
    const { data, error } = await supabaseAdmin
      .from("history")
      .update({
        year: parseInt(year),
        title,
        description,
      })
      .eq("id", id)
      .select();

    if (error) throw error;
    return NextResponse.json(data?.[0]);
  } catch (error) {
    console.error("Error updating history:", error);
    const message = error instanceof Error ? error.message : "연혁 수정에 실패했습니다.";
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
      return NextResponse.json({ error: "연혁 ID가 없습니다." }, { status: 400 });
    }

    // Use admin client to bypass RLS
    const { error } = await supabaseAdmin
      .from("history")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting history:", error);
    const message = error instanceof Error ? error.message : "연혁 삭제에 실패했습니다.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
