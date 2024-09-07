import { getBudgetById } from "@/actions/get-budget-by-id";
import { DashboardApp } from "@/components/dashboard-app";
import { getTranslations } from "next-intl/server";

type Props = {
  params: { id: string };
};

async function MonthlyBudgetPage({ params: { id } }: Props) {
  const t = await getTranslations();
  const budget = await getBudgetById(id);
  console.log({ budget });

  return (
    <section className="h-full">
      <div className="py-8 px-4 container flex flex-col gap-8">
        <h1 className="text-3xl md:text-5xl font-bold">
          {t("dashboard.monthly-budget.title")}
        </h1>

        <DashboardApp />
      </div>
    </section>
  );
}

export default MonthlyBudgetPage;
