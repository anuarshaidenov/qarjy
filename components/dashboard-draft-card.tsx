"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { useCurrency } from "./currency-provider";
import { DashboardMonthlyIncome } from "./dashboard-503020-monthly-income";
import { DashboardDraftExpenses } from "./dashboard-draft-expenses";
import { DashboardDraftAddExpense } from "./dashboard-draft-add-expense";
import { DashboardDraftExpensesRemainder } from "./dashboard-draft-expenses-remainder";
import { DashboardDraftMonthlyIncome } from "./dashboard-draft-monthly-income";

type Props = {};

export const DashboardDraftCard = (props: Props) => {
  const t = useTranslations();
  const { currency } = useCurrency();

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start gap-2 justify-between">
          <CardTitle className="md:text-2xl font-semibold">
            {t("dashboard.draft-title")}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex items-center w-full border-b pb-4">
          <Label className="md:text-lg font-semibold grow" id="monthly-income">
            {t("dashboard.app.monthly-income")}
          </Label>
          <div className="shrink max-w-[180px] flex items-center gap-2">
            <DashboardDraftMonthlyIncome />
            <span>{currency.symbol}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">
                {t("dashboard.app.draft-expenses")}
              </Label>
            </div>
            <DashboardDraftExpenses />

            <DashboardDraftAddExpense />
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="md:text-lg font-semibold">
              {t("dashboard.app.remainder")}
            </span>
            <DashboardDraftExpensesRemainder />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
