import { QUERY_KEYS } from "@/lib/constants";
import { Note } from "@/types/notes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetNotesByBudgetId = (budgetId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.NOTES, budgetId],
    queryFn: () =>
      axios
        .get<Note[]>(`/api/notes`, {
          params: {
            budgetId,
          },
        })
        .then((res) => res.data),
  });
};
