import { createClient } from "@/lib/supabase/server";
import { Budget, Expense } from "@/types/budget";

interface CreateBudgetParams {
  title: string;
  monthlyIncome: number;
  savings: number;
  cushionFund: number;
  essentialExpenses: Expense[];
  nonEssentialExpenses: Expense[];
}

export async function createBudget({
  title,
  monthlyIncome,
  savings,
  cushionFund,
  essentialExpenses,
  nonEssentialExpenses,
}: CreateBudgetParams) {
  const supabase = createClient();

  // Insert the new budget into the budgets table
  const { data: budgetData, error: budgetError } = await supabase
    .from("budgets")
    .insert([
      {
        title,
        monthly_income: monthlyIncome,
        savings,
        cushion_fund: cushionFund,
      },
    ])
    .select("*")
    .single(); // Retrieves the inserted budget

  if (budgetError) {
    console.error("Error creating budget:", budgetError);
    return null;
  }

  const budgetId = budgetData.id;

  // Combine essential and non-essential expenses into a single array
  const expenses = [
    ...essentialExpenses.map((exp) => ({
      ...exp,
      type: "essential",
      budget_id: budgetId,
    })),
    ...nonEssentialExpenses.map((exp) => ({
      ...exp,
      type: "non-essential",
      budget_id: budgetId,
    })),
  ];

  // Insert the expenses associated with this budget
  const { error: expensesError } = await supabase
    .from("expenses")
    .insert(expenses);

  if (expensesError) {
    console.error("Error creating expenses:", expensesError);
    return null;
  }

  return budgetData;
}
