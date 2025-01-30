import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";
import { QUERY_KEYS } from "@/lib/constants";

export const useDuplicateBudget = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (budgetId: string) =>
      axios.post(`/api/budgets/${budgetId}/duplicate`),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your budget has been duplicated",
      });

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BUDGETS] });
    },
    onError: (error) => {
      toast({
        title: "Error duplicating budget",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
