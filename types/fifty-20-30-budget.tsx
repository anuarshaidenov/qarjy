export type Fifty2030Budget = {
  id: string;
  monthlyIncome: number;
  expenses: {
    name: string;
    amount: number;
  }[];
};
