import { NextResponse } from "next/server";
import { getLatestBudgetId } from "@/actions/get-latest-budget-id";

export async function GET() {
  try {
    const budgetId = await getLatestBudgetId();
    return NextResponse.json(budgetId);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching budget" },
      { status: 500 }
    );
  }
}
