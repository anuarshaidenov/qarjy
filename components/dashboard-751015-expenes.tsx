'use client';

import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { Skeleton } from './ui/skeleton';
import { Expense } from '@/types/seventyfive-10-15-budget';
import { DashboardExpense } from './ui/dashboard-expense';
import { useDeleteExpense } from '@/hooks/use-delete-expense';
import { useDebouncedCallback } from 'use-debounce';
import { formatAmount } from '@/lib/utils';
import { useUpdateExpense } from '@/hooks/use-update-expense';
import { useGetExpensesByTypeAndBudgetId } from '@/hooks/use-get-expenses';
import { useExpensesSum } from './expenses-sum-provider';
import { useCurrency } from './currency-provider';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {};

export const Dashboard751015Expenses = (props: Props) => {
  const params = useParams();
  const { data, isLoading } = useGetExpensesByTypeAndBudgetId(
    params.id as string,
    'overall'
  );
  const { setOverallExpensesSum } = useExpensesSum();

  useMemo(() => {
    setOverallExpensesSum(
      data?.reduce((sum, expense) => sum + expense.amount, 0) || 0
    );
  }, [data, setOverallExpensesSum]);

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
            <Dashboard751015Expense
              expense={expense}
              budgetId={params.id as string}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </ul>
  );
};

const Dashboard751015Expense = ({
  expense,
  budgetId,
}: {
  expense: Expense;
  budgetId: string;
}) => {
  const { mutate: updateExpense } = useUpdateExpense();

  const { mutate: deleteExpense, isPending: isDeletingExpense } =
    useDeleteExpense();

  const debouncedAmount = useDebouncedCallback((amount: number) => {
    if (!expense) return;

    updateExpense({
      expenseId: expense.id,
      name: expense.name,
      type: 'overall',
      amount: amount,
      budgetId: budgetId,
    });
  }, 500);

  const { currency } = useCurrency();

  return (
    <DashboardExpense
      currencySymbol={currency.symbol}
      title={expense.name}
      onDeleteClick={() =>
        deleteExpense({
          budgetId: budgetId,
          expenseId: expense.id,
          expenseType: 'overall',
        })
      }
      inputProps={{
        value: expense.amount || 0,
        onChange: (e) => {
          const amount = formatAmount(e.target.value);
          debouncedAmount(amount);
        },
      }}
      disabled={isDeletingExpense}
    />
  );
};
