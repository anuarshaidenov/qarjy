import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useGetMonthlyIncomeByBudgetId = (budgetId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MONTHLY_INCOME, budgetId],
    queryFn: () => getMonthlyIncomeByBudgetId(budgetId),
  });
};

export async function getMonthlyIncomeByBudgetId(
  budgetId: string
): Promise<number | null> {
  const supabase = createClient();

  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    console.error("Error fetching user:", authError);
    throw new Error(
      "User not authenticated. Please log in to access your budget."
    );
  }

  const { data, error } = await supabase
    .from("budgets")
    .select("monthly_income")
    .eq("id", budgetId)
    .single(); // Ensure that only a single row is returned

  if (error) {
    console.error("Error fetching monthly income:", error);
    throw error;
  }

  return data?.monthly_income ?? null;
}
