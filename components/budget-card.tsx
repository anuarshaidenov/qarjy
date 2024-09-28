import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "@/navigation";
import { Budget } from "@/types/budget";
import { formatNumberWithCommas } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useCurrency } from "./currency-provider";

type Props = {
  budget: Budget;
};

export const BudgetCard = ({ budget }: Props) => {
  const t = useTranslations();
  const { currency } = useCurrency();

  return (
    <Link href={"/dashboard/monthly-budget/" + budget.id}>
      <Card className="hover:border-foreground/50 transition-colors">
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
          {/* {current ? (
            <CardDescription className="text-green-700">
              Current
            </CardDescription>
          ) : (
            <CardDescription className="text-green-700 hidden md:block opacity-0">
              Not current
            </CardDescription>
          )} */}
        </CardFooter>
      </Card>
    </Link>
  );
};
