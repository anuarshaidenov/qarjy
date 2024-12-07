"use client";

import { useTranslations } from "next-intl";
import { Card } from "./ui/card";
import { Plus } from "lucide-react";
import { useCreateBudget } from "@/hooks/use-create-budget";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {};

export const NewBudgetButton = (props: Props) => {
  const t = useTranslations();
  const { mutateAsync, isPending } = useCreateBudget();
  const router = useRouter();

  const handleClick = async () => {
    const { data } = await mutateAsync();

    router.push(`dashboard/monthly-budget/${data.data.id}`);
  };

  return (
    <button onClick={handleClick}>
      <Card
        className={cn(
          "flex items-center h-full justify-center min-h-36",
          isPending && "animate-pulse"
        )}
        aria-label="New Budget"
      >
        <Plus className="size-8" />
      </Card>
    </button>
  );
};
