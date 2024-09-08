"use client";

import { DashboardExpense } from "./ui/dashboard-expense";
import { Budget, Expense } from "@/types/budget";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { formatAmount } from "@/lib/utils";
import { useDeleteExpense } from "@/hooks/use-delete-expense";
import { useUpdateExpense } from "@/hooks/use-update-expense";

type Props = {
  expense: Expense;
  budget: Budget;
};

export const DashboardEssentialExpense = ({ expense, budget }: Props) => {
  const [amount, setAmount] = useState(0);
  const { mutate: updateExpense } = useUpdateExpense();
  const { mutate: deleteExpense, isPending: isDeletingExpense } =
    useDeleteExpense();
  const debouncedAmount = useDebouncedCallback((amount: number) => {
    if (!expense) return;
    updateExpense({
      expenseId: expense.id,
      name: expense.name,
      type: "essential",
      amount: amount,
    });
  });

  useEffect(() => {
    setAmount(expense.amount || 0);
  }, [expense]);

  return (
    <DashboardExpense
      title={expense.name}
      inputProps={{
        value: amount,
        onChange: (e) => {
          const amount = formatAmount(e.target.value);
          setAmount(amount);
          debouncedAmount(amount);
        },
      }}
      onDeleteClick={() => {
        deleteExpense({
          budgetId: budget.id,
          expenseId: expense.id,
        });
      }}
      disabled={isDeletingExpense}
    />
  );
};
