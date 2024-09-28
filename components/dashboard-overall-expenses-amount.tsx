"use client";

import {
  calculateOverallExpensesBasedOnIncome,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";
import { useMemo } from "react";
import { useCurrency } from "./currency-provider";

type Props = {};

export const DashboardOverallExpensesAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  const overallExpensesAmount = useMemo(() => {
    return calculateOverallExpensesBasedOnIncome(monthlyIncome as number);
  }, [monthlyIncome]);
  const { currency } = useCurrency();

  return (
    <p className="font-semibold shrink-0">
      {formatNumberWithCommas(overallExpensesAmount)} {currency.symbol}
    </p>
  );
};
