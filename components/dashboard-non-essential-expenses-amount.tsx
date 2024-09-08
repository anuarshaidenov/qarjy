"use client";

import {
  calculateNonEssentialExpensesBasedOnIncome,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";

type Props = {};

export const DashboardNonEssenialExpensesAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  return (
    <p className="font-semibold shrink-0">
      {formatNumberWithCommas(
        calculateNonEssentialExpensesBasedOnIncome(monthlyIncome as number)
      )}{" "}
      ₸
    </p>
  );
};
