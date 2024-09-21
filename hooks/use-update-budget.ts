import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { UpdateBudgetParams } from "@/actions/update-budget";
import axios from "axios";

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (params: UpdateBudgetParams) =>
      axios.put("/api/budgets/update", params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BUDGET] });
    },
    onError: (error) => {
      toast({
        title: "Error updating budget",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
