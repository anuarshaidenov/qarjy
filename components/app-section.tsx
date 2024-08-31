"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fifty3020BudgetCardLocal } from "./fifty-30-20-budget-card";
import { Fifty2030Form } from "./fifty-30-20-form";
import { useState } from "react";
import { Fifty2030Budget } from "@/types/fifty-20-30-budget";
import { createContext } from "react";
import { BudgetContextProvider } from "./budget-context-provider";

type Props = {};

export const AppSection = (props: Props) => {
  const tabs = [
    {
      value: "503020",
      name: "50-30-20 Rule",
    },
    {
      value: "751015",
      name: "75-10-15 Rule",
    },
  ];

  return (
    <BudgetContextProvider>
      <div className="w-full mx-auto flex flex-col gap-10 max-w-[600px]">
        <Tabs defaultValue={tabs[0].value}>
          <TabsList className="grid grid-cols-2">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="503020">
            <Fifty3020BudgetCardLocal />
          </TabsContent>
          <TabsContent value="751015">
            <Fifty3020BudgetCardLocal />
          </TabsContent>
        </Tabs>
      </div>
    </BudgetContextProvider>
  );
};
