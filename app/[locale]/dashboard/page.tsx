import { getPaginatedBudgets } from "@/actions/get-paginated-budgets";
import { Budgets, BudgetsSkeleton } from "@/components/budgets";
import {
  DashboardAuthInfo,
  DashboardAuthInfoSkeleton,
} from "@/components/dashboard-auth-info";
import { LoadMoreBudgetsButton } from "@/components/load-more-budgets-button";
import { NewBudgetButton } from "@/components/new-budget-button";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function DashboardPage({ searchParams }: Props) {
  const t = await getTranslations();
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const page = (await searchParams)?.["page"] || "1";

  return (
    <section className="py-8 px-4 container flex flex-col gap-4">
      <Suspense fallback={<DashboardAuthInfoSkeleton />}>
        <DashboardAuthInfo />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:grid-cols-4">
        <NewBudgetButton />

        <Suspense key={+page} fallback={<BudgetsSkeleton />}>
          <Budgets page={+page} />
        </Suspense>
      </div>
    </section>
  );
}

export default DashboardPage;
