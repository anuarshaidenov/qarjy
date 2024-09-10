import {
  calculateExpensesRemainder,
  calculateNonEssentialExpensesBasedOnIncome,
  calculateOverallExpensesBasedOnIncome,
  cn,
  formatNumberWithCommas,
} from '@/lib/utils';
import { useMonthlyIncome } from './monthly-income-context-provider';
import { useExpensesSum } from './expenses-sum-provider';
import { useMemo } from 'react';

type Props = {};

export const DashboardOverallExpensesRemainder = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  const { overallExpensesSum } = useExpensesSum();
  const overallExpensesAmount = useMemo(() => {
    return calculateOverallExpensesBasedOnIncome(monthlyIncome as number);
  }, [monthlyIncome]);

  const remainder = useMemo(() => {
    return calculateExpensesRemainder(
      overallExpensesSum as number,
      overallExpensesAmount as number
    );
  }, [overallExpensesSum, overallExpensesAmount]);

  return (
    <span
      className={cn('text-end font-semibold shrink-0', {
        'text-muted': remainder === 0,
        'text-destructive': remainder < 0,
        'text-green-700': remainder > 0,
      })}
    >
      {formatNumberWithCommas(remainder)} ₸
    </span>
  );
};
