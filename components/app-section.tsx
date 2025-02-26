"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fifty3020BudgetCardLocal } from "./fifty-30-20-budget-card";
import { BudgetContextProvider as Fifty3020BudgetContextProvider } from "./fifty-30-20-budget-context-provider";
import { SeventyFive1015BudgetCard } from "./seventyfive-10-15-budget-card";
import { BudgetContextProvider as SeventyFive1015BudgetContextProvider } from "./seventyfive-10-15-context-provider";
import { LOCALSTORAGE_KEYS } from "@/lib/constants";
import { useMethodTabs } from "@/hooks/useMethodTabs";
import { useEffect, useState } from "react";

type Props = {};

export const AppSection = (props: Props) => {
  const tabs = useMethodTabs({
    excludeSections: ["draft"],
  });

  const [tabValue, setTabValue] = useState(tabs[0].value);

  useEffect(() => {
    if (!localStorage) return;
    const currentTab = localStorage?.getItem(LOCALSTORAGE_KEYS.currentTab);
    if (currentTab === "draft") {
      setTabValue(tabs[0].value);
      return;
    }

    setTabValue(
      localStorage?.getItem(LOCALSTORAGE_KEYS.currentTab) || tabs[0].value
    );
  }, [tabs]);

  return (
    <div className="w-full mx-auto flex flex-col gap-10 max-w-[600px]">
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
        <TabsContent value="503020">
          <Fifty3020BudgetContextProvider>
            <Fifty3020BudgetCardLocal />
          </Fifty3020BudgetContextProvider>
        </TabsContent>
        <TabsContent value="751015">
          <SeventyFive1015BudgetContextProvider>
            <SeventyFive1015BudgetCard />
          </SeventyFive1015BudgetContextProvider>
        </TabsContent>
      </Tabs>
    </div>
  );
};
