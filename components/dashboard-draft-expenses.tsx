"use client";

import { DashboardExpense } from "./ui/dashboard-expense";
import { Expense } from "@/types/budget";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { formatAmount } from "@/lib/utils";
import { useDeleteExpense } from "@/hooks/use-delete-expense";
import { useUpdateExpense } from "@/hooks/use-update-expense";
import { useCurrency } from "./currency-provider";
import { Skeleton } from "./ui/skeleton";
import { useExpensesSum } from "./expenses-sum-provider";
import { useGetExpensesByTypeAndBudgetId } from "@/hooks/use-get-expenses";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export const DashboardDraftExpenses = () => {
  const params = useParams();
  const { data, isLoading } = useGetExpensesByTypeAndBudgetId(
    params.id as string,
    "draft"
  );
  const { setDraftExpensesSum } = useExpensesSum();
  useEffect(() => {
    setDraftExpensesSum(
      data?.reduce((sum, expense) => sum + expense.amount, 0) || 0
    );
  }, [data]);

  const t = useTranslations();

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

  if (!data?.length) {
    return (
      <p className="text-sm">{t("dashboard-draft-expenses.no-expenses")}</p>
    );
  }

  return (
    <ul className="text-sm w-full">
      {data?.map((expense) => (
        <DashboardDraftExpense
          key={expense.id}
          expense={expense}
          budgetId={params.id as string}
        />
      ))}
    </ul>
  );
};

const DashboardDraftExpense = ({
  expense,
  budgetId,
}: {
  expense: Expense;
  budgetId: string;
}) => {
  const [amount, setAmount] = useState(0);
  const { mutate: updateExpense } = useUpdateExpense();
  const { mutate: deleteExpense, isPending: isDeletingExpense } =
    useDeleteExpense();
  const debouncedAmount = useDebouncedCallback((amount: number) => {
    if (!expense) return;
    updateExpense({
      expenseId: expense.id,
      name: expense.name,
      type: "draft",
      amount: amount,
      budgetId: budgetId,
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
          budgetId: budgetId,
          expenseId: expense.id,
          expenseType: "draft",
        });
      }}
      disabled={isDeletingExpense}
    />
  );
};
