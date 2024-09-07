import { useGetBudgetById } from "@/hooks/use-get-budget-by-id";
import { useParams } from "next/navigation";
import { DashboardEssentialExpense } from "./dashboard-essential-expense";
import { Skeleton } from "./ui/skeleton";

type Props = {};

export const DashboardEssentialExpenses = (props: Props) => {
  const params = useParams();
  const { data, isLoading } = useGetBudgetById({ id: params?.id as string });

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
      {data?.essentialExpenses.map((expense) => (
        <DashboardEssentialExpense expense={expense} budget={data} />
      ))}
    </ul>
  );
};
