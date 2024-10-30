import { NextRequest, NextResponse } from "next/server";
import { updateBudget, UpdateBudgetParams } from "@/actions/update-budget";

export async function PUT(request: NextRequest) {
  const body: UpdateBudgetParams = await request.json();
  const {
    id,
    title,
    monthlyIncome,
    savings,
    draftIncome,
    cushionFund,
    essentialExpenses,
    nonEssentialExpenses,
  } = body;
  try {
    await updateBudget({
      id,
      title,
      monthlyIncome,
      savings,
      draftIncome,
      cushionFund,
      essentialExpenses,
      nonEssentialExpenses,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating budget" },
      { status: 500 }
    );
  }
}
