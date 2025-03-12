import { getBudgetById } from '@/actions/get-budget-by-id';
import { getQueryClient } from '@/actions/get-query-client';
import { Dashboard503020Card } from '@/components/dashboard-503020-card';
import { Dashboard503020Stats } from '@/components/dashboard-503020-stats';
import { Dashboard751015Card } from '@/components/dashboard-751015-card';
import { Dashboard751015Stats } from '@/components/dashboard-751015-stats';
import { DraftIncomeContextProvider } from '@/components/draft-income-context-provider';
import { ExpensesSumProvider } from '@/components/expenses-sum-provider';
import { MonthlyIncomeProvider } from '@/components/monthly-income-context-provider';
import { QUERY_KEYS } from '@/lib/constants';
import { Budget } from '@/types/budget';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import axios from 'axios';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props) {
  const data = await getBudgetById((await props.params).id);

  const metadata: Metadata = {
    title: data?.title || 'Qarjy',
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

  const budget = await getBudgetById(id);

  const budgetType = budget?.type;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MonthlyIncomeProvider>
        <DraftIncomeContextProvider>
          <ExpensesSumProvider>
            <section className="h-full">
              <div className="py-8 px-4 container flex flex-col gap-4">
                {budgetType === '50-30-20' && (
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <Dashboard503020Card />
                    <Dashboard503020Stats />
                  </div>
                )}

                {budgetType === '75-10-15' && (
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <Dashboard751015Card />
                    <Dashboard751015Stats />
                  </div>
                )}
              </div>
            </section>
          </ExpensesSumProvider>
        </DraftIncomeContextProvider>
      </MonthlyIncomeProvider>
    </HydrationBoundary>
  );
}

export default MonthlyBudgetPage;
