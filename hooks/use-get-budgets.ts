import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { Budget } from "@/types/budget";
import { useQuery } from "@tanstack/react-query";

export const useGetBudgets = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.BUDGETS],
    queryFn: () => getBudgets(),
  });
};

export async function getBudgets(
  sortBy = "created_at",
  sortDirection: "asc" | "desc" = "desc"
) {
  console.log(sortBy, sortDirection);
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
    .order(sortBy, { ascending: sortDirection === "asc" });

  if (error) {
    console.error("Error fetching budgets:", error);
    throw error;
  }

  const budgets: Budget[] = data.map((budget) => {
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

  return budgets;
}
