import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const MonthlyBudgetLoading = (props: Props) => {
  return (
    <section className="h-full">
      <div className="py-8 px-4 container flex flex-col gap-4">
        <Skeleton className="w-full md:w-[385px] h-[36px] md:h-[48px]" />

        <Skeleton className="w-full h-[36px] md:h-[24px] mb-8" />

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

export default MonthlyBudgetLoading;
