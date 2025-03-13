"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateBudgetDialog } from "./create-budget-dialog-provider";
import { useToast } from "@/hooks/use-toast";
import { createBudget } from "@/actions/create-budget";
import { useRouter } from "next/navigation";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { BUDGET_TYPES } from "@/lib/constants";
import { Loader, Loader2 } from "lucide-react";

type Props = {};

export const CreateBudgetDialog = (props: Props) => {
  const { open, setOpen } = useCreateBudgetDialog();
  const t = useTranslations();

  const description503020 = t("50-30-20-description");
  const description751015 = t("75-10-15-description");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>{t("create-budget")}</DialogTitle>
          <DialogDescription>
            {t("create-budget-description")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid sm:grid-cols-2 gap-4">
          <CreateBudgetButton
            type="50-30-20"
            heading="50-30-20"
            description={description503020}
            highlight
          />
          <CreateBudgetButton
            type="75-10-15"
            heading="75-10-15"
            description={description751015}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CreateBudgetButton = ({
  heading,
  description,
  type,
  highlight,
}: {
  heading?: string;
  description?: string;
  type: string;
  highlight?: boolean;
}) => {
  const { setOpen } = useCreateBudgetDialog();
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations();

  const handleClick = async (type: string) => {
    startTransition(async () => {
      const { data, error } = await createBudget({ type });

      if (error || !data) {
        toast({
          title: "Error creating budget",
          description: error?.message,
          variant: "destructive",
        });
        return;
      }

      router.push(`/dashboard/budget/${data[0].id}`);

      setOpen(false);
    });
  };

  return (
    <button
      disabled={isPending}
      className={cn(isPending && "animate-pulse")}
      onClick={() => handleClick(type)}
    >
      <Card
        className={cn(
          "flex flex-col p-4 gap-2 items-center h-full justify-center min-h-36 hover:opacity-85",
          highlight && "border border-green-600 relative"
        )}
        aria-label="New Budget"
      >
        {highlight && (
          <span className="absolute -top-5 whitespace-nowrap right-1/2 translate-x-1/2 text-xs text-green-600">
            {t("most-popular")}
          </span>
        )}
        {!isPending && (
          <>
            <span className="font-bold md:text-2xl">{heading}</span>
            <p className="text-muted-foreground text-xs">{description}</p>
          </>
        )}
        {isPending && <Loader2 className="animate-spin" />}
      </Card>
    </button>
  );
};
