"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { DownloadIcon, UploadIcon } from "@radix-ui/react-icons";
import { Seventyfive1015MonthlyIncomeEditableSection } from "./seventyfive-10-15-monthly-income-editable-section";
import { Label } from "./ui/label";
import { cn, formatNumberWithCommas } from "@/lib/utils";
import { useSeventyFive1015 } from "@/hooks/use-seventyfive-10-15";
import { Seventyfive1015ExpenseEditable } from "./seventyfive-10-15-expense-editable";
import { Seventyfive1015AddExpense } from "./seventyfive-10-15-add-expense";
import { SeventyFive1015BudgetTitle } from "./seventyfive-10-15-budget-title";
import { useTranslations } from "next-intl";

type Props = {};

export const SeventyFive1015BudgetCard = (props: Props) => {
  const { budget, essentialsBudget, cushionFund, savings, expensesDifference } =
    useSeventyFive1015();

  const t = useTranslations("home.app.tab-content.751015");

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start gap-2 justify-between">
          <SeventyFive1015BudgetTitle />
          <div className="hidden items-start gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant={"secondary"} size={"icon"}>
                    <UploadIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button size={"icon"}>
                    <DownloadIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <Seventyfive1015MonthlyIncomeEditableSection />
        <div className="flex flex-col gap-4 pb-4 border-b">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">
                {t("expenses")}
              </Label>
              <p className="font-semibold shrink-0">
                {formatNumberWithCommas(essentialsBudget)} ₸
              </p>
            </div>
            <ul className="text-sm w-full">
              {budget.expenses.map((expense) => (
                <Seventyfive1015ExpenseEditable
                  key={expense.id}
                  expense={expense}
                />
              ))}
            </ul>
            <Seventyfive1015AddExpense />
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="md:text-lg font-semibold">{t("remainder")}</span>
            <span
              className={cn("text-end shrink-0 font-semibold", {
                "text-green-700": expensesDifference > 0,
                "text-destructive": expensesDifference < 0,
              })}
            >
              {formatNumberWithCommas(expensesDifference)} ₸
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start justify-between pb-4 border-b">
          <div className="flex items-center justify-between w-full">
            <Label className="md:text-lg font-semibold">
              {t("cushion-fund.title")}
            </Label>
            <p className="font-semibold shrink-0">
              {formatNumberWithCommas(cushionFund)} ₸
            </p>
          </div>
          <p className="text-sm">{t("cushion-fund.sub-title")}</p>
        </div>
        <div className="flex flex-col gap-2 items-start justify-between pb-4">
          <div className="flex items-center justify-between w-full">
            <Label className="md:text-lg font-semibold">
              {t("savings.title")}
            </Label>
            <p className="font-semibold shrink-0">
              {formatNumberWithCommas(savings)} ₸
            </p>
          </div>
          <p className="text-sm">{t("savings.sub-title")}</p>
        </div>
      </CardContent>
    </Card>
  );
};
