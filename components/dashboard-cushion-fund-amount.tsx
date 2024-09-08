"use client";

import {
  calculateCushionFundBasedOnIncome,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";

type Props = {};

export const DashboardCushionFundAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  return (
    <p className="font-semibold shrink-0">
      {formatNumberWithCommas(
        calculateCushionFundBasedOnIncome(monthlyIncome as number)
      )}{" "}
      ₸
    </p>
  );
};
