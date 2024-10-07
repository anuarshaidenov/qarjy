"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Expense } from "@/types/seventyfive-10-15-budget";
import { DashboardExpense } from "./ui/dashboard-expense";
import { useDeleteExpense } from "@/hooks/use-delete-expense";
import { useDebouncedCallback } from "use-debounce";
import { formatAmount } from "@/lib/utils";
import { useUpdateExpense } from "@/hooks/use-update-expense";
import { useGetExpensesByTypeAndBudgetId } from "@/hooks/use-get-expenses";
import { useExpensesSum } from "./expenses-sum-provider";
import { useCurrency } from "./currency-provider";

type Props = {};

export const DashboardNonEssentialExpenses = (props: Props) => {
  const params = useParams();
  const { data, isLoading } = useGetExpensesByTypeAndBudgetId(
    params.id as string,
    "non-essential"
  );
  const { setNonEssentialExpensesSum } = useExpensesSum();
  useEffect(() => {
    setNonEssentialExpensesSum(
      data?.reduce((sum, expense) => sum + expense.amount, 0) || 0
    );
  }, [data]);

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
      {data?.map((expense) => (
        <DashboardNonEssentialExpense
          key={expense.id}
          expense={expense}
          budgetId={params.id as string}
        />
      ))}
    </ul>
  );
};

const DashboardNonEssentialExpense = ({
  expense,
  budgetId,
}: {
  expense: Expense;
  budgetId: string;
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
  const { currency } = useCurrency();

  return (
    <DashboardExpense
      currencySymbol={currency.symbol}
      title={expense.name}
      onDeleteClick={() =>
        deleteExpense({
          budgetId: budgetId,
          expenseId: expense.id,
          expenseType: "non-essential",
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
