import { getBudgets } from "@/actions/get-budgets";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const budgets = await getBudgets();
    return NextResponse.json(budgets);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching budgets" },
      { status: 500 }
    );
  }
}
