"use client";

import { useEffect } from "react";
import { NumericFormat } from "./ui/numeric-format";
import { useParams } from "next/navigation";
import { useGetBudgetById } from "@/hooks/use-get-budget-by-id";
import { useUpdateBudget } from "@/hooks/use-update-budget";
import { useDebouncedCallback } from "use-debounce";
import { Skeleton } from "./ui/skeleton";
import { formatAmount } from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";

type Props = {};

export const DashboardMonthlyIncome = (props: Props) => {
  const params = useParams();
  const { data, isLoading } = useGetBudgetById({
    id: params.id as string,
  });
  const { mutate } = useUpdateBudget();
  const { monthlyIncome, setMonthlyIncome } = useMonthlyIncome();
  const debouncedMonthlyIncome = useDebouncedCallback((value) => {
    if (!data) {
      return;
    }

    mutate({ ...data, monthlyIncome: value });
  }, 1000);

  useEffect(() => {
    if (!data) {
      return;
    }

    setMonthlyIncome(data.monthlyIncome);
  }, [data]);

  if (isLoading) {
    return <Skeleton className="h-9 inline-block" />;
  }

  return (
    <NumericFormat
      value={monthlyIncome}
      onChange={(e) => {
        setMonthlyIncome(formatAmount(e.target.value));
        debouncedMonthlyIncome(formatAmount(e.target.value));
      }}
      autoComplete="off"
      className="md:text-lg font-semibold"
      id="monthly-income"
      thousandSeparator=","
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
    />
  );
};
