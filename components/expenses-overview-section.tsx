'use client';

import { useTranslations } from 'next-intl';
import { ExpensesChartOverview } from './expenses-chart-overview';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { LOCALSTORAGE_KEYS } from '@/lib/constants';

type Props = {};

export const ExpensesOverviewSection = (props: Props) => {
  const t = useTranslations();
  const [selectedBudgetType, setSelectedBudgetType] = useState('751015');
  useEffect(() => {
    if (!localStorage) return;
    setSelectedBudgetType(
      localStorage?.getItem(LOCALSTORAGE_KEYS.currentTab) || '751015'
    );
  }, [selectedBudgetType]);

  return (
    <div className="flex flex-col gap-8 mt-36">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl md:text-4xl font-bold">
          {t('dashboard.expenses-chart-overview-title')}.
        </h2>

        <Select
          onValueChange={(value) => {
            localStorage.setItem(LOCALSTORAGE_KEYS.currentTab, value);
            setSelectedBudgetType(value);
          }}
          value={selectedBudgetType}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Budget type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="751015">75-10-15</SelectItem>
            <SelectItem value="503020">50-30-20</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-muted-foreground font-mono">
        {t('dashboard.expenses-chart-overview-description')}
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        {selectedBudgetType === '503020' && (
          <>
            <ExpensesChartOverview
              title={t('dashboard.app.essential-expenses')}
              expenseType="essential"
            />
            <ExpensesChartOverview
              title={t('dashboard.app.non-essential-expenses')}
              expenseType="non-essential"
            />
          </>
        )}

        {selectedBudgetType === '751015' && (
          <>
            <ExpensesChartOverview
              title={t('dashboard.app.overall-expenses')}
              expenseType="overall"
            />
          </>
        )}
      </div>
    </div>
  );
};
