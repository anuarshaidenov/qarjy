import { createClient } from "@/lib/supabase/server";
import { Budget } from "@/types/budget";

export async function getBudgetById(id: string) {
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

  // Fetch the budget that matches both the id and the user's id
  const { data, error } = await supabase
    .from("budgets")
    .select(
      `
        id,
        title,
        monthly_income,
        savings,
        cushion_fund,
        expenses(id, name, amount, type)
      `
    )
    .eq("id", id)
    .eq("user_id", userId) // Ensure the budget belongs to the authenticated user
    .single();

  if (error) {
    console.error("Error fetching budget by id:", error);
    throw new Error("Error fetching budget. Please try again later.");
  }

  if (!data) {
    console.error("Budget not found:", data);
    throw new Error("Budget not found.");
  }

  // Classify expenses by type
  const essentialExpenses = data.expenses.filter(
    (expense) => expense.type === "essential"
  );
  const nonEssentialExpenses = data.expenses.filter(
    (expense) => expense.type === "non-essential"
  );
  const overallExpenses = data.expenses.filter(
    (expense) => expense.type === "overall"
  );

  // Construct the budget object
  const budget: Budget = {
    id: data.id,
    title: data.title,
    monthlyIncome: data.monthly_income,
    expenses: overallExpenses.map((exp) => ({
      id: exp.id,
      name: exp.name,
      amount: exp.amount,
    })),
    essentialExpenses: essentialExpenses.map((exp) => ({
      id: exp.id,
      name: exp.name,
      amount: exp.amount,
    })),
    nonEssentialExpenses: nonEssentialExpenses.map((exp) => ({
      id: exp.id,
      name: exp.name,
      amount: exp.amount,
    })),
    savings: data.savings,
    cushionFund: data.cushion_fund,
  };

  return budget;
}
