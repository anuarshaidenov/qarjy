import { formatAmount, formatNumberWithCommas } from "@/lib/utils";
import { EssentialExpense } from "@/types/fifty-20-30-budget";
import React from "react";
import { Input } from "./ui/input";
import { NumericFormat } from "react-number-format";
import { useFifty2030 } from "@/hooks/use-fifty-20-30";

type Props = {
  expense: EssentialExpense;
};

export const ExpenseEditable = ({ expense }: Props) => {
  const { handleEditExpenseById } = useFifty2030();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = formatAmount(e.target.value);

    handleEditExpenseById(expense.id, amount);
  };

  return (
    <li
      key={expense.id}
      className="flex items-center py-1 justify-between w-full"
    >
      <span>{expense.name}</span>
      <div className="flex shrink grow-0 max-w-[140px] items-center gap-2">
        <NumericFormat
          value={expense.amount || 0}
          thousandSeparator=","
          allowNegative={false}
          customInput={Input}
          onChange={handleChange}
        />
        <span>KZT</span>
      </div>
    </li>
  );
};
