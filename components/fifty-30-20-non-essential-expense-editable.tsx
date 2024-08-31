import { formatAmount, formatNumberWithCommas } from "@/lib/utils";
import {
  EssentialExpense,
  NonEssentialExpense,
} from "@/types/fifty-20-30-budget";
import React from "react";
import { Input } from "./ui/input";
import { NumericFormat } from "react-number-format";
import { useFifty2030 } from "@/hooks/use-fifty-20-30";
import { Button } from "./ui/button";
import { CircleBackslashIcon } from "@radix-ui/react-icons";

type Props = {
  expense: NonEssentialExpense;
};

export const NonEssentialExpenseEditable = ({ expense }: Props) => {
  const {
    handleEditNonEssentialExpenseById,
    handleDeleteNonEssentialExpenseById,
  } = useFifty2030();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = formatAmount(e.target.value);

    handleEditNonEssentialExpenseById(expense.id, amount);
  };

  const handleDelete = () => {
    handleDeleteNonEssentialExpenseById(expense.id);
  };

  return (
    <li
      key={expense.id}
      className="flex items-center py-1 justify-between w-full group"
    >
      <span>{expense.name}</span>
      <div className="flex shrink grow-0 items-center gap-2">
        <NumericFormat
          value={expense.amount || ""}
          thousandSeparator=","
          customInput={Input}
          onChange={handleChange}
          className="md:w-[120px] w-[80px]"
        />
        <span className="md:flex hidden md:group-hover:hidden text-lg">
          KZT
        </span>
        <Button
          className="shrink-0 md:hidden md:group-hover:flex transition-opacity"
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
