import { BudgetContext } from "@/components/budget-context-provider";
import { EssentialExpense } from "@/types/fifty-20-30-budget";
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

  const handleEditEssentialExpenseById = (id: string, amount?: number) => {
    const expense = budget.essentialExpenses.find(
      (expense) => expense.id === id
    );
    if (!expense) return;

    setBudget({
      ...budget,
      essentialExpenses: budget.essentialExpenses.map((expense) => {
        if (expense.id === id) {
          return {
            ...expense,
            amount: amount,
          };
        }
        return expense;
      }),
    });
  };

  const handleEditNonEssentialExpenseById = (id: string, amount?: number) => {
    const expense = budget.nonEssentialExpenses.find(
      (expense) => expense.id === id
    );
    if (!expense) return;

    setBudget({
      ...budget,
      nonEssentialExpenses: budget.nonEssentialExpenses.map((expense) => {
        if (expense.id === id) {
          return {
            ...expense,
            amount: amount,
          };
        }
        return expense;
      }),
    });
  };

  const handleDeleteEssentialExpenseById = (id: string) => {
    setBudget({
      ...budget,
      essentialExpenses: budget.essentialExpenses.filter(
        (expense) => expense.id !== id
      ),
    });
  };

  const handleDeleteNonEssentialExpenseById = (id: string) => {
    setBudget({
      ...budget,
      nonEssentialExpenses: budget.nonEssentialExpenses.filter(
        (expense) => expense.id !== id
      ),
    });
  };

  const handleAddEssentialExpense = (expense: EssentialExpense) => {
    setBudget({
      ...budget,
      essentialExpenses: [
        ...budget.essentialExpenses,
        {
          id: crypto.randomUUID(),
          name: expense.name,
          amount: expense.amount,
        },
      ],
    });
  };

  return {
    budget,
    setBudget,
    essentialsDifference,
    nonEssentialsDifference,
    essentialsBudget,
    nonEssentialsBudget,
    investmentsBudget,
    handleEditEssentialExpenseById,
    handleEditNonEssentialExpenseById,
    handleDeleteEssentialExpenseById,
    handleDeleteNonEssentialExpenseById,
    handleAddEssentialExpense,
  };
};
