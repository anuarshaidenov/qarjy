"use client";

import { createContext, useContext, useState } from "react";

type ExpensesSumContextType = {
  essentialExpensesSum: number | null;
  setEssentialExpensesSum: React.Dispatch<React.SetStateAction<number | null>>;
  nonEssentialExpensesSum: number | null;
  setNonEssentialExpensesSum: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  overallExpensesSum: number | null;
  setOverallExpensesSum: React.Dispatch<React.SetStateAction<number | null>>;
};

export const ExpensesSumContext = createContext<ExpensesSumContextType>({
  essentialExpensesSum: null,
  setEssentialExpensesSum: () => {},
  nonEssentialExpensesSum: null,
  setNonEssentialExpensesSum: () => {},
  overallExpensesSum: null,
  setOverallExpensesSum: () => {},
});

export const useExpensesSum = () => {
  const context = useContext(ExpensesSumContext);

  if (!context) {
    throw new Error(
      "useExpensesSum must be used within an ExpensesSumProvider"
    );
  }

  return context;
};

export const ExpensesSumProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [essentialExpensesSum, setEssentialExpensesSum] = useState<
    number | null
  >(null);
  const [nonEssentialExpensesSum, setNonEssentialExpensesSum] = useState<
    number | null
  >(null);
  const [overallExpensesSum, setOverallExpensesSum] = useState<number | null>(
    null
  );

  return (
    <ExpensesSumContext.Provider
      value={{
        essentialExpensesSum,
        setEssentialExpensesSum,
        nonEssentialExpensesSum,
        setNonEssentialExpensesSum,
        overallExpensesSum,
        setOverallExpensesSum,
      }}
    >
      {children}
    </ExpensesSumContext.Provider>
  );
};
