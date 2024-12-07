import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";
import { QUERY_KEYS } from "@/lib/constants";

export const useCreateBudget = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      axios.post<{
        success: boolean;
        data: { id: string };
      }>("/api/budgets/create"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BUDGETS] });
    },
    onError: (error) => {
      toast({
        title: "Error creating budget",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
