import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { Budget } from "@/types/budget";
import { useQuery } from "@tanstack/react-query";

export const useGetBudgetById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BUDGET, id],
    queryFn: () => {
      return getBudgetByIdClient(id);
    },
  });
};

async function getBudgetByIdClient(id: string) {
  const supabase = createClient();

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
    .single();

  if (error) {
    console.error("Error fetching budget by id:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  const essentialExpenses = data.expenses.filter(
    (expense) => expense.type === "essential"
  );
  const nonEssentialExpenses = data.expenses.filter(
    (expense) => expense.type === "non-essential"
  );
  const overallExpenses = data.expenses.filter(
    (expense) => expense.type === "overall"
  );

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