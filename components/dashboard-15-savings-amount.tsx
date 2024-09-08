"use client";

import {
  calculate15SavingsBasedOnIncome,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";

type Props = {};

export const Dashboard15SavingsAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  return (
    <p className="font-semibold shrink-0">
      {formatNumberWithCommas(
        calculate15SavingsBasedOnIncome(monthlyIncome as number)
      )}{" "}
      ₸
    </p>
  );
};
