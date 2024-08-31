import { LOCALSTORAGE_KEYS } from "@/lib/constants";
import { Fifty2030Budget } from "@/types/fifty-20-30-budget";
import { useState } from "react";

export const useFifty2030 = () => {
  const get503020budgetFromLocalStorage = () => {
    const budgetFromLocalStorage = localStorage.getItem(
      LOCALSTORAGE_KEYS.fifty3020budget
    );
    if (budgetFromLocalStorage) {
      return JSON.parse(budgetFromLocalStorage) as Fifty2030Budget;
    }
  };

  const [budget, setBudget] = useState<Fifty2030Budget>(
    get503020budgetFromLocalStorage() || {
      id: "",
      monthlyIncome: 0,
      essentialExpenses: [],
      nonEssentialExpenses: [],
      savings: 0,
    }
  );

  const save503020budgetToLocalStorage = (budget: Fifty2030Budget) => {
    localStorage.setItem(
      LOCALSTORAGE_KEYS.fifty3020budget,
      JSON.stringify(budget)
    );
  };

  return { budget, setBudget, save503020budgetToLocalStorage };
};
