"use client";

import { useMethodTabs } from "@/hooks/useMethodTabs";
import { Dashboard503020Card } from "./dashboard-503020-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dashboard751015Card } from "./dashboard-751015-card";
import { LOCALSTORAGE_KEYS } from "@/lib/constants";

type Props = {};

export const DashboardApp = (props: Props) => {
  const tabs = useMethodTabs();

  return (
    <Tabs
      defaultValue={
        localStorage.getItem(LOCALSTORAGE_KEYS.currentTab) || tabs[0].value
      }
    >
      <TabsList className="grid grid-cols-2">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={tabs[0].value}>
        <Dashboard503020Card />
      </TabsContent>
      <TabsContent value={tabs[1].value}>
        <Dashboard751015Card />
      </TabsContent>
    </Tabs>
  );
};
