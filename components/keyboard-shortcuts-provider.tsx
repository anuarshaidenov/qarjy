"use client";

import { useGetLatestBudgetId } from "@/hooks/use-get-latest-budget-id";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useKey } from "react-use";

type Props = {
  children: ReactNode;
};

export const KeyboardShortcutsProvider = (props: Props) => {
  const router = useRouter();
  const { data: budgetId } = useGetLatestBudgetId();

  const navigateToDashboardHome = () => router.push("/dashboard");

  const navigateToCurrentMonthBudget = () => {
    if (!budgetId) return;

    router.push("/dashboard/budget/" + budgetId);
  };

  useKey("c", navigateToCurrentMonthBudget, undefined, [budgetId]);
  useKey("d", navigateToDashboardHome);

  return <>{props.children}</>;
};
