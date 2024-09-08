import { createClient } from "@/lib/supabase/server";

export async function getLatestBudgetId() {
  const supabase = createClient();
  // Get the authenticated user
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    console.error("Error fetching user:", authError);
    throw new Error(
      "User not authenticated. Please log in to access your budget."
    );
  }

  const userId = userData.user.id;

  // Query to get the latest budget's id
  const { data, error } = await supabase
    .from("budgets")
    .select("id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false }) // Orders by created_at in descending order
    .limit(1) // Limits the result to the most recent budget
    .single(); // Ensures only one result is returned

  if (error) {
    console.error("Error fetching the latest budget ID:", error);
    return null;
  }

  return data?.id || null;
}
