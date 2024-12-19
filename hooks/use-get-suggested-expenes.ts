import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSuggestedExpenses = ({
  page,
  pageSize,
  budgetId,
}: {
  page: number;
  pageSize: number;
  budgetId: string;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SUGGESTED_EXPENSES, page, pageSize],
    queryFn: () =>
      axios
        .get<{
          data: {
            id: string;
            name: string;
            amount: number;
            type: string;
          }[];
        }>(`/api/expenses/suggested`, {
          params: {
            page,
            pageSize,
            budgetId,
          },
        })
        .then((res) => res.data),
  });
};
