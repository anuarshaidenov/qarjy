import { createClient } from "@/lib/supabase/server";

export async function getLatestBudgetId() {
  const supabase = createClient();

  // Query to get the latest budget's id
  const { data, error } = await supabase
    .from("budgets")
    .select("id")
    .order("created_at", { ascending: false }) // Orders by created_at in descending order
    .limit(1) // Limits the result to the most recent budget
    .single(); // Ensures only one result is returned

  if (error) {
    console.error("Error fetching the latest budget ID:", error);
    return null;
  }

  return data?.id || null;
}
