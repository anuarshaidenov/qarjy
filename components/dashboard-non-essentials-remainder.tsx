import {
  calculateEssentialsRemainder,
  calculateNonEssentialExpensesBasedOnIncome,
  cn,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";
import { useExpensesSum } from "./expenses-sum-provider";

type Props = {};

export const DashboardNonEssentialsRemainder = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  const { nonEssentialExpensesSum } = useExpensesSum();
  const nonEssentialExpensesAmount = calculateNonEssentialExpensesBasedOnIncome(
    monthlyIncome as number
  );

  const remainder = calculateEssentialsRemainder(
    nonEssentialExpensesSum as number,
    nonEssentialExpensesAmount as number
  );

  return (
    <span
      className={cn("text-end font-semibold shrink-0", {
        "text-muted": remainder === 0,
        "text-destructive": remainder < 0,
        "text-green-700": remainder > 0,
      })}
    >
      {formatNumberWithCommas(remainder)} ₸
    </span>
  );
};
