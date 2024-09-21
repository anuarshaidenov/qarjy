import { createClient } from "@/lib/supabase/server";

export async function updateExpense(
  expenseId: string,
  name: string,
  amount: number,
  type: "essential" | "non-essential" | "overall"
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("expenses")
    .update({
      name,
      amount,
      type, // essential or non-essential
    })
    .eq("id", expenseId)
    .single(); // We expect only one record to be updated

  if (error) {
    console.error("Error updating expense:", error);
    return { success: false, error };
  }

  return { success: true, expense: data };
}
