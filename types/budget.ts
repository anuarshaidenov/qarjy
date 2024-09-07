export type Expense = {
  id: string;
  name: string;
  amount: number;
};

export type Budget = {
  id: string;
  title: string;
  monthlyIncome: number;
  expenses: Expense[];
  essentialExpenses: Expense[];
  nonEssentialExpenses: Expense[];
  savings: number;
  cushionFund: number;
};
