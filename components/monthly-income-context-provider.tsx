"use client";

import React, { createContext, useContext, useState } from "react";

type MonthlyIncomeContextType = {
  monthlyIncome: number | null;
  setMonthlyIncome: React.Dispatch<React.SetStateAction<number | null>>;
};

const MonthlyIncomeContext = createContext<
  MonthlyIncomeContextType | undefined
>(undefined);

export const useMonthlyIncome = () => {
  const context = useContext(MonthlyIncomeContext);
  if (!context) {
    throw new Error(
      "useMonthlyIncome must be used within a MonthlyIncomeProvider"
    );
  }
  return context;
};

export const MonthlyIncomeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [monthlyIncome, setMonthlyIncome] = useState<number | null>(null);

  return (
    <MonthlyIncomeContext.Provider value={{ monthlyIncome, setMonthlyIncome }}>
      {children}
    </MonthlyIncomeContext.Provider>
  );
};
