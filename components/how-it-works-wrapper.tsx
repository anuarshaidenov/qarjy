"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMethodTabs } from "@/hooks/useMethodTabs";
import { LOCALSTORAGE_KEYS } from "@/lib/constants";
import { useEffect, useState } from "react";

import { ReactNode } from "react";

type Props = {
  fifty3020content: ReactNode;
  seventyfive1015content: ReactNode;
};

export const HowItWorksWrapper = ({
  fifty3020content,
  seventyfive1015content,
}: Props) => {
  const tabs = useMethodTabs();

  const [tabValue, setTabValue] = useState(tabs[0].value);

  useEffect(() => {
    if (!localStorage) return;
    setTabValue(
      localStorage.getItem(LOCALSTORAGE_KEYS.currentTab) || tabs[0].value
    );
  }, [tabs]);

  return (
    <Tabs value={tabValue}>
      <TabsList className="grid grid-cols-2 mx-auto max-w-[600px]">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            onClick={() => {
              localStorage.setItem(LOCALSTORAGE_KEYS.currentTab, tab.value);
              setTabValue(tab.value);
            }}
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={"503020"} className="py-16">
        {fifty3020content}
      </TabsContent>
      <TabsContent value={"751015"} className="py-16">
        {seventyfive1015content}
      </TabsContent>
    </Tabs>
  );
};
