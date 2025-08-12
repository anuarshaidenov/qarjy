"use client";

import {
  calculate15SavingsBasedOnIncome,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";
import { useMemo } from "react";
import { useCurrency } from "./currency-provider";
import { CopyToClipboard } from "./copy-to-clipboard";

type Props = {};

export const Dashboard15SavingsAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  const savingsAmount = useMemo(() => {
    return calculate15SavingsBasedOnIncome(monthlyIncome as number);
  }, [monthlyIncome]);
  const { currency } = useCurrency();

  return (
      <CopyToClipboard asChild text={savingsAmount.toString()}>
        <p className="font-semibold shrink-0">
        {formatNumberWithCommas(savingsAmount)} {currency.symbol}
      </p>
      </CopyToClipboard>
  );
};
