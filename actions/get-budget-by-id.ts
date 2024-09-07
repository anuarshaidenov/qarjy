import { createClient } from "@/lib/supabase/server";
import { Budget } from "@/types/budget";

export async function getBudgetById(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("budgets")
    .select(
      `
      id,
      title,
      monthly_income,
      savings,
      cushion_fund,
      expenses(id, name, amount, type)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching budget by id:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  const essentialExpenses = data.expenses.filter(
    (expense) => expense.type === "essential"
  );
  const nonEssentialExpenses = data.expenses.filter(
    (expense) => expense.type === "non-essential"
  );

  const budget: Budget = {
    id: data.id,
    title: data.title,
    monthlyIncome: data.monthly_income,
    expenses: data.expenses.map((exp) => ({
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
    savings: data.savings,
    cushionFund: data.cushion_fund,
  };

  return budget;
}
