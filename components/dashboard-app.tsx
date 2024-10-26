'use client';

import { useMethodTabs } from '@/hooks/useMethodTabs';
import { Dashboard503020Card } from './dashboard-503020-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dashboard751015Card } from './dashboard-751015-card';
import { LOCALSTORAGE_KEYS } from '@/lib/constants';
import { MonthlyIncomeProvider } from './monthly-income-context-provider';
import { ExpensesSumProvider } from './expenses-sum-provider';
import { Dashboard751015Stats } from './dashboard-751015-stats';
import { Dashboard503020Stats } from './dashboard-503020-stats';
import { useEffect, useState } from 'react';

type Props = {};

export const DashboardApp = (props: Props) => {
  const tabs = useMethodTabs();
  const [tabValue, setTabValue] = useState(tabs[0].value);
  useEffect(() => {
    if (!localStorage) return;
    setTabValue(
      localStorage?.getItem(LOCALSTORAGE_KEYS.currentTab) || tabs[0].value
    );
  }, [tabs]);

  return (
    <MonthlyIncomeProvider>
      <ExpensesSumProvider>
        <Tabs value={tabValue}>
          <TabsList className="grid grid-cols-2">
            {tabs.map((tab) => (
              <TabsTrigger
                onClick={() => {
                  localStorage.setItem(LOCALSTORAGE_KEYS.currentTab, tab.value);
                  setTabValue(tab.value);
                }}
                key={tab.value}
                value={tab.value}
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={tabs[0].value}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Dashboard503020Card />
              <Dashboard503020Stats />
            </div>
          </TabsContent>
          <TabsContent value={tabs[1].value}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Dashboard751015Card />
              <Dashboard751015Stats />
            </div>
          </TabsContent>
        </Tabs>
      </ExpensesSumProvider>
    </MonthlyIncomeProvider>
  );
};
