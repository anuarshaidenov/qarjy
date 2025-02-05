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
import { AnimatePresence, motion } from "motion/react";

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
  }, [data, setNonEssentialExpensesSum]);

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
      <AnimatePresence>
        {data?.map((expense, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <DashboardNonEssentialExpense
              expense={expense}
              budgetId={params.id as string}
            />
          </motion.div>
        ))}
      </AnimatePresence>
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
  const [title, setTitle] = useState("");
  const { mutate: updateExpense, isPending: isUpdatingBudget } =
    useUpdateExpense();

  const { mutate: deleteExpense, isPending: isDeletingExpense } =
    useDeleteExpense();

  const debouncedAmount = useDebouncedCallback((amount: number) => {
    if (!expense) return;

    updateExpense({
      expenseId: expense.id,
      name: title,
      type: "non-essential",
      amount: amount,
      budgetId: budgetId,
    });
  }, 500);

  const debouncedTitle = useDebouncedCallback((title: string) => {
    if (!expense) return;
    updateExpense({
      expenseId: expense.id,
      name: title,
      type: "non-essential",
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
      onDeleteClick={() =>
        deleteExpense({
          budgetId: budgetId,
          expenseId: expense.id,
          expenseType: "non-essential",
        })
      }
      textInputProps={{
        value: title,
        onChange: (e) => {
          setTitle(e.target.value);
          debouncedTitle(e.target.value);
        },
      }}
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
