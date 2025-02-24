import { getBudgetById } from "@/actions/get-budget-by-id";
import { DashboardApp } from "@/components/dashboard-app";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props) {
  const data = await getBudgetById((await props.params).id);

  const metadata: Metadata = {
    title: data?.title || "Qarjy",
  };

  return metadata;
}

async function MonthlyBudgetPage(props: Props) {
  const params = await props.params;

  const {
    id
  } = params;

  const t = await getTranslations();

  return (
    <section className="h-full">
      <div className="py-8 px-4 container flex flex-col gap-4">
        <DashboardApp />
      </div>
    </section>
  );
}

export default MonthlyBudgetPage;
