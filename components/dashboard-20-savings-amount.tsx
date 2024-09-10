'use client';

import {
  calculate20SavingsBasedOnIncome,
  formatNumberWithCommas,
} from '@/lib/utils';
import { useMonthlyIncome } from './monthly-income-context-provider';
import { useMemo } from 'react';

type Props = {};

export const Dashboard20SavingsAmount = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  const savingsAmount = useMemo(() => {
    return calculate20SavingsBasedOnIncome(monthlyIncome as number);
  }, [monthlyIncome]);

  return (
    <p className="font-semibold shrink-0">
      {formatNumberWithCommas(savingsAmount)} ₸
    </p>
  );
};
