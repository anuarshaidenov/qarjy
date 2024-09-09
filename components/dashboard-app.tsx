"use client";

import { useMethodTabs } from "@/hooks/useMethodTabs";
import { Dashboard503020Card } from "./dashboard-503020-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dashboard751015Card } from "./dashboard-751015-card";
import { LOCALSTORAGE_KEYS } from "@/lib/constants";
import { MonthlyIncomeProvider } from "./monthly-income-context-provider";
import { ExpensesSumProvider } from "./expenses-sum-provider";
import { ComingSoonCard } from "./coming-soon-card";
import { useTranslations } from "next-intl";

type Props = {};

export const DashboardApp = (props: Props) => {
  const tabs = useMethodTabs();
  const t = useTranslations();

  return (
    <MonthlyIncomeProvider>
      <ExpensesSumProvider>
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
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Dashboard503020Card />
              <ComingSoonCard
                className="w-full h-full bg-foreground/20"
                title={t("dashboard.coming-soon")}
              />
            </div>
          </TabsContent>
          <TabsContent value={tabs[1].value}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Dashboard751015Card />
              <ComingSoonCard
                className="w-full h-full bg-foreground/20"
                title={t("dashboard.coming-soon")}
              />
            </div>
          </TabsContent>
        </Tabs>
      </ExpensesSumProvider>
    </MonthlyIncomeProvider>
  );
};
