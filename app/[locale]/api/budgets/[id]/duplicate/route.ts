import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const supabase = createClient();
  const t = await getTranslations();
  const {
    params: { id },
  } = context;

  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    console.error("Error fetching user:", authError);

    return NextResponse.json(
      {
        error: "User not authenticated. Please log in to create a budget.",
      },
      { status: 401 }
    );
  }

  const { data: budget, error: budgetError } = await supabase
    .from("budgets")
    .select("*")
    .eq("id", id)
    .eq("user_id", userData.user.id)
    .single();

  if (budgetError) {
    return NextResponse.json(
      { error: "Budget not found or you don't have permission to access it." },
      { status: 500 }
    );
  }

  const { data: duplicatedBudget, error: insertBudgetError } = await supabase
    .from("budgets")
    .insert([
      {
        user_id: userData.user.id,
        title: `${budget.title} ${t("copy")}`,
        monthly_income: budget.monthly_income,
        draft_income: budget.draft_income,
        savings: budget.savings,
        cushion_fund: budget.cushion_fund,
      },
    ])
    .select("id");

  if (insertBudgetError) {
    console.error("Error duplicating budget:", insertBudgetError);
    return NextResponse.json(
      { error: "Failed to duplicate budget." },
      { status: 500 }
    );
  }

  const { data: expenses, error: expensesError } = await supabase
    .from("expenses")
    .select("name, amount, type, budget_id, created_by")
    .eq("budget_id", id);

  if (expensesError) {
    console.error("Error fetching expenses:", expensesError);
    return NextResponse.json(
      { error: "Failed to fetch expenses." },
      { status: 500 }
    );
  }

  if (expenses.length > 0) {
    const duplicatedExpenses = expenses.map((expense) => ({
      ...expense,
      budget_id: duplicatedBudget[0].id,
      created_at: new Date().toISOString(),
    }));

    console.log({ duplicatedExpenses });

    const { error: insertExpensesError } = await supabase
      .from("expenses")
      .insert(duplicatedExpenses);

    if (insertExpensesError) {
      console.error("Error duplicating expenses:", insertExpensesError);
      return NextResponse.json(
        { error: "Failed to duplicate expenses." },
        { status: 500 }
      );
    }
  }

  const { data: notes, error: notesError } = await supabase
    .from("notes")
    .select("*")
    .eq("budget_id, content", id);

  if (notesError) {
    console.error("Error fetching notes:", notesError);
    return NextResponse.json(
      { error: "Failed to fetch notes." },
      { status: 500 }
    );
  }

  if (notes.length > 0) {
    const { data: notesFromNewBudget, error: notesFromNewBudgetError } =
      await supabase
        .from("notes")
        .select("id")
        .eq("budget_id", duplicatedBudget[0].id);

    if (notesFromNewBudgetError) {
      console.error("Error duplicating notes:", notesFromNewBudgetError);
      return NextResponse.json(
        { error: "Failed to duplicate notes." },
        { status: 500 }
      );
    }

    const { error: updateNotesError } = await supabase
      .from("notes")
      .update({
        content: notes[0].content,
      })
      .eq("id", notesFromNewBudget[0].id);

    if (updateNotesError) {
      console.error("Error duplicating notes:", notesFromNewBudgetError);
      return NextResponse.json(
        { error: "Failed to duplicate notes." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
