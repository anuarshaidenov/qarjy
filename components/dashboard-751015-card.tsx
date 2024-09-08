import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { NumericFormat } from "./ui/numeric-format";
import { Button } from "./ui/button";
import { CircleBackslashIcon, PlusIcon } from "@radix-ui/react-icons";
import { Dashboard751015CardTitle } from "./dashboard-751015-title";
import { DashboardMonthlyIncome } from "./dashboard-503020-monthly-income";
import { Dashboard751015AddExpense } from "./dashboard-751015-add-expense";
import { Dashboard751015Expenses } from "./dashboard-751015-expenes";

type Props = {};

export const Dashboard751015Card = (props: Props) => {
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
              <Label className="md:text-lg font-semibold">Expenses</Label>
              <p className="font-semibold shrink-0">133313 ₸</p>
            </div>
            <Dashboard751015Expenses />

            <Dashboard751015AddExpense />
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="md:text-lg font-semibold">{"Remainder"}</span>
            <span
              className={cn("text-end shrink-0 font-semibold", {
                // "text-green-700": expensesDifference > 0,
                // "text-destructive": expensesDifference < 0,
              })}
            >
              2211 ₸
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start justify-between pb-4 border-b">
          <div className="flex items-center justify-between w-full">
            <Label className="md:text-lg font-semibold">Cushion Fund</Label>
            <p className="font-semibold shrink-0">2112 ₸</p>
          </div>
          <p className="text-sm">Descriptione</p>
        </div>
        <div className="flex flex-col gap-2 items-start justify-between pb-4">
          <div className="flex items-center justify-between w-full">
            <Label className="md:text-lg font-semibold">Savings</Label>
            <p className="font-semibold shrink-0">3313131 ₸</p>
          </div>
          <p className="text-sm">Descriptione</p>
        </div>
      </CardContent>
    </Card>
  );
};