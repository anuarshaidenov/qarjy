import { createClient } from "@/lib/supabase/server";
import { verifyBudgetOwnership } from "./verify-budget-ownership";

export async function deleteExpense(budgetId: string, expenseId: string) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw {
      success: false,
      error: "You must be logged in to add an expense.",
    };
  }

  // Verify ownership of the budget
  const isOwner = await verifyBudgetOwnership(userData.user?.id, budgetId);
  if (!isOwner) {
    throw new Error("You do not have permission to modify this budget.");
  }

  // Check if the expense belongs to the correct budget
  const { data: expense, error: expenseError } = await supabase
    .from("expenses")
    .select("*")
    .eq("id", expenseId)
    .eq("budget_id", budgetId)
    .single();

  if (expenseError || !expense) {
    console.error("Error fetching the expense:", expenseError);
    throw new Error("Error fetching the expense.");
  }

  // Proceed to delete the expense
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", expenseId)
    .eq("budget_id", budgetId);

  if (error) {
    console.error("Error deleting the expense:", error);
    throw new Error("Error deleting the expense.");
  }

  return { success: true };
}
