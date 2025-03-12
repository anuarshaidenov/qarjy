'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Link } from '@/navigation';
import { Budget } from '@/types/budget';
import { cn, formatNumberWithCommas } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useCurrency } from './currency-provider';
import { BudgetCardOptions } from './budget-card-options';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import axios from 'axios';

type Props = {
  budget: Budget;
};

export const BudgetCard = ({ budget }: Props) => {
  const t = useTranslations();
  const { currency } = useCurrency();

  const [loading, setLoading] = React.useState(false);
  const queryClient = useQueryClient();

  const handleHover = () => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.BUDGET, budget.id],
      queryFn: async () => {
        return axios
          .get<Budget>(`/api/budgets/${budget.id}`)
          .then((res) => res.data);
      },
    });
  };

  return (
    <Link href={'/dashboard/budget/' + budget.id}>
      <Card
        onMouseEnter={handleHover}
        className={cn(
          'hover:border-foreground/50 transition-colors min-h-36 relative',
          loading && 'animate-pulse'
        )}
      >
        <CardHeader>
          <CardTitle className="w-[80%] leading-normal truncate">
            {budget.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="space-y-1">
            <p>
              {t('budget-card.income')}:{' '}
              <span className="font-bold">
                {formatNumberWithCommas(budget.monthlyIncome)} {currency.symbol}
              </span>
            </p>
            <p>
              {t('budget-card.total-expenses')}:{' '}
              <span className="font-bold">
                {formatNumberWithCommas(
                  Math.max(
                    budget.essentialExpensesTotal,
                    budget.nonEssentialExpensesTotal,
                    budget.expensesTotal
                  )
                )}{' '}
                {currency.symbol}
              </span>
            </p>
          </div>
        </CardContent>
        <BudgetCardOptions
          budgetId={budget.id}
          triggerClassname="absolute top-2 right-2"
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
        />
      </Card>
    </Link>
  );
};
