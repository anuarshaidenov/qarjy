import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

function DashboardLoading({}: Props) {
  return (
    <section className="h-full">
      <div className="py-8 px-4 container flex flex-col gap-4">
        <Skeleton className="w-full md:w-[385px] h-[36px] md:h-[48px]" />

        <Skeleton className="w-full h-[36px] md:h-[24px]" />

        <Skeleton className="w-full h-[1000px]" />
      </div>
    </section>
  );
}

export default DashboardLoading;
