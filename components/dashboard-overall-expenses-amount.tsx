"use client";

import {
  calculateOverallExpensesBasedOnIncome,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";

type Props = {};

export const DashboardOverallExpensesAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  return (
    <p className="font-semibold shrink-0">
      {formatNumberWithCommas(
        calculateOverallExpensesBasedOnIncome(monthlyIncome as number)
      )}{" "}
      ₸
    </p>
  );
};
