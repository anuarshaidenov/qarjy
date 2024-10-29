import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { UpdateBudgetParams } from "@/actions/update-budget";
import axios from "axios";

export const useUpdateBudget = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (params: UpdateBudgetParams) =>
      axios.put("/api/budgets/update", params),

    onError: (error) => {
      toast({
        title: "Error updating budget",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
