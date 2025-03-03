import { getPaginatedBudgets } from "@/actions/get-paginated-budgets";
import React from "react";
import { BudgetCard } from "./budget-card";
import { Skeleton } from "./ui/skeleton";
import { LoadMoreBudgetsButton } from "./load-more-budgets-button";

type Props = {
  page: number;
};

export const Budgets = async (props: Props) => {
  const { data, error, count } = await getPaginatedBudgets({
    pageSize: props.page * 10,
  });
  const hasMoreBudgets = (count || 0) > (data?.length || 0);

  if (error) {
    <p className="text-red-400">{error.message}</p>;
  }

  return (
    <>
      {data?.map((budget) => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}
      {hasMoreBudgets && <LoadMoreBudgetsButton />}
    </>
  );
};
export const BudgetsSkeleton = () => (
  <>
    <Skeleton className="h-[134px]" />
    <Skeleton className="h-[134px]" />
    <Skeleton className="h-[134px]" />
    <Skeleton className="h-[134px]" />
    <Skeleton className="h-[134px]" />
    <Skeleton className="h-[134px]" />
    <Skeleton className="h-[134px]" />
    <Skeleton className="h-[134px]" />
    <Skeleton className="h-[134px]" />
  </>
);
