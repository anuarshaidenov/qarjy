import { BudgetCard } from "@/components/budget-card";
import { getTranslations } from "next-intl/server";
import React from "react";

type Props = {};

async function DashboardPage({}: Props) {
  const t = await getTranslations();
  return (
    <section className="py-8 px-4 container flex flex-col gap-4">
      <h1 className="text-3xl md:text-5xl font-bold">
        {t("dashboard.all-budgets.title")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:grid-cols-4">
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
      </div>
    </section>
  );
}

export default DashboardPage;
