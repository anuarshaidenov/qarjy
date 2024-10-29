import { UpdateNotes } from "@/actions/update-notes";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, text } = body;

  const { error } = await UpdateNotes(id, text);

  if (error) {
    return NextResponse.json(
      { error: "Error updating notes" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
