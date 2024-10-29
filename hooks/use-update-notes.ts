import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import axios from "axios";

export const useUpdateNotes = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, text }: { id: number; text: string }) =>
      axios.put("/api/notes/update", { id, text }),
    onError: (error) => {
      toast({
        title: "Error updating notes",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
