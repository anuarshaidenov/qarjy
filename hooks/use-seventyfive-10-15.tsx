import { BudgetContext } from "@/components/seventyfive-10-15-context-provider";
import { calculatePecentageBasedOnIncome } from "@/lib/utils";
import { useContext } from "react";

const calculateExpensesDifference = (income: number, expenses: number[]) => {
  return income - expenses.reduce((total, expense) => total + expense, 0);
};

export const useSeventyFive1015 = () => {
  const { budget, setBudget } = useContext(BudgetContext);

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
  };
};
