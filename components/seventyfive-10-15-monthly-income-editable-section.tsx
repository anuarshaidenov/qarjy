"use client";

import { useSeventyFive1015 } from "@/hooks/use-seventyfive-10-15";
import { formatAmount } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useFifty2030 } from "@/hooks/use-fifty-20-30";
import { Input } from "./ui/input";
import { NumericFormat } from "react-number-format";

type Props = {};

export const Seventyfive1015MonthlyIncomeEditableSection = (props: Props) => {
  const { budget, setBudget } = useSeventyFive1015();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = formatAmount(e.target.value);

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
          onChange={handleChange}
        />
        <span>KZT</span>
      </div>
    </div>
  );
};
