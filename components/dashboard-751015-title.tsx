"use client";

import { useUpdateBudgetTitle } from "@/hooks/use-update-budget-title";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

type Props = {};

export const Dashboard751015CardTitle = (props: Props) => {
  const { title, isLoading, setTitle } = useUpdateBudgetTitle();

  if (isLoading) {
    return <Skeleton className="h-9 w-full" />;
  }

  return (
    <Input
      placeholder="Budget title"
      className="md:text-2xl font-semibold"
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
      }}
    ></Input>
  );
};
