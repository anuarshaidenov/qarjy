import { QUERY_KEYS } from "@/lib/constants";
import { Expense } from "@/types/budget";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetExpensesByTypeAndBudgetId = (
  budgetId: string,
  type: "essential" | "non-essential" | "overall"
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.EXPENSES, budgetId, type],
    queryFn: () =>
      axios
        .get<Expense[]>(`/api/expenses?type=${type}&budgetId=${budgetId}`)
        .then((res) => res.data),
  });
};
