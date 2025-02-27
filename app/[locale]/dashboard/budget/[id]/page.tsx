import { getBudgetById } from "@/actions/get-budget-by-id";
import { getQueryClient } from "@/actions/get-query-client";
import { DashboardApp } from "@/components/dashboard-app";
import { QUERY_KEYS } from "@/lib/constants";
import { Budget } from "@/types/budget";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import axios from "axios";
import { Metadata } from "next";

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
  const { id } = params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.BUDGET, id],
    queryFn: () =>
      axios.get<Budget>(`/api/budgets/${id}`).then((res) => res.data),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="h-full">
        <div className="py-8 px-4 container flex flex-col gap-4">
          <DashboardApp />
        </div>
      </section>
    </HydrationBoundary>
  );
}

export default MonthlyBudgetPage;
