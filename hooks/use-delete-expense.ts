import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import axios from "axios";
import { Expense } from "@/types/budget";

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      budgetId,
      expenseId,
      expenseType,
    }: {
      budgetId: string;
      expenseId: string;
      expenseType: "essential" | "non-essential" | "overall";
    }) =>
      axios.delete("/api/expenses/delete", { data: { budgetId, expenseId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXPENSES] });
    },
    onMutate: async (expense) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.EXPENSES, expense.budgetId],
      });
      const previousExpenses = queryClient.getQueryData<Expense[]>([
        QUERY_KEYS.EXPENSES,
        expense.budgetId,
        expense.expenseType,
      ]);

      console.log("previousExpenses", previousExpenses);

      queryClient.setQueryData(
        [QUERY_KEYS.EXPENSES, expense.budgetId, expense.expenseType],
        (old: Expense[]) =>
          old.filter((oldExpense) => oldExpense.id !== expense.expenseId)
      );

      return { previousExpenses };
    },
    onError: (error, expense, context) => {
      toast({
        title: "Error deleting expense",
        description: error.message,
        variant: "destructive",
      });

      queryClient.setQueryData(
        [QUERY_KEYS.EXPENSES, expense.budgetId, expense.expenseType],
        context?.previousExpenses
      );
    },
  });
};
