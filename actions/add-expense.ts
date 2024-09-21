import { createClient } from "@/lib/supabase/server";
import { verifyBudgetOwnership } from "./verify-budget-ownership";

export async function addExpense(
  budgetId: string,
  name: string,
  amount: number,
  type: "essential" | "non-essential" | "overall"
) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("You must be logged in to add an expense.");
  }

  // Verify ownership of the budget
  const isOwner = await verifyBudgetOwnership(userData.user?.id, budgetId);
  if (!isOwner) {
    throw new Error("You do not have permission to modify this budget.");
  }

  const { data, error } = await supabase
    .from("expenses")
    .insert([
      {
        budget_id: budgetId,
        name,
        amount,
        type, // essential or non-essential
      },
    ])
    .single(); // We expect only one record to be inserted

  if (error) {
    console.error("Error adding expense:", error);
    throw new Error(error.message);
  }

  return { success: true, expense: data };
}
