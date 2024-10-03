import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "@/navigation";
import { Budget } from "@/types/budget";
import { cn, formatNumberWithCommas } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useCurrency } from "./currency-provider";

type Props = {
  budget: Budget;
  isCurrent?: boolean;
};

export const BudgetCard = ({ budget, isCurrent = false }: Props) => {
  const t = useTranslations();
  const { currency } = useCurrency();

  return (
    <Link href={"/dashboard/monthly-budget/" + budget.id}>
      <Card
        className={cn(
          "hover:border-foreground/50 transition-colors",
          isCurrent && "border-green-700"
        )}
      >
        <CardHeader>
          <CardTitle>{budget.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="space-y-1">
            <p>
              {t("budget-card.monthly-income")}:{" "}
              <span className="font-bold">
                {formatNumberWithCommas(budget.monthlyIncome)} {currency.symbol}
              </span>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          {isCurrent ? (
            <CardDescription className="text-green-700">
              {t("budget-card.current")}
            </CardDescription>
          ) : (
            <CardDescription className="opacity-0">not current</CardDescription>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};
