import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { QUERY_KEYS } from "@/lib/constants";

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
    }) => updateExpense(expenseId, name, amount, type),
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

export async function updateExpense(
  expenseId: string,
  name: string,
  amount: number,
  type: "essential" | "non-essential" | "overall"
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("expenses")
    .update({
      name,
      amount,
      type, // essential or non-essential
    })
    .eq("id", expenseId)
    .single(); // We expect only one record to be updated

  if (error) {
    console.error("Error updating expense:", error);
    return { success: false, error };
  }

  return { success: true, expense: data };
}
