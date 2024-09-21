import { NextRequest, NextResponse } from "next/server";
import { deleteExpense } from "@/actions/delete-expense";

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { budgetId, expenseId } = body;
  try {
    await deleteExpense(budgetId, expenseId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting expense" },
      { status: 500 }
    );
  }
}
