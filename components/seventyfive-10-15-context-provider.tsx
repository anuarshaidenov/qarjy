"use client";

import { SeventyFive1015Budget } from "@/types/seventyfive-10-15-budget";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const initialBudget: SeventyFive1015Budget = {
  id: crypto.randomUUID(),
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
}>({
  budget: initialBudget,
  setBudget: () => {},
});

export const BudgetContextProvider = ({ children }: Props) => {
  const [budget, setBudget] =
    React.useState<SeventyFive1015Budget>(initialBudget);

  return (
    <BudgetContext.Provider value={{ budget, setBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};
