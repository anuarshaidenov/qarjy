import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

function DashboardLoading(props: Props) {
  return (
    <section className="h-full">
      <div className="py-8 px-4 container flex flex-col gap-4">
        <Skeleton className="w-full md:w-[385px] h-[36px] md:h-[48px]" />

        <Skeleton className="w-full h-[36px] md:h-[24px] mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:grid-cols-4">
          <Skeleton className="h-[134px]" />
          <Skeleton className="h-[134px]" />
          <Skeleton className="h-[134px]" />
          <Skeleton className="h-[134px]" />
          <Skeleton className="h-[134px]" />
          <Skeleton className="h-[134px]" />
        </div>
      </div>
    </section>
  );
}

export default DashboardLoading;
