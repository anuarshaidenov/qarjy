import { BudgetContext } from "@/components/fifty-30-20-budget-context-provider";
import { LOCALSTORAGE_KEYS } from "@/lib/constants";
import { calculatePecentageBasedOnIncome } from "@/lib/utils";
import { EssentialExpense } from "@/types/fifty-20-30-budget";
import { useContext, useEffect } from "react";

const calculateExpensesDifference = (income: number, expenses: number[]) => {
  return income - expenses.reduce((total, expense) => total + expense, 0);
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

    const newBudget = {
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
    };
    setBudget(newBudget);
    localStorage.setItem(
      LOCALSTORAGE_KEYS.fifty3020budget,
      JSON.stringify(newBudget)
    );
  };

  const handleEditNonEssentialExpenseById = (id: string, amount?: number) => {
    const expense = budget.nonEssentialExpenses.find(
      (expense) => expense.id === id
    );
    if (!expense) return;

    const newBudget = {
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
    };
    setBudget(newBudget);
    localStorage.setItem(
      LOCALSTORAGE_KEYS.fifty3020budget,
      JSON.stringify(newBudget)
    );
  };

  const handleDeleteEssentialExpenseById = (id: string) => {
    const newBudget = {
      ...budget,
      essentialExpenses: budget.essentialExpenses.filter(
        (expense) => expense.id !== id
      ),
    };
    setBudget(newBudget);
    localStorage.setItem(
      LOCALSTORAGE_KEYS.fifty3020budget,
      JSON.stringify(newBudget)
    );
  };

  const handleDeleteNonEssentialExpenseById = (id: string) => {
    const newBudget = {
      ...budget,
      nonEssentialExpenses: budget.nonEssentialExpenses.filter(
        (expense) => expense.id !== id
      ),
    };
    setBudget(newBudget);
    localStorage.setItem(
      LOCALSTORAGE_KEYS.fifty3020budget,
      JSON.stringify(newBudget)
    );
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

  useEffect(() => {
    const storedBudget = localStorage.getItem(
      LOCALSTORAGE_KEYS.fifty3020budget
    );
    if (storedBudget) {
      setBudget(JSON.parse(storedBudget));
    }
  }, []);

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
