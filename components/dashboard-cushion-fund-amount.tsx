"use client";

import {
  calculateCushionFundBasedOnIncome,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";
import { useMemo } from "react";
import { useCurrency } from "./currency-provider";
import { CopyToClipboard } from "./copy-to-clipboard";

type Props = {};

export const DashboardCushionFundAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  const cushionFundAmount = useMemo(() => {
    return calculateCushionFundBasedOnIncome(monthlyIncome as number);
  }, [monthlyIncome]);
  const { currency } = useCurrency();

  return (
    <CopyToClipboard asChild text={cushionFundAmount.toString()}>
      <p className="font-semibold shrink-0">
      {formatNumberWithCommas(cushionFundAmount)} {currency.symbol}
    </p>
    </CopyToClipboard>
  );
};
