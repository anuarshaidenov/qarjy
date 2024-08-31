"use client";

import { Fifty2030Budget } from "@/types/fifty-20-30-budget";
import { createContext, useState } from "react";

const initialBudget: Fifty2030Budget = {
  id: crypto.randomUUID(),
  title: "September Budget",
  monthlyIncome: 1000000,
  essentialExpenses: [
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
  nonEssentialExpenses: [
    {
      id: crypto.randomUUID(),
      name: "Outings",
      amount: 40000,
    },
  ],
  savings: 0,
};

export const BudgetContext = createContext<{
  budget: Fifty2030Budget;
  setBudget: React.Dispatch<React.SetStateAction<Fifty2030Budget>>;
}>({
  budget: initialBudget,
  setBudget: () => {},
});

export const BudgetContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [budget, setBudget] = useState<Fifty2030Budget>(initialBudget);
  return (
    <BudgetContext.Provider value={{ budget, setBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};
