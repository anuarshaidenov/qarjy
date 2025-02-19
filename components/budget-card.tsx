import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link } from "@/navigation";
import { Budget } from "@/types/budget";
import { cn, formatNumberWithCommas } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useCurrency } from "./currency-provider";
import { BudgetCardOptions } from "./budget-card-options";

type Props = {
  budget: Budget;
};

export const BudgetCard = ({ budget }: Props) => {
  const t = useTranslations();
  const { currency } = useCurrency();

  return (
    <Link href={"/dashboard/budget/" + budget.id}>
      <Card
        className={cn(
          "hover:border-foreground/50 transition-colors min-h-36 relative"
        )}
      >
        <CardHeader>
          <CardTitle className="w-[80%] truncate">{budget.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="space-y-1">
            <p>
              {t("budget-card.income")}:{" "}
              <span className="font-bold">
                {formatNumberWithCommas(budget.monthlyIncome)} {currency.symbol}
              </span>
            </p>
          </div>
        </CardContent>
        <BudgetCardOptions
          budgetId={budget.id}
          triggerClassname="absolute top-2 right-2"
        />
      </Card>
    </Link>
  );
};
