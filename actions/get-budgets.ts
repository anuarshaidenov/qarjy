import { createClient } from "@/lib/supabase/server";
import {
  getCurrentMonthName,
  getMonthFromDate,
  getYearFromDate,
} from "@/lib/utils";
import { Budget } from "@/types/budget";
import { addBudget } from "./create-budget";

export async function getBudgets(
  sortBy = "created_at",
  sortDirection: "asc" | "desc" = "desc"
) {
  const supabase = createClient();

  // Get the authenticated user
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(authError.message);
  }

  const userId = userData.user.id;

  // Query to get budgets belonging to the authenticated user
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
    .eq("user_id", userId) // Filter by user_id
    .order(sortBy, { ascending: sortDirection === "asc" });

  if (error) {
    console.error("Error fetching budgets:", error);
    throw new Error(error.message);
  }

  let newData = data;

  // If there are no budgets, add a new one
  if (!data.length) {
    const currentMonth = getCurrentMonthName();

    await addBudget({
      title: currentMonth + " Budget",
      monthlyIncome: 1000000,
    });

    const { data: updatedData, error } = await supabase
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
      .eq("user_id", userId) // Filter by user_id
      .order(sortBy, { ascending: sortDirection === "asc" });

    if (error) {
      console.error("Error fetching budgets:", error);
      throw new Error(error.message);
    }

    newData = [...updatedData];
  }

  // Get the latest budget date and check if it's the current month, if not, add a new budget
  const { data: latestDate, error: latestDateError } = await supabase
    .from("budgets")
    .select("created_at")
    .order("created_at", { ascending: false })
    .limit(1);

  if (latestDateError) {
    console.error("Error fetching latest date:", error);
    throw new Error(latestDateError.message);
  }

  const latestBudgetDateMonth =
    getMonthFromDate(new Date(latestDate[0]?.created_at)) || null;
  const currentDateMonth = getMonthFromDate(new Date());
  const latestBudgetDateYear =
    getYearFromDate(new Date(latestDate[0]?.created_at)) || null;
  const currentDateYear = getYearFromDate(new Date());

  if (
    latestBudgetDateYear !== currentDateYear ||
    latestBudgetDateMonth !== currentDateMonth
  ) {
    await addBudget({
      title: currentDateMonth + " Budget",
      monthlyIncome: 1000000,
    });

    const { data: updatedData, error } = await supabase
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
      .eq("user_id", userId) // Filter by user_id
      .order(sortBy, { ascending: sortDirection === "asc" });

    if (error) {
      console.error("Error fetching budgets:", error);
      throw new Error(error.message);
    }

    newData = [...updatedData];
  }

  const budgets: Budget[] = newData.map((budget) => {
    const essentialExpenses = budget.expenses.filter(
      (expense) => expense.type === "essential"
    );
    const nonEssentialExpenses = budget.expenses.filter(
      (expense) => expense.type === "non-essential"
    );

    return {
      id: budget.id,
      title: budget.title,
      monthlyIncome: budget.monthly_income,
      expenses: budget.expenses.map((exp) => ({
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
      savings: budget.savings,
      cushionFund: budget.cushion_fund,
    };
  });

  return budgets;
}
