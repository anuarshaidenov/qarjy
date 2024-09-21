import { NextRequest, NextResponse } from "next/server";
import { updateExpense } from "@/actions/update-expense";

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { expenseId, name, amount, type } = body;
  try {
    await updateExpense(expenseId, name, amount, type);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating expense" },
      { status: 500 }
    );
  }
}
