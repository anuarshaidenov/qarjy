import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const MonthlyBudgetLoading = (props: Props) => {
  return (
    <section className="h-full">
      <div className="py-8 px-4 container flex flex-col gap-4">
        <Skeleton className="w-full md:w-[385px] h-[36px] md:h-[48px]" />

        <Skeleton className="w-full h-[36px] md:h-[24px] mb-8" />

        <Skeleton className="w-full h-[1000px]" />
      </div>
    </section>
  );
};

export default MonthlyBudgetLoading;
