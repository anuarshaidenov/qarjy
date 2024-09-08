import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";
import { Dashboard503020Title } from "./dashboard-504020-title";
import { DashboardMonthlyIncome } from "./dashboard-503020-monthly-income";
import { DashboardEssentialExpenses } from "./dashboard-essential-expenses";
import { Dashboard503020AddEssentialExpense } from "./dashboard-503020-add-essential-expense";
import { DashboardNonEssentialExpenses } from "./dashboard-non-essential-expenses";
import { Dashboard503020AddNonEssentialExpense } from "./dashboard-503020-add-non-essential-expense";
import { DashboardEssenialExpensesAmount } from "./dashboard-essential-expenses-amount";
import { DashboardNonEssenialExpensesAmount } from "./dashboard-non-essential-expenses-amount";
import { Dashboard20SavingsAmount } from "./dashboard-20-savings-amount";

type Props = {};

export const Dashboard503020Card = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <Dashboard503020Title />
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex items-center w-full border-b pb-4">
          <Label className="md:text-lg font-semibold grow" id="monthly-income">
            Monthly Income
          </Label>
          <div className="shrink max-w-[180px] flex items-center gap-2">
            <DashboardMonthlyIncome />
            <span>₸</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-4 border-b">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">
                Essential expenses
              </Label>
              <DashboardEssenialExpensesAmount />
            </div>
            <DashboardEssentialExpenses />
            <Dashboard503020AddEssentialExpense />
          </div>

          <div className="w-full flex items-center justify-between">
            <span className="md:text-lg font-semibold">Remainder</span>
            <span className={cn("text-end font-semibold shrink-0")}>
              313131331 ₸
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b pb-4">
          <div className="flex flex-col gap-2 items-start justify-between">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">Non essential</Label>
              <DashboardNonEssenialExpensesAmount />
            </div>
            <DashboardNonEssentialExpenses />

            <Dashboard503020AddNonEssentialExpense />
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="md:text-lg font-semibold">Remainder</span>
            <span
              className={cn("text-end font-semibold shrink-0", {
                // "text-green-700": nonEssentialsDifference > 0,
                // "text-destructive": nonEssentialsDifference < 0,
              })}
            >
              311331 ₸
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <Label className="md:text-lg font-semibold">Savings</Label>
            <Dashboard20SavingsAmount />
          </div>
          <p className="text-sm">Descriptione</p>
        </div>
      </CardContent>
    </Card>
  );
};
