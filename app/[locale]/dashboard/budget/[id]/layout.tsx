import { getQueryClient } from "@/actions/get-query-client";
import { DraftIncomeContextProvider } from "@/components/draft-income-context-provider";
import { ExpensesSumProvider } from "@/components/expenses-sum-provider";
import { MonthlyIncomeProvider } from "@/components/monthly-income-context-provider";
import { QUERY_KEYS } from "@/lib/constants";
import { Budget } from "@/types/budget";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

const BudgetLayout = async (props: Props) => {
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
      <MonthlyIncomeProvider>
        <DraftIncomeContextProvider>
          <ExpensesSumProvider>
            <section className="h-full">
              <div className="py-8 px-4 container flex flex-col gap-4">
                {props.children}
              </div>
            </section>
            <div></div>
          </ExpensesSumProvider>
        </DraftIncomeContextProvider>
      </MonthlyIncomeProvider>
    </HydrationBoundary>
  );
};

export default BudgetLayout;
