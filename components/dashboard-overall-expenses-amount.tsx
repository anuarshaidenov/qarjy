"use client";

import {
  calculateOverallExpensesBasedOnIncome,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";
import { useMemo } from "react";
import { useCurrency } from "./currency-provider";
import { CopyToClipboard } from "./copy-to-clipboard";

type Props = {};

export const DashboardOverallExpensesAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  const overallExpensesAmount = useMemo(() => {
    return calculateOverallExpensesBasedOnIncome(monthlyIncome as number);
  }, [monthlyIncome]);
  const { currency } = useCurrency();

  return (
    <CopyToClipboard asChild text={overallExpensesAmount.toString()}>
      <p className="font-semibold shrink-0">
        {formatNumberWithCommas(overallExpensesAmount)} {currency.symbol}
      </p>
    </CopyToClipboard>
  );
};
