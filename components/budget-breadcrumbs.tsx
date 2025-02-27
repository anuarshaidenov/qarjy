"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetBudgetById } from "@/hooks/use-get-budget-by-id";
import { useParams } from "next/navigation";
import { Logo } from "./logo";

type Props = {
  currentPageTitle: string;
};

export const BudgetBreadcrumbs = (props: Props) => {
  const params = useParams();
  const budgetId = params.id as string;

  const { data, isLoading } = useGetBudgetById({ id: budgetId });

  if (!data) {
    return <Logo href="/dashboard" className="shrink-0" />;
  }

  return (
    <>
      <Logo href="/dashboard" className="shrink-0 block sm:hidden" />
      <Breadcrumb className="py-8 px-4 container hidden sm:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
