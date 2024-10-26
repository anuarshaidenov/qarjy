import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import axios from "axios";
import { Expense } from "@/types/budget";

export const useUpdateExpense = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      expenseId,
      name,
      amount,
      type,
      budgetId,
    }: {
      expenseId: string;
      name: string;
      amount: number;
      type: "essential" | "non-essential" | "overall";
      budgetId: string;
    }) => axios.put("/api/expenses/update", { expenseId, name, amount, type }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXPENSES] });
    },
    onMutate: async (expense) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.EXPENSES] });
      const previousExpenses = queryClient.getQueryData<Expense[]>([
        QUERY_KEYS.EXPENSES,
        expense.budgetId,
        expense.type,
      ]);

      queryClient.setQueryData(
        [QUERY_KEYS.EXPENSES, expense.budgetId, expense.type],
        (oldExpenses: Expense[]) =>
          oldExpenses?.map((oldExpense) => {
            if (oldExpense.id === expense.expenseId) {
              return {
                ...oldExpense,
                name: expense.name,
                amount: expense.amount,
              };
            }
            return oldExpense;
          })
      );

      return { previousExpenses };
    },
    onError: (error, _variables, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.EXPENSES, _variables.budgetId, _variables.type],
        context?.previousExpenses
      );
      toast({
        title: "Error updating expense",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
