import { getPaginatedBudgets } from "@/actions/get-paginated-budgets";
import { BudgetCard } from "@/components/budget-card";
import { LoadMoreBudgetsButton } from "@/components/load-more-budgets-button";
import { NewBudgetButton } from "@/components/new-budget-button";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function DashboardPage({ searchParams }: Props) {
  const t = await getTranslations();
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const page = (await searchParams)?.["page"] || "1";

  const { data, error, count } = await getPaginatedBudgets({
    pageSize: +page * 10,
  });

  const hasMoreBudgets = (count || 0) > (data?.length || 0);

  if (error) {
    <section className="py-8 px-4 container flex flex-col gap-4">
      <p className="text-red-400">{error.message}</p>
    </section>;
  }

  return (
    <section className="py-8 px-4 container flex flex-col gap-4">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        {t("hello")}{" "}
        {userData.user?.user_metadata?.full_name?.split(" ")[0] ||
          userData.user?.email}
      </h1>

      <p className="text-xs md:text-sm font-light text-muted-foreground mb-8">
        {t("dashboard.description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:grid-cols-4">
        <NewBudgetButton />

        {data?.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}

        {hasMoreBudgets && <LoadMoreBudgetsButton />}
      </div>
    </section>
  );
}

export default DashboardPage;
