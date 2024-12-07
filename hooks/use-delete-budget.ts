import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { Budget } from "@/types/budget";

export const useDeleteBudget = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => axios.delete(`/api/budgets/${id}/delete`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BUDGETS] });
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.BUDGETS] });
      const previousBudgets = queryClient.getQueryData<{
        data: Budget[];
      }>([QUERY_KEYS.BUDGETS]);

      queryClient.setQueryData([QUERY_KEYS.BUDGETS], {
        data: previousBudgets?.data.filter((budget) => budget.id !== id),
      });

      return { previousBudgets };
    },
    onError: (error, _id, context) => {
      toast({
        title: "Error deleting budget",
        description: error.message,
        variant: "destructive",
      });

      queryClient.setQueryData([QUERY_KEYS.BUDGETS], context?.previousBudgets);
    },
  });
};
