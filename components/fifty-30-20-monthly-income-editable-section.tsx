"use client";

import { Label } from "@/components/ui/label";
import { useFifty2030 } from "@/hooks/use-fifty-20-30";
import { Input } from "./ui/input";
import { NumericFormat } from "react-number-format";
import { formatAmount } from "@/lib/utils";

type Props = {};

export const MonthlyIncomeEditableSection = (props: Props) => {
  const { budget, setBudget } = useFifty2030();

  const handleMonthlyIncomeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = formatAmount(event.target.value);

    setBudget({
      ...budget,
      monthlyIncome: amount,
    });
  };

  return (
    <div className="flex items-center w-full border-b pb-4">
      <Label className="md:text-lg font-semibold grow" id="monthly-income">
        Your monthly income:
      </Label>
      <div className="shrink max-w-[180px] flex items-center gap-2">
        <NumericFormat
          autoComplete="off"
          className="md:text-lg font-semibold"
          customInput={Input}
          id="monthly-income"
          thousandSeparator=","
          value={budget?.monthlyIncome}
          onChange={handleMonthlyIncomeChange}
        />
        <span>KZT</span>
      </div>
    </div>
  );
};
