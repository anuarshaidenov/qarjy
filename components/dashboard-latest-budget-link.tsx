"use client";

import { Calendar } from "lucide-react";
import { DashboardActiveLink } from "./dashboard-active-link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useGetLatestBudgetId } from "@/hooks/use-get-latest-budget-id";
import { Skeleton } from "./ui/skeleton";

type Props = {};

export const DashboardLatestBudgetLink = (props: Props) => {
  const { data: budgetId, isLoading } = useGetLatestBudgetId();
  const link = {
    name: "Current Budget",
    href: "/dashboard/monthly-budget/" + budgetId,
    icon: <Calendar className="size-6 md:size-5" />,
  };

  if (isLoading) return <Skeleton className="h-9 w-9" />;

  return (
    <Tooltip key={link.href}>
      <TooltipTrigger>
        <DashboardActiveLink route={link} className="h-12 w-12 md:w-9 md:h-9" />
      </TooltipTrigger>
      <TooltipContent side="right">{link.name}</TooltipContent>
    </Tooltip>
  );
};
