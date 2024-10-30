"use client";

import {
  calculateExpensesRemainder,
  calculateNonEssentialExpensesBasedOnIncome,
  calculateOverallExpensesBasedOnIncome,
  cn,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";
import { useExpensesSum } from "./expenses-sum-provider";
import { useMemo } from "react";
import { useCurrency } from "./currency-provider";

type Props = {};

export const DashboardDraftExpensesRemainder = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  const { draftExpensesSum } = useExpensesSum();

  const remainder = useMemo(() => {
    return calculateExpensesRemainder(
      draftExpensesSum as number,
      monthlyIncome as number
    );
  }, [draftExpensesSum, monthlyIncome]);
  const { currency } = useCurrency();

  return (
    <span
      className={cn("text-end font-semibold shrink-0", {
        "text-muted": remainder === 0,
        "text-destructive": remainder < 0,
        "text-green-700": remainder > 0,
      })}
    >
      {formatNumberWithCommas(remainder)} {currency.symbol}
    </span>
  );
};
