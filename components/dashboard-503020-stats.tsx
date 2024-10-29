"use client";

import { ExpensesPieChart } from "./expenses-pie-chart";
import { useTranslations } from "next-intl";
import { SavingsEstimate20 } from "./savings-estimate-20";
import { DashboardNotes } from "./dashboard-notes";

type Props = {};

export const Dashboard503020Stats = (props: Props) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-8">
      <ExpensesPieChart
        expenseType="essential"
        title={t("dashboard.app.stats.essential-expenses-title")}
      />
      <ExpensesPieChart
        expenseType="non-essential"
        title={t("dashboard.app.stats.non-essential-expenses-title")}
      />
      <SavingsEstimate20 />
      <DashboardNotes />
    </div>
  );
};
