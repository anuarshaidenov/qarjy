"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LOCALSTORAGE_KEYS } from "@/lib/constants";
import { useTranslations } from "next-intl";

import { ReactNode } from "react";

type Props = {
  fifty3020content: ReactNode;
  seventyfive1015content: ReactNode;
};

export const HowItWorksWrapper = ({
  fifty3020content,
  seventyfive1015content,
}: Props) => {
  const t = useTranslations("home.how-it-works");
  const tabs = [
    {
      value: "503020",
      name: t("tab-list.503020"),
    },
    {
      value: "751015",
      name: t("tab-list.751015"),
    },
  ];

  return (
    <Tabs
      defaultValue={
        localStorage.getItem(LOCALSTORAGE_KEYS.currentTab) || tabs[0].value
      }
    >
      <TabsList className="grid grid-cols-2 mx-auto max-w-[600px]">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
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
