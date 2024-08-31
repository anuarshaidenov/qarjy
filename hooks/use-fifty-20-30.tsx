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

  const essentialsDifference = calculateExpensesDifference(
    budget.monthlyIncome || 0,
    budget.essentialExpenses.map((expense) => expense.amount || 0)
  );

  const nonEssentialsDifference = calculateExpensesDifference(
    budget.monthlyIncome || 0,
    budget.nonEssentialExpenses.map((expense) => expense.amount || 0)
  );

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
