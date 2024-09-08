import { addBudget } from "@/api/create-budget";
import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { getCurrentMonthName } from "@/lib/utils";
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
  const supabase = createClient();

  // Get the authenticated user
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(authError.message);
  }

  const userId = userData.user.id;

  // Query to get budgets belonging to the authenticated user
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
    .eq("user_id", userId) // Filter by user_id
    .order(sortBy, { ascending: sortDirection === "asc" });

  if (error) {
    console.error("Error fetching budgets:", error);
    throw new Error(error.message);
  }

  let newData = data;

  if (!data.length) {
    const currentMonth = getCurrentMonthName();

    await addBudget({
      title: currentMonth + " Budget",
      monthlyIncome: 1000000,
    });

    const { data: updatedData, error } = await supabase
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
      .eq("user_id", userId) // Filter by user_id
      .order(sortBy, { ascending: sortDirection === "asc" });

    if (error) {
      console.error("Error fetching budgets:", error);
      throw new Error(error.message);
    }

    newData = [...updatedData];
  }

  const budgets: Budget[] = newData.map((budget) => {
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
