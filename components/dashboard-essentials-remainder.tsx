import {
  calculateEssentialExpensesBasedOnIncome,
  calculateExpensesRemainder,
  cn,
  formatNumberWithCommas,
} from "@/lib/utils";
import { useMonthlyIncome } from "./monthly-income-context-provider";
import { useExpensesSum } from "./expenses-sum-provider";
import { useMemo } from "react";
import { useCurrency } from "./currency-provider";

type Props = {};

export const DashboardEssentialsRemainder = (props: Props) => {
  const { monthlyIncome } = useMonthlyIncome();
  const { essentialExpensesSum } = useExpensesSum();
  const essentialExpensesAmount = useMemo(() => {
    return calculateEssentialExpensesBasedOnIncome(monthlyIncome as number);
  }, [monthlyIncome]);

  const remainder = useMemo(() => {
    return calculateExpensesRemainder(
      essentialExpensesSum as number,
      essentialExpensesAmount as number
    );
  }, [essentialExpensesSum, essentialExpensesAmount]);
  const { currency } = useCurrency();

  return (
    <span
      className={cn("text-end font-semibold shrink-0", {
        "text-muted": remainder === 0,
        "text-destructive": remainder < 0,
        "text-green-700": remainder > 0,
      })}
    >
      {formatNumberWithCommas(remainder)} {currency.symbol}
    </span>
  );
};
