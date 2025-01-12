"use client";

import { BudgetCard } from "@/components/budget-card";
import { NewBudgetButton } from "@/components/new-budget-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useGetBudgets } from "@/hooks/use-get-budgets";
import { useTranslations } from "next-intl";

type Props = {};

function DashboardPage({}: Props) {
  const t = useTranslations();
  const { data, isLoading } = useGetBudgets();
  const { data: auth } = useAuth();

  return (
    <section className="py-8 px-4 container flex flex-col gap-4">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        {t("hello")}{" "}
        {auth?.data.user?.user_metadata?.full_name?.split(" ")[0] ||
          auth?.data?.user?.email}
      </h1>

      <p className="text-sm font-light text-foreground mb-8">
        {t("dashboard.description")}
      </p>

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
