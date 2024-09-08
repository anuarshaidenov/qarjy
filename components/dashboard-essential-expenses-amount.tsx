"use client";

import {
  calculateEssentialExpensesBasedOnIncome,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";

type Props = {};

export const DashboardEssenialExpensesAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  return (
    <p className="font-semibold shrink-0">
      {formatNumberWithCommas(
        calculateEssentialExpensesBasedOnIncome(monthlyIncome as number)
      )}{" "}
      ₸
    </p>
  );
};
