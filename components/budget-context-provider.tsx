"use client";

import { Fifty2030Budget } from "@/types/fifty-20-30-budget";
import { createContext, useState } from "react";

export const BudgetContext = createContext<{
  budget: Fifty2030Budget;
  setBudget: React.Dispatch<React.SetStateAction<Fifty2030Budget>>;
}>({
  budget: {
    id: "",
    monthlyIncome: 0,
    essentialExpenses: [],
    nonEssentialExpenses: [],
    savings: 0,
  },
  setBudget: () => {},
});

export const BudgetContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [budget, setBudget] = useState<Fifty2030Budget>({
    id: "",
    monthlyIncome: 0,
    essentialExpenses: [],
    nonEssentialExpenses: [],
    savings: 0,
  });
  return (
    <BudgetContext.Provider value={{ budget, setBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};
