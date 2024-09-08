"use client";

import {
  calculate20SavingsBasedOnIncome,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";

type Props = {};

export const Dashboard20SavingsAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  return (
    <p className="font-semibold shrink-0">
      {formatNumberWithCommas(
        calculate20SavingsBasedOnIncome(monthlyIncome as number)
      )}{" "}
      ₸
    </p>
  );
};
