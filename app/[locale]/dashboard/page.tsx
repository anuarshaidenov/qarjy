"use client";

import { BudgetCard } from "@/components/budget-card";
import { LoadMoreBudgetsButton } from "@/components/load-more-budgets-button";
import { NewBudgetButton } from "@/components/new-budget-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useGetBudgetsInifinite } from "@/hooks/use-get-budgets";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

type Props = {};

function DashboardPage({}: Props) {
  const t = useTranslations();
  const { data: auth } = useAuth();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetBudgetsInifinite({ pageSize: 10 });

  return (
    <section className="py-8 px-4 container flex flex-col gap-4">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        {t("hello")}{" "}
        {auth?.data.user?.user_metadata?.full_name?.split(" ")[0] ||
          auth?.data?.user?.email}
      </h1>

      <p className="text-xs md:text-sm font-light text-muted-foreground mb-8">
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
          data?.pages.map((page, i) => (
            <Fragment key={i}>
              {page.data.map((budget, i) => (
                <BudgetCard key={budget.id} budget={budget} />
              ))}
            </Fragment>
          ))
        )}
        {hasNextPage && (
          <LoadMoreBudgetsButton
            isLoading={isFetchingNextPage}
            onClick={fetchNextPage}
          />
        )}
      </div>
    </section>
  );
}

export default DashboardPage;
