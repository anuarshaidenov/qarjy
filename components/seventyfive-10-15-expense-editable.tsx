"use client";

import { Expense } from "@/types/seventyfive-10-15-budget";
import { NumericFormat } from "react-number-format";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { formatAmount } from "@/lib/utils";
import { useSeventyFive1015 } from "@/hooks/use-seventyfive-10-15";

type Props = {
  expense: Expense;
};

export const Seventyfive1015ExpenseEditable = ({ expense }: Props) => {
  const { budget, setBudget, setBudgetToLocalStorage } = useSeventyFive1015();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = formatAmount(e.target.value);

    const newBudget = {
      ...budget,
      expenses: budget.expenses.map((e) => {
        if (e.id === expense.id) {
          return {
            ...e,
            amount,
          };
        }
        return e;
      }),
    };

    setBudget(newBudget);
    setBudgetToLocalStorage(newBudget);
  };

  const handleDelete = () => {
    const newBudget = {
      ...budget,
      expenses: budget.expenses.filter((e) => e.id !== expense.id),
    };
    setBudget(newBudget);
    setBudgetToLocalStorage(newBudget);
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
          className="md:w-[120px] w-[80px]"
          autoComplete="off"
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
