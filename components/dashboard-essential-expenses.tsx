'use client';

import { useParams } from 'next/navigation';
import { DashboardEssentialExpense } from './dashboard-essential-expense';
import { Skeleton } from './ui/skeleton';
import { useGetExpensesByTypeAndBudgetId } from '@/hooks/use-get-expenses';
import { useExpensesSum } from './expenses-sum-provider';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {};

export const DashboardEssentialExpenses = (props: Props) => {
  const params = useParams();
  const { data, isLoading } = useGetExpensesByTypeAndBudgetId(
    params.id as string,
    'essential'
  );
  const { setEssentialExpensesSum } = useExpensesSum();
  useEffect(() => {
    setEssentialExpensesSum(
      data?.reduce((sum, expense) => sum + expense.amount, 0) || 0
    );
  }, [data, setEssentialExpensesSum]);

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
            <DashboardEssentialExpense
              expense={expense}
              budgetId={params.id as string}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </ul>
  );
};
