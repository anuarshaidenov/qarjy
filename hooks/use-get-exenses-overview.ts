import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetExpensesOverview = (options?: {
  expenseType?: "essential" | "non-essential" | "overall" | "draft";
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.EXPENSES_OVERVIEW, options?.expenseType],
    queryFn: () =>
      axios
        .get<{
          data: { id: string; title: string; totalExpenses: number }[];
        }>("/api/expenses/overview", {
          params: {
            expenseType: options?.expenseType || "",
          },
        })
        .then((res) => res.data),
  });
};
