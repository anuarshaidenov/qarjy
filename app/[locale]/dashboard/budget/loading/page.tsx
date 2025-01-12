import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const MonthlyBudgetLoadingPage = (props: Props) => {
  return (
    <section className="h-full">
      <div className="py-8 px-4 container flex flex-col gap-4">
        <Skeleton className="w-full h-[36px] mb-2" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-[700px]" />
          <div className="flex flex-col gap-8">
            <Skeleton className="h-[200px]" />
            <Skeleton className="h-[200px]" />
            <Skeleton className="h-[200px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlyBudgetLoadingPage;
