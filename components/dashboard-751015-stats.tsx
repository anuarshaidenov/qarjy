import { ExpensesPieChart } from "./expenses-pie-chart";
import { SavingsEstimate15 } from "./savings-estimate-15";

type Props = {};

export const Dashboard751015Stats = (props: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <ExpensesPieChart expenseType="overall" />
      <SavingsEstimate15 />
    </div>
  );
};
