"use client";

import { SeventyFive1015Budget } from "@/types/seventyfive-10-15-budget";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const initialBudget: SeventyFive1015Budget = {
  id: crypto.randomUUID(),
  title: "September Budget",
  monthlyIncome: 1000000,
  expenses: [
    {
      id: crypto.randomUUID(),
      name: "Rent",
      amount: 200000,
    },
    {
      id: crypto.randomUUID(),
      name: "Groceries",
      amount: 50000,
    },
  ],
  cushionFund: 0,
  savings: 0,
};

export const BudgetContext = React.createContext<{
  budget: SeventyFive1015Budget;
  setBudget: React.Dispatch<React.SetStateAction<SeventyFive1015Budget>>;
}>(
  (() => {
    return {
      budget: initialBudget,
      setBudget: () => {},
    };
  })()
);

export const BudgetContextProvider = ({ children }: Props) => {
  const t = useTranslations("home.app.tab-content.751015.app-data");

  const newBudget = {
    ...initialBudget,
    title: t("title"),
    expenses: [
      ...initialBudget.expenses.map((expense, i) => ({
        ...expense,
        name: t("item-" + (i + 1)) as string,
      })),
    ],
  };

  const [budget, setBudget] = React.useState<SeventyFive1015Budget>(newBudget);

  return (
    <BudgetContext.Provider value={{ budget, setBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};
