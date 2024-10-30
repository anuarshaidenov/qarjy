"use client";

import React, { createContext, useContext, useState } from "react";

type DraftIncomeContextType = {
  monthlyIncome: number | null;
  setMonthlyIncome: React.Dispatch<React.SetStateAction<number | null>>;
};

const DraftIncomeContext = createContext<DraftIncomeContextType | undefined>(
  undefined
);

export const useDraftIncome = () => {
  const context = useContext(DraftIncomeContext);
  if (!context) {
    throw new Error(
      "useDraftIncome must be used within a DraftIncomeContextProvider"
    );
  }
  return context;
};

export const DraftIncomeContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [monthlyIncome, setMonthlyIncome] = useState<number | null>(null);

  return (
    <DraftIncomeContext.Provider value={{ monthlyIncome, setMonthlyIncome }}>
      {children}
    </DraftIncomeContext.Provider>
  );
};
