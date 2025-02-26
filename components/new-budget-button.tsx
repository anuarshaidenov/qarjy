"use client";

import { useTranslations } from "next-intl";
import { Card } from "./ui/card";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createBudget } from "@/actions/create-budget";
import { useToast } from "@/hooks/use-toast";
import React from "react";

type Props = {};

export const NewBudgetButton = (props: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      const { data, error } = await createBudget();

      if (error || !data) {
        toast({
          title: "Error creating budget",
          description: error?.message,
          variant: "destructive",
        });
        return;
      }

      router.push(`/dashboard/budget/${data[0].id}`);
    });
  };

  return (
    <button disabled={isPending} onClick={handleClick}>
      <Card
        className={cn("flex items-center h-full justify-center min-h-36")}
        aria-label="New Budget"
      >
        {isPending ? (
          <Loader2 className="size-8 animate-spin" />
        ) : (
          <Plus className="size-8" />
        )}
      </Card>
    </button>
  );
};
