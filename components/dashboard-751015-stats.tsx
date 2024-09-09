import { ExpensesPieChart } from './expenses-pie-chart';

type Props = {};

export const Dashboard751015Stats = (props: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <ExpensesPieChart expenseType="overall" />
    </div>
  );
};
