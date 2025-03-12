import { Budgets, BudgetsSkeleton } from '@/components/budgets';
import { CreateBudgetButton } from '@/components/create-budget-button';
import {
  DashboardAuthInfo,
  DashboardAuthInfoSkeleton,
} from '@/components/dashboard-auth-info';
import { NewBudgetButton } from '@/components/new-budget-button';
import { Suspense } from 'react';

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function DashboardPage({ searchParams }: Props) {
  const page = (await searchParams)?.['page'] || '1';
  const query = ((await searchParams)?.['query'] || '') as string;

  return (
    <section className="py-8 px-4 container flex flex-col gap-4">
      <Suspense fallback={<DashboardAuthInfoSkeleton />}>
        <DashboardAuthInfo />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:grid-cols-4">
        {/* <NewBudgetButton /> */}
        <CreateBudgetButton />

        <Suspense fallback={<BudgetsSkeleton />}>
          <Budgets query={query} page={+page} />
        </Suspense>
      </div>
    </section>
  );
}

export default DashboardPage;
