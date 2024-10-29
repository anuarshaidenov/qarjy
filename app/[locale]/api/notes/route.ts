import { getNotesByBudgetId } from "@/actions/get-notes-by-budget-id";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const budgetId = params.get("budgetId") as string;

  const { data, error } = await getNotesByBudgetId(budgetId);
  if (error) {
    return NextResponse.json(
      { error: "Error fetching notes" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
