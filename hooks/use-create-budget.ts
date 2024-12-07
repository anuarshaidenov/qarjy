import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";

export const useCreateBudget = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: () =>
      axios.post<{
        success: boolean;
        data: { id: string };
      }>("/api/budgets/create"),
    onError: (error) => {
      toast({
        title: "Error creating budget",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
