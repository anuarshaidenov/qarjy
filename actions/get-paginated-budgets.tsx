import { createClient } from "@/lib/supabase/server";
import { Budget } from "@/types/budget";
import { cache } from "react";

type Params = {
  page?: number;
  pageSize?: number;
  sortDirection?: string;
  sortBy?: string;
  query?: string;
};

export const getPaginatedBudgets = async (params?: Params) => {
  const {
    page = 1,
    pageSize = 10,
    sortDirection = "desc",
    sortBy = "created_at",
    query = "",
  } = params || {};
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const supabase = await createClient();

  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    return {
      data: [],
      error: authError,
    };
  }

  const { data, error, count } = await supabase
    .from("budgets")
    .select(
      `
        id, 
        title, 
        monthly_income,
        draft_income,
        savings, 
        cushion_fund,
        expenses(id, name, amount, type)
      `,
      { count: "exact" }
    )
    .eq("user_id", userData.user.id)
    .ilike("title", `%${query}%`)
    .order(sortBy, { ascending: sortDirection === "asc" })
    .range(offset, offset + limit - 1);

  const formattedBudgets: Budget[] | undefined = data?.map((budget) => {
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
      draftIncome: budget.draft_income,
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
      essentialExpensesTotal: essentialExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
      ),
      nonEssentialExpensesTotal: nonEssentialExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
      ),
      expensesTotal: budget.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      ),
      savings: budget.savings,
      cushionFund: budget.cushion_fund,
    };
  });

  return {
    data: formattedBudgets,
    error,
    count,
  };
};
