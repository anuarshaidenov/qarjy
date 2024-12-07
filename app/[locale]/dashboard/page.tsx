"use client";

import { BudgetCard } from "@/components/budget-card";
import { NewBudgetButton } from "@/components/new-budget-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBudgets } from "@/hooks/use-get-budgets";
import { useTranslations } from "next-intl";

type Props = {};

function DashboardPage({}: Props) {
  const t = useTranslations();
  const { data, isLoading } = useGetBudgets();

  return (
    <section className="py-8 px-4 container flex flex-col gap-12">
      <h1 className="text-3xl md:text-5xl font-bold">
        {t("dashboard.dashboard-title")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:grid-cols-4">
        <NewBudgetButton />
        {isLoading ? (
          <>
            <Skeleton className="h-[134px]" />
            <Skeleton className="h-[134px]" />
            <Skeleton className="h-[134px]" />
            <Skeleton className="h-[134px]" />
            <Skeleton className="h-[134px]" />
            <Skeleton className="h-[134px]" />
          </>
        ) : (
          data?.data?.map((budget, i) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))
        )}
      </div>
    </section>
  );
}

export default DashboardPage;
