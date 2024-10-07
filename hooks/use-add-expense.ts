import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import axios from "axios";
import { Expense } from "@/types/budget";

export const useAddExpense = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      budgetId,
      name,
      amount,
      type,
    }: {
      budgetId: string;
      name: string;
      amount: number;
      type: "essential" | "non-essential" | "overall";
    }) => axios.post("/api/expenses/add", { budgetId, name, amount, type }),
    onSuccess: (_data, newExpense, context) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES, newExpense.budgetId, newExpense.type],
      });
    },
    onMutate: async (newExpense) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.EXPENSES, newExpense.budgetId, newExpense.type],
      });
      const previousExpenses = queryClient.getQueryData<Expense[]>([
        QUERY_KEYS.EXPENSES,
        newExpense.budgetId,
        newExpense.type,
      ]);

      queryClient.setQueryData(
        [QUERY_KEYS.EXPENSES, newExpense.budgetId, newExpense.type],
        (old: Expense[]) => [...old, newExpense]
      );

      return { previousExpenses };
    },
    onError: (error, newExpense, context: any) => {
      queryClient.setQueryData(
        [QUERY_KEYS.EXPENSES, newExpense.budgetId, newExpense.type],
        context.previousExpenses
      );
      toast({
        title: "Error adding expense",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
