import { createClient } from "@/lib/supabase/server";
import { Expense } from "@/types/budget";

export interface UpdateBudgetParams {
  id: string;
  title: string;
  monthlyIncome: number;
  draftIncome: number;
  savings: number;
  cushionFund: number;
  essentialExpenses: Expense[];
  nonEssentialExpenses: Expense[];
}

export async function updateBudget({
  id,
  title,
  monthlyIncome,
  draftIncome,
  savings,
  cushionFund,
  essentialExpenses,
  nonEssentialExpenses,
}: UpdateBudgetParams) {
  const supabase = await createClient();

  // Update the budget details in the budgets table
  const { error: budgetError } = await supabase
    .from("budgets")
    .update({
      title,
      monthly_income: monthlyIncome,
      draft_income: draftIncome,
      savings,
      cushion_fund: cushionFund,
    })
    .eq("id", id);

  if (budgetError) {
    console.error("Error updating budget:", budgetError);
    return null;
  }

  // Handle the expenses update
  const allExpenses = [
    ...essentialExpenses.map((exp) => ({ ...exp, type: "essential" })),
    ...nonEssentialExpenses.map((exp) => ({ ...exp, type: "non-essential" })),
  ];

  // Update, Insert, and Delete expenses based on the received data
  for (const expense of allExpenses) {
    if (expense.id) {
      // If the expense has an ID, update it
      const { error: updateError } = await supabase
        .from("expenses")
        .update({
          name: expense.name,
          amount: expense.amount,
          type: expense.type,
        })
        .eq("id", expense.id)
        .eq("budget_id", id);

      if (updateError) {
        console.error("Error updating expense:", updateError);
      }
    } else {
      // If the expense doesn't have an ID, it's a new one, so insert it
      const { error: insertError } = await supabase.from("expenses").insert({
        name: expense.name,
        amount: expense.amount,
        type: expense.type,
        budget_id: id,
      });

      if (insertError) {
        console.error("Error adding new expense:", insertError);
      }
    }
  }

  return true;
}
