import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import axios from "axios";

export const useUpdateExpense = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      expenseId,
      name,
      amount,
      type,
    }: {
      expenseId: string;
      name: string;
      amount: number;
      type: "essential" | "non-essential" | "overall";
    }) => axios.put("/api/expenses/update", { expenseId, name, amount, type }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXPENSES] });
    },
    onError: (error) => {
      toast({
        title: "Error updating expense",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
