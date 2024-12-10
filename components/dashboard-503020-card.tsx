import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Dashboard503020Title } from "./dashboard-504020-title";
import { DashboardMonthlyIncome } from "./dashboard-503020-monthly-income";
import { DashboardEssentialExpenses } from "./dashboard-essential-expenses";
import { Dashboard503020AddEssentialExpense } from "./dashboard-503020-add-essential-expense";
import { DashboardNonEssentialExpenses } from "./dashboard-non-essential-expenses";
import { Dashboard503020AddNonEssentialExpense } from "./dashboard-503020-add-non-essential-expense";
import { DashboardEssenialExpensesAmount } from "./dashboard-essential-expenses-amount";
import { DashboardNonEssenialExpensesAmount } from "./dashboard-non-essential-expenses-amount";
import { Dashboard20SavingsAmount } from "./dashboard-20-savings-amount";
import { DashboardEssentialsRemainder } from "./dashboard-essentials-remainder";
import { DashboardNonEssentialsRemainder } from "./dashboard-non-essentials-remainder";
import { useTranslations } from "next-intl";
import { useCurrency } from "./currency-provider";
import { SuggestedExpenses } from "./suggested-expenses";

type Props = {};

export const Dashboard503020Card = (props: Props) => {
  const t = useTranslations();
  const { currency } = useCurrency();

  return (
    <Card>
      <CardHeader>
        <Dashboard503020Title />
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex items-center w-full border-b pb-4">
          <Label className="md:text-lg font-semibold grow" id="monthly-income">
            {t("dashboard.app.monthly-income")}
          </Label>
          <div className="shrink max-w-[180px] flex items-center gap-2">
            <DashboardMonthlyIncome />
            <span>{currency.symbol}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-4 border-b">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">
                {t("dashboard.app.essential-expenses")}
              </Label>
              <DashboardEssenialExpensesAmount />
            </div>
            <DashboardEssentialExpenses />
            <Dashboard503020AddEssentialExpense />
            <SuggestedExpenses expenseType="essential" />
          </div>

          <div className="w-full flex items-center justify-between">
            <span className="md:text-lg font-semibold">
              {t("dashboard.app.remainder")}
            </span>
            <DashboardEssentialsRemainder />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b pb-4">
          <div className="flex flex-col gap-2 items-start justify-between">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">
                {t("dashboard.app.non-essential-expenses")}
              </Label>
              <DashboardNonEssenialExpensesAmount />
            </div>
            <DashboardNonEssentialExpenses />

            <Dashboard503020AddNonEssentialExpense />
            <SuggestedExpenses expenseType="non-essential" />
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="md:text-lg font-semibold">
              {t("dashboard.app.remainder")}
            </span>
            <DashboardNonEssentialsRemainder />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <Label className="md:text-lg font-semibold">
              {t("dashboard.app.20-savings")}
            </Label>
            <Dashboard20SavingsAmount />
          </div>
          <p className="text-sm">{t("dashboard.app.20-savings-description")}</p>
        </div>
      </CardContent>
    </Card>
  );
};
