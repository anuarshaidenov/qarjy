import { BudgetContext } from "@/components/seventyfive-10-15-context-provider";
import { LOCALSTORAGE_KEYS } from "@/lib/constants";
import { calculatePecentageBasedOnIncome } from "@/lib/utils";
import { SeventyFive1015Budget } from "@/types/seventyfive-10-15-budget";
import { useContext, useEffect } from "react";

const calculateExpensesDifference = (income: number, expenses: number[]) => {
  return income - expenses.reduce((total, expense) => total + expense, 0);
};

export const useSeventyFive1015 = () => {
  const { budget, setBudget } = useContext(BudgetContext);

  const setBudgetToLocalStorage = (budget: SeventyFive1015Budget) => {
    localStorage.setItem(
      LOCALSTORAGE_KEYS.seventyfive1015budget,
      JSON.stringify(budget)
    );
  };
  const getBudgetFromLocalStorage = () => {
    const storedBudget = localStorage.getItem(
      LOCALSTORAGE_KEYS.seventyfive1015budget
    );

    return storedBudget
      ? (JSON.parse(storedBudget) as SeventyFive1015Budget)
      : null;
  };

  useEffect(() => {
    const storedBudget = getBudgetFromLocalStorage();
    if (storedBudget) {
      setBudget(storedBudget);
    }
  }, []);

  const essentialsBudget = calculatePecentageBasedOnIncome(
    budget.monthlyIncome,
    75
  );

  const cushionFund = calculatePecentageBasedOnIncome(budget.monthlyIncome, 10);

  const savings = calculatePecentageBasedOnIncome(budget.monthlyIncome, 15);

  const expensesDifference = calculateExpensesDifference(
    essentialsBudget,
    budget.expenses.map((expense) => expense.amount || 0)
  );

  return {
    budget,
    setBudget,
    essentialsBudget,
    cushionFund,
    expensesDifference,
    savings,
    setBudgetToLocalStorage,
    getBudgetFromLocalStorage,
  };
};
