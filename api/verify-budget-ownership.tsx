import { createClient } from "@/lib/supabase/client";

// Helper function to check if the budget belongs to the user
export async function verifyBudgetOwnership(userId: string, budgetId: string) {
  const supabase = createClient();

  // Fetch the budget and check the user_id
  const { data: budget, error: budgetError } = await supabase
    .from("budgets")
    .select("user_id")
    .eq("id", budgetId)
    .single();

  if (budgetError || !budget) {
    console.error("Error fetching the budget:", budgetError);
    return false;
  }

  // Ensure the user is the owner of the budget
  return budget.user_id === userId;
}
