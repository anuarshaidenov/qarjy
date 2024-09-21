import { QUERY_KEYS } from "@/lib/constants";
import { Budget } from "@/types/budget";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetBudgetById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BUDGET, id],
    queryFn: async () => {
      return axios.get<Budget>(`/api/budgets/${id}`).then((res) => res.data);
    },
  });
};
