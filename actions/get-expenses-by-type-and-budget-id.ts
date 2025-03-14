import { createClient } from "@/lib/supabase/server";
import { Expense } from "@/types/budget";

export async function getExpensesByTypeAndBudgetId(
  budgetId: string,
  type: "essential" | "non-essential" | "overall"
): Promise<Expense[]> {
  const supabase = await createClient();
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    console.error("Error fetching user:", authError);
    throw new Error(
      "User not authenticated. Please log in to access your budget."
    );
  }

  const { data, error } = await supabase
    .from("expenses")
    .select("id, name, amount")
    .eq("budget_id", budgetId)
    .eq("type", type)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }

  return data as Expense[];
}
