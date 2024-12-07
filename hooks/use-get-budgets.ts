import { QUERY_KEYS } from "@/lib/constants";
import { Budget } from "@/types/budget";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetBudgets = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.BUDGETS],
    queryFn: () =>
      axios
        .get<{
          data: Budget[];
        }>("/api/budgets")
        .then((res) => res.data),
  });
};
