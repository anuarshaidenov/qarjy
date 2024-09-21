import { getExpensesByTypeAndBudgetId } from "@/actions/get-expenses-by-type-and-budget-id";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const {
    nextUrl: { searchParams },
  } = request;
  const type = searchParams.get("type") as
    | "essential"
    | "non-essential"
    | "overall";
  const budgetId = searchParams.get("budgetId") as string;

  try {
    const expenses = await getExpensesByTypeAndBudgetId(budgetId, type);
    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching expenses" },
      { status: 500 }
    );
  }
}
