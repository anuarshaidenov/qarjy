import { QUERY_KEYS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

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
    }) => addExpense(budgetId, name, amount, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXPENSES] });
    },
    onError: (error) => {
      toast({
        title: "Error adding expense",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export async function addExpense(
  budgetId: string,
  name: string,
  amount: number,
  type: "essential" | "non-essential" | "overall"
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("expenses")
    .insert([
      {
        budget_id: budgetId,
        name,
        amount,
        type, // essential or non-essential
      },
    ])
    .single(); // We expect only one record to be inserted

  if (error) {
    console.error("Error adding expense:", error);
    return { success: false, error };
  }

  return { success: true, expense: data };
}
