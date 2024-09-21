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

export async function addBudget({
  title,
  monthlyIncome,
  savings = 0,
  cushionFund = 0,
}: {
  title: string;
  monthlyIncome: number;
  savings?: number;
  cushionFund?: number;
}) {
  const supabase = createClient();

  // Get the authenticated user
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    console.error("Error fetching user:", authError);
    throw new Error(
      "User not authenticated. Please log in to create a budget."
    );
  }

  const userId = userData.user.id;

  // Insert the new budget associated with the authenticated user
  const { data, error } = await supabase
    .from("budgets")
    .insert([
      {
        title,
        monthly_income: monthlyIncome,
        savings,
        cushion_fund: cushionFund,
        user_id: userId,
      },
    ])
    .single(); // Return the inserted row

  if (error) {
    console.error("Error adding new budget:", error);
    throw new Error("Failed to create a budget. Please try again later.");
  }

  return data;
}
