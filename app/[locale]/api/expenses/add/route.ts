import { NextRequest, NextResponse } from "next/server";
import { addExpense } from "@/actions/add-expense";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { budgetId, name, amount, type } = body;

  try {
    await addExpense(budgetId, name, amount, type);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding expense" },
      { status: 500 }
    );
  }
}
