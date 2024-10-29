import { createClient } from "@/lib/supabase/server";

export async function getNotesByBudgetId(budgetId: string) {
  const supabase = createClient();

  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    console.error("Error fetching user:", authError);
    throw new Error(
      "User not authenticated. Please log in to access your budget."
    );
  }

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("budget_id", budgetId)
    .order("created_at", { ascending: false })
    .limit(1);

  return {
    data,
    error,
  };
}
