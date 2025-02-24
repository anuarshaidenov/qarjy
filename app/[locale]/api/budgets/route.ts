import { createClient } from "@/lib/supabase/server";
import { Budget } from "@/types/budget";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const params = request.nextUrl.searchParams;
  const sortBy = params.get("sortBy") || "created_at";
  const sortDirection = params.get("sortDirection") || "desc";
  const page = parseInt(params.get("page") || "1", 10);
  const pageSize = parseInt(params.get("pageSize") || "10", 10);

  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(authError.message);
  }

  const { data, error, count } = await supabase
    .from("budgets")
    .select(
      `
      id, 
      title, 
      monthly_income,
      draft_income,
      savings, 
      cushion_fund,
      expenses(id, name, amount, type)
    `,
      { count: "exact" }
    )
    .eq("user_id", userData.user.id)
    .order(sortBy, { ascending: sortDirection === "asc" })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json(
      { error: "Error fetching budgets" },
      { status: 500 }
    );
  }

  const formattedBudgets: Budget[] = data.map((budget) => {
    const essentialExpenses = budget.expenses.filter(
      (expense) => expense.type === "essential"
    );
    const nonEssentialExpenses = budget.expenses.filter(
      (expense) => expense.type === "non-essential"
    );

    return {
      id: budget.id,
      title: budget.title,
      monthlyIncome: budget.monthly_income,
      draftIncome: budget.draft_income,
      expenses: budget.expenses.map((exp) => ({
        id: exp.id,
        name: exp.name,
        amount: exp.amount,
      })),
      essentialExpenses: essentialExpenses.map((exp) => ({
        id: exp.id,
        name: exp.name,
        amount: exp.amount,
      })),
      nonEssentialExpenses: nonEssentialExpenses.map((exp) => ({
        id: exp.id,
        name: exp.name,
        amount: exp.amount,
      })),
      savings: budget.savings,
      cushionFund: budget.cushion_fund,
    };
  });

  return NextResponse.json({
    data: formattedBudgets,
    meta: {
      totalItems: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    },
  });
}
