import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Dashboard751015CardTitle } from "./dashboard-751015-title";
import { DashboardMonthlyIncome } from "./dashboard-503020-monthly-income";
import { Dashboard751015AddExpense } from "./dashboard-751015-add-expense";
import { Dashboard751015Expenses } from "./dashboard-751015-expenes";
import { DashboardOverallExpensesAmount } from "./dashboard-overall-expenses-amount";
import { DashboardCushionFundAmount } from "./dashboard-cushion-fund-amount";
import { Dashboard15SavingsAmount } from "./dashboard-15-savings-amount";
import { DashboardOverallExpensesRemainder } from "./dashboard-overall-expenses-remainder";
import { useTranslations } from "next-intl";
import { useCurrency } from "./currency-provider";
import { SuggestedExpenses } from "./suggested-expenses";

type Props = {};

export const Dashboard751015Card = (props: Props) => {
  const t = useTranslations();
  const { currency } = useCurrency();

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start gap-2 justify-between">
          <Dashboard751015CardTitle />
        </div>
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
                {t("dashboard.app.overall-expenses")}
              </Label>
              <DashboardOverallExpensesAmount />
            </div>
            <Dashboard751015Expenses />

            <Dashboard751015AddExpense />
            <SuggestedExpenses expenseType="overall" />
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="md:text-lg font-semibold">
              {t("dashboard.app.remainder")}
            </span>
            <DashboardOverallExpensesRemainder />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start justify-between pb-4 border-b">
          <div className="flex items-center justify-between w-full">
            <Label className="md:text-lg font-semibold">
              {t("dashboard.app.cushion-fund")}
            </Label>
            <DashboardCushionFundAmount />
          </div>
          <p className="text-sm">
            {t("dashboard.app.cushion-fund-description")}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-start justify-between pb-4">
          <div className="flex items-center justify-between w-full">
            <Label className="md:text-lg font-semibold">
              {t("dashboard.app.15-savings")}
            </Label>
            <Dashboard15SavingsAmount />
          </div>
          <p className="text-sm">{t("dashboard.app.15-savings-description")}</p>
        </div>
      </CardContent>
    </Card>
  );
};
