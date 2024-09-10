'use client';

import {
  calculateNonEssentialExpensesBasedOnIncome,
  formatNumberWithCommas,
} from '@/lib/utils';
import { useMonthlyIncome } from './monthly-income-context-provider';
import { useMemo } from 'react';

type Props = {};

export const DashboardNonEssenialExpensesAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  const nonEssentialExpensesAmount = useMemo(() => {
    return calculateNonEssentialExpensesBasedOnIncome(monthlyIncome as number);
  }, [monthlyIncome]);

  return (
    <p className="font-semibold shrink-0">
      {formatNumberWithCommas(nonEssentialExpensesAmount)} ₸
    </p>
  );
};
