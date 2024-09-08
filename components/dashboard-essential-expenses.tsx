import { useGetBudgetById } from "@/hooks/use-get-budget-by-id";
import { useParams } from "next/navigation";
import { DashboardEssentialExpense } from "./dashboard-essential-expense";
import { Skeleton } from "./ui/skeleton";
import { useGetExpensesByTypeAndBudgetId } from "@/hooks/use-get-expenses";
import { useExpensesSum } from "./expenses-sum-provider";
import { useEffect } from "react";

type Props = {};

export const DashboardEssentialExpenses = (props: Props) => {
  const params = useParams();
  const { data, isLoading } = useGetExpensesByTypeAndBudgetId(
    params.id as string,
    "essential"
  );
  const { setEssentialExpensesSum } = useExpensesSum();
  useEffect(() => {
    setEssentialExpensesSum(
      data?.reduce((sum, expense) => sum + expense.amount, 0) || 0
    );
  }, [data]);

  if (isLoading) {
    return (
      <ul className="text-sm w-full space-y-1">
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
      </ul>
    );
  }

  return (
    <ul className="text-sm w-full">
      {data?.map((expense) => (
        <DashboardEssentialExpense
          key={expense.id}
          expense={expense}
          budgetId={params.id as string}
        />
      ))}
    </ul>
  );
};
