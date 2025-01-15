import { QUERY_KEYS } from "@/lib/constants";
import { Budget } from "@/types/budget";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetBudgets = (options?: {
  page?: number;
  pageSize?: number;
}) => {
  const { page = 1, pageSize = 1 } = options || {};

  return useQuery({
    queryKey: [QUERY_KEYS.BUDGETS, page, pageSize],

    queryFn: () =>
      axios
        .get<{
          data: Budget[];
          meta: {
            totalItems: number;
            page: number;
            pageSize: number;
            totalPages: number;
          };
        }>("/api/budgets", {
          params: {
            page,
            pageSize,
          },
        })
        .then((res) => res.data),
  });
};

export const useGetBudgetsInifinite = (options?: {
  page?: number;
  pageSize?: number;
}) => {
  const { page = 1, pageSize = 5 } = options || {};

  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.BUDGETS],
    queryFn: ({ pageParam = page }) =>
      axios
        .get<{
          data: Budget[];
          meta: {
            totalItems: number;
            page: number;
            pageSize: number;
            totalPages: number;
          };
        }>("/api/budgets", {
          params: {
            page: pageParam,
            pageSize: pageSize,
          },
        })
        .then((res) => res.data),
    initialPageParam: page,
    getPreviousPageParam: (firstPage) => {
      if (firstPage.meta.page > 1) {
        return firstPage.meta.page - 1;
      }
      return undefined;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });
};
