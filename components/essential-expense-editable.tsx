import { formatAmount, formatNumberWithCommas } from "@/lib/utils";
import { EssentialExpense } from "@/types/fifty-20-30-budget";
import React from "react";
import { Input } from "./ui/input";
import { NumericFormat } from "react-number-format";
import { useFifty2030 } from "@/hooks/use-fifty-20-30";
import { Button } from "./ui/button";
import { CircleBackslashIcon } from "@radix-ui/react-icons";

type Props = {
  expense: EssentialExpense;
};

export const EssentialExpenseEditable = ({ expense }: Props) => {
  const { handleEditEssentialExpenseById, handleDeleteEssentialExpenseById } =
    useFifty2030();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = formatAmount(e.target.value);
    handleEditEssentialExpenseById(expense.id, amount);
  };

  const handleDelete = () => {
    handleDeleteEssentialExpenseById(expense.id);
  };

  return (
    <li
      key={expense.id}
      className="flex items-center py-1 justify-between w-full group"
    >
      <span>{expense.name}</span>
      <div className="flex shrink grow-0 items-center  gap-2">
        <NumericFormat
          value={expense.amount || ""}
          thousandSeparator=","
          customInput={Input}
          onChange={handleChange}
          suffix=" KZT"
          className="w-[120px]"
        />
        <Button
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          variant={"destructive"}
          size={"icon"}
          onClick={handleDelete}
        >
          <CircleBackslashIcon />
        </Button>
      </div>
    </li>
  );
};
