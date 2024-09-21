import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetBudgets = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.BUDGETS],
    queryFn: () => axios.get("/api/budgets").then((res) => res.data),
  });
};
