"use client";

import { useMethodTabs } from "@/hooks/useMethodTabs";
import { Dashboard503020Card } from "./dashboard-503020-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dashboard751015Card } from "./dashboard-751015-card";
import { LOCALSTORAGE_KEYS } from "@/lib/constants";
import { MonthlyIncomeProvider } from "./monthly-income-context-provider";

type Props = {};

export const DashboardApp = (props: Props) => {
  const tabs = useMethodTabs();

  return (
    <MonthlyIncomeProvider>
      <Tabs
        defaultValue={
          localStorage.getItem(LOCALSTORAGE_KEYS.currentTab) || tabs[0].value
        }
      >
        <TabsList className="grid grid-cols-2 md:w-1/2">
          {tabs.map((tab) => (
            <TabsTrigger
              onClick={() =>
                localStorage.setItem(LOCALSTORAGE_KEYS.currentTab, tab.value)
              }
              key={tab.value}
              value={tab.value}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tabs[0].value}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Dashboard503020Card />
          </div>
        </TabsContent>
        <TabsContent value={tabs[1].value}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Dashboard751015Card />
          </div>
        </TabsContent>
      </Tabs>
    </MonthlyIncomeProvider>
  );
};
