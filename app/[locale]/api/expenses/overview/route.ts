import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const expenseType = searchParams.get("expenseType") || "";

  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    console.error("Error fetching user:", userError);

    return NextResponse.json(
      {
        error:
          "User not authenticated. Please log in to get expenses overview.",
      },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from("budgets")
    .select(
      `
        id,
        title,
        expenses (amount)
    `
    )
    .eq("user_id", userData.user.id)
    .eq("expenses.type", expenseType)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json(
      { error: "Error fetching budgets" },
      { status: 500 }
    );
  }

  const budgetsWithExpensesSum = data?.map((budget) => {
    const totalExpenses = budget.expenses
      .filter((expense) => expense.amount > 0)
      .reduce((total, expense) => total + expense.amount, 0);

    return {
      id: budget.id,
      title: budget.title,
      totalExpenses,
    };
  });

  return NextResponse.json({
    data: budgetsWithExpensesSum,
  });
}
