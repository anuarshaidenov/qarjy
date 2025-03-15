import { getBudgetById } from "@/actions/get-budget-by-id";
import { Dashboard503020Card } from "@/components/dashboard-503020-card";
import { Dashboard503020Stats } from "@/components/dashboard-503020-stats";
import { Dashboard751015Card } from "@/components/dashboard-751015-card";
import { Dashboard751015Stats } from "@/components/dashboard-751015-stats";
import { BUDGET_TYPES } from "@/lib/constants";
import { Metadata } from "next";

export async function generateMetadata(props: Props) {
  const data = await getBudgetById((await props.params).id);

  const metadata: Metadata = {
    title: data?.title || "Qarjy",
  };

  return metadata;
}

type Props = {
  params: Promise<{ id: string }>;
};

async function MonthlyBudgetPage(props: Props) {
  const params = await props.params;
  const { id } = params;
  const budget = await getBudgetById(id);
  const budgetType = budget?.type;

  return (
    <>
      {budgetType === BUDGET_TYPES["50-30-20"] && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Dashboard503020Card />
          <Dashboard503020Stats />
        </div>
      )}

      {budgetType === BUDGET_TYPES["75-10-15"] && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Dashboard751015Card />
          <Dashboard751015Stats />
        </div>
      )}
    </>
  );
}

export default MonthlyBudgetPage;
