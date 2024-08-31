import { BudgetContext } from "@/components/budget-context-provider";
import { useContext } from "react";

const calculateExpensesDifference = (income: number, expenses: number[]) => {
  return income - expenses.reduce((total, expense) => total + expense, 0);
};

const calculatePecentageBasedOnIncome = (
  income: number,
  percentage: number
) => {
  return (income * percentage) / 100;
};

export const useFifty2030 = () => {
  const { budget, setBudget } = useContext(BudgetContext);

  const essentialsBudget = calculatePecentageBasedOnIncome(
    budget.monthlyIncome || 0,
    50
  );

  const nonEssentialsBudget = calculatePecentageBasedOnIncome(
    budget.monthlyIncome || 0,
    30
  );

  const investmentsBudget = calculatePecentageBasedOnIncome(
    budget.monthlyIncome || 0,
    20
  );

  const essentialsDifference = calculateExpensesDifference(
    essentialsBudget,
    budget.essentialExpenses.map((expense) => expense.amount || 0)
  );

  const nonEssentialsDifference = calculateExpensesDifference(
    nonEssentialsBudget,
    budget.nonEssentialExpenses.map((expense) => expense.amount || 0)
  );

  return {
    budget,
    setBudget,
    essentialsDifference,
    nonEssentialsDifference,
    essentialsBudget,
    nonEssentialsBudget,
    investmentsBudget,
  };
};
