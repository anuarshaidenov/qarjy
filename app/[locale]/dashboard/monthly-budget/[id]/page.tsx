import { getBudgetById } from "@/actions/get-budget-by-id";
import { DashboardApp } from "@/components/dashboard-app";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: { id: string };
};

export async function generateMetadata(props: Props) {
  const data = await getBudgetById(props.params.id);

  const metadata: Metadata = {
    title: data?.title,
  };

  return metadata;
}

async function MonthlyBudgetPage({ params: { id } }: Props) {
  const t = await getTranslations();

  return (
    <section className="h-full">
      <div className="py-8 px-4 container flex flex-col gap-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          {t("dashboard.monthly-budget.title")}
        </h1>
        <p className="text-muted-foreground font-mono mb-8">
          {t("dashboard.monthly-budget.subtitle")}
        </p>

        <DashboardApp />
      </div>
    </section>
  );
}

export default MonthlyBudgetPage;
