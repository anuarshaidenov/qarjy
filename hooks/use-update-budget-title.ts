import { useParams } from "next/navigation";
import { useGetBudgetById } from "./use-get-budget-by-id";
import { useUpdateBudget } from "./use-update-budget";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useUpdateBudgetTitle = () => {
  const params = useParams();
  const { data, isLoading } = useGetBudgetById({
    id: params.id as string,
  });
  const { mutate } = useUpdateBudget();

  const [title, setTitle] = useState("");
  const debouncedTitle = useDebouncedCallback((value: string) => {
    if (!data) {
      return;
    }
    mutate({ ...data, id: params.id as string, title: value });
  }, 1000);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
    }
  }, [data]);

  return {
    title,
    isLoading,
    setTitle: (value: string) => {
      setTitle(value);
      debouncedTitle(value);
    },
  };
};
