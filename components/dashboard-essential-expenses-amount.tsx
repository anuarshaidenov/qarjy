"use client";

import {
  calculateEssentialExpensesBasedOnIncome,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";
import { useMemo } from "react";
import { useCurrency } from "./currency-provider";

type Props = {};

export const DashboardEssenialExpensesAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  const essentialExpensesAmount = useMemo(() => {
    return calculateEssentialExpensesBasedOnIncome(monthlyIncome as number);
  }, [monthlyIncome]);
  const { currency } = useCurrency();

  return (
    <p className="font-semibold shrink-0">
      {formatNumberWithCommas(essentialExpensesAmount)} {currency.symbol}
    </p>
  );
};
