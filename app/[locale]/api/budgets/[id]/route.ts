import { getBudgetById } from "@/actions/get-budget-by-id";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  try {
    const budget = await getBudgetById(params.id);
    return NextResponse.json(budget);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching budget" },
      { status: 500 }
    );
  }
}
