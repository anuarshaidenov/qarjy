import React from 'react';
import { ExpensesPieChart } from './expenses-pie-chart';

type Props = {};

export const Dashboard503020Stats = (props: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <ExpensesPieChart expenseType="essential" title="Essential expenses" />
      <ExpensesPieChart
        expenseType="non-essential"
        title="Non-essential expenses"
      />
    </div>
  );
};
