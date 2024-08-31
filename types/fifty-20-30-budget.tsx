export type Fifty2030Budget = {
  id: string;
  monthlyIncome?: number;
  essentialExpenses: EssentialExpense[];
  nonEssentialExpenses: NonEssentialExpense[];
  savings: number;
};

export type EssentialExpense = {
  id: string;
  name: string;
  amount?: number;
};

export type NonEssentialExpense = {
  id: string;
  name: string;
  amount?: number;
};
