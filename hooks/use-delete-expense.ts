import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

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
    }) => deleteExpense(budgetId, expenseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BUDGET] });
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

async function deleteExpense(budgetId: string, expenseId: string) {
  const supabase = createClient();

  // Check if the expense belongs to the correct budget
  const { data: expense, error: expenseError } = await supabase
    .from("expenses")
    .select("*")
    .eq("id", expenseId)
    .eq("budget_id", budgetId)
    .single();

  if (expenseError || !expense) {
    console.error("Error fetching the expense:", expenseError);
    return { success: false, error: expenseError || "Expense not found" };
  }

  // Proceed to delete the expense
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", expenseId)
    .eq("budget_id", budgetId);

  if (error) {
    console.error("Error deleting the expense:", error);
    return { success: false, error };
  }

  return { success: true };
}
