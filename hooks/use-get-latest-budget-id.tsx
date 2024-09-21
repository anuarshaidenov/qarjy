import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetLatestBudgetId = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.LATEST_BUDGET_ID],
    queryFn: () =>
      axios.get("/api/budgets/latest-budget").then((res) => res.data),
  });
};
