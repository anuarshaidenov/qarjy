import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { verifyBudgetOwnership } from "@/api/verify-budget-ownership";
import axios from "axios";

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      budgetId,
      expenseId,
    }: {
      budgetId: string;
      expenseId: string;
    }) =>
      axios.delete("/api/expenses/delete", { data: { budgetId, expenseId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXPENSES] });
    },
    onError: (error) => {
      toast({
        title: "Error deleting expense",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
