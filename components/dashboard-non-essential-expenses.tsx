"use client";

import { useGetBudgetById } from "@/hooks/use-get-budget-by-id";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Expense } from "@/types/seventyfive-10-15-budget";
import { Button } from "./ui/button";
import { NumericFormat } from "./ui/numeric-format";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { NumericFormatProps } from "react-number-format";
import { Budget } from "@/types/budget";
import { DashboardExpense } from "./ui/dashboard-expense";
import { useUpdateBudget } from "@/hooks/use-update-budget";
import { useDeleteExpense } from "@/hooks/use-delete-expense";
import { useDebouncedCallback } from "use-debounce";
import { formatAmount } from "@/lib/utils";
import { useUpdateExpense } from "@/hooks/use-update-expense";

type Props = {};

export const DashboardNonEssentialExpenses = (props: Props) => {
  const params = useParams();
  const { data, isLoading } = useGetBudgetById({ id: params?.id as string });

  if (isLoading) {
    return (
      <ul className="text-sm w-full space-y-1">
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
      </ul>
    );
  }

  return (
    <ul className="text-sm w-full">
      {data?.nonEssentialExpenses.map((expense) => (
        <DashboardNonEssentialExpense
          key={expense.id}
          expense={expense}
          budget={data}
        />
      ))}
    </ul>
  );
};

const DashboardNonEssentialExpense = ({
  expense,
  budget,
}: {
  expense: Expense;
  budget: Budget;
}) => {
  const [amount, setAmount] = useState(0);
  const { mutate: updateExpense, isPending: isUpdatingBudget } =
    useUpdateExpense();

  const { mutate: deleteExpense, isPending: isDeletingExpense } =
    useDeleteExpense();

  const debouncedAmount = useDebouncedCallback((amount: number) => {
    if (!expense) return;

    updateExpense({
      expenseId: expense.id,
      name: expense.name,
      type: "non-essential",
      amount: amount,
    });
  });

  useEffect(() => {
    setAmount(expense.amount || 0);
  }, [expense]);

  return (
    <DashboardExpense
      title={expense.name}
      onDeleteClick={() =>
        deleteExpense({
          budgetId: budget.id,
          expenseId: expense.id,
        })
      }
      inputProps={{
        value: amount,
        onChange: (e) => {
          const amount = formatAmount(e.target.value);
          setAmount(amount);
          debouncedAmount(amount);
        },
      }}
      disabled={isDeletingExpense}
    />
  );
};
