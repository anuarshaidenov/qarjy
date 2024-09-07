"use client";

import { useUpdateBudget } from "@/hooks/use-update-budget";
import { DashboardExpense } from "./ui/dashboard-expense";
import { Budget, Expense } from "@/types/budget";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { formatAmount } from "@/lib/utils";
import { useDeleteExpense } from "@/hooks/use-delete-expense";

type Props = {
  expense: Expense;
  budget: Budget;
};

export const DashboardEssentialExpense = ({ expense, budget }: Props) => {
  const [amount, setAmount] = useState(0);
  const { mutate: updateBudget, isPending: isUpdatingBudget } =
    useUpdateBudget();
  const { mutate: deleteExpense, isPending: isDeletingExpense } =
    useDeleteExpense();
  const debouncedAmount = useDebouncedCallback((amount: number) => {
    if (!budget) return;

    const newBudget = {
      ...budget,
      essentialExpenses: budget.essentialExpenses.map((e) => {
        if (e.id === expense.id) {
          return {
            ...e,
            amount: amount,
          };
        }
        return e;
      }),
    };
    updateBudget(newBudget);
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
