"use client";

import { DashboardExpense } from "./ui/dashboard-expense";
import { Expense } from "@/types/budget";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { formatAmount } from "@/lib/utils";
import { useDeleteExpense } from "@/hooks/use-delete-expense";
import { useUpdateExpense } from "@/hooks/use-update-expense";
import { useCurrency } from "./currency-provider";

type Props = {
  expense: Expense;
  budgetId: string;
};

export const DashboardEssentialExpense = ({ expense, budgetId }: Props) => {
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const { mutate: updateExpense } = useUpdateExpense();
  const { mutate: deleteExpense, isPending: isDeletingExpense } =
    useDeleteExpense();
  const debouncedAmount = useDebouncedCallback((amount: number) => {
    if (!expense) return;
    updateExpense({
      expenseId: expense.id,
      name: title,
      type: "essential",
      amount: amount,
      budgetId: budgetId,
    });
  }, 500);
  const debouncedTitle = useDebouncedCallback((title: string) => {
    if (!expense) return;
    updateExpense({
      expenseId: expense.id,
      name: title,
      type: "essential",
      amount: expense.amount,
      budgetId: budgetId,
    });
  }, 500);

  useEffect(() => {
    setAmount(expense.amount || 0);
    setTitle(expense.name);
  }, [expense]);
  const { currency } = useCurrency();

  return (
    <DashboardExpense
      currencySymbol={currency.symbol}
      title={expense.name}
      inputProps={{
        value: amount,
        onChange: (e) => {
          const amount = formatAmount(e.target.value);
          setAmount(amount);
          debouncedAmount(amount);
        },
      }}
      textInputProps={{
        value: title,
        onChange: (e) => {
          setTitle(e.target.value);
          debouncedTitle(e.target.value);
        },
      }}
      onDeleteClick={() => {
        deleteExpense({
          budgetId: budgetId,
          expenseId: expense.id,
          expenseType: "essential",
        });
      }}
      disabled={isDeletingExpense}
    />
  );
};
