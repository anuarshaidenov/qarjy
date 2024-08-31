export type SeventyFive1015Budget = {
  id: string;
  monthlyIncome: number;
  expenses: Expense[];
  cushionFund: number;
  savings: number;
};

export type Expense = {
  id: string;
  name: string;
  amount: number;
};
