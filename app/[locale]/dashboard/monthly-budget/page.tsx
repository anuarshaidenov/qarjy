import { AppSection } from "@/components/app-section";
import { DashboardApp } from "@/components/dashboard-app";
import { getTranslations } from "next-intl/server";

type Props = {};

async function MonthlyBudgetPage({}: Props) {
  const t = await getTranslations();

  return (
    <section className="h-full">
      <div className="py-8 px-4 container flex flex-col gap-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          {t("dashboard.monthly-budget.title")}
        </h1>

        <DashboardApp />
      </div>
    </section>
  );
}

export default MonthlyBudgetPage;
