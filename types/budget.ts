export type Expense = {
  id: string;
  name: string;
  amount: number;
};

export type Budget = {
  id: string;
  title: string;
  monthlyIncome: number;
  draftIncome: number;
  expenses: Expense[];
  essentialExpenses: Expense[];
  nonEssentialExpenses: Expense[];
  savings: number;
  cushionFund: number;
  expensesTotal: number;
  essentialExpensesTotal: number;
  nonEssentialExpensesTotal: number;
  type: string;
};
