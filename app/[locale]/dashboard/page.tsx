"use client";

import { BudgetCard } from "@/components/budget-card";
import { NextBudgetCountdownCard } from "@/components/next-budget-countdown-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBudgets } from "@/hooks/use-get-budgets";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {};

function DashboardPage({}: Props) {
  const t = useTranslations();
  const { data, isLoading } = useGetBudgets();

  return (
    <section className="py-8 px-4 container flex flex-col gap-4">
      <h1 className="text-3xl md:text-5xl font-bold">
        {t("dashboard.all-budgets.title")}
      </h1>
      <p className="text-muted-foreground font-mono mb-8">
        {t("dashboard.all-budgets.description")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:grid-cols-4">
        <NextBudgetCountdownCard />
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
          data?.map((budget, i) => (
            <BudgetCard key={budget.id} budget={budget} isCurrent={i === 0} />
          ))
        )}
      </div>
    </section>
  );
}

export default DashboardPage;
