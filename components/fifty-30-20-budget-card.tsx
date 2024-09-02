"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { DownloadIcon, UploadIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, formatNumberWithCommas } from "@/lib/utils";
import { useFifty2030 } from "@/hooks/use-fifty-20-30";
import { MonthlyIncomeEditableSection } from "./fifty-30-20-monthly-income-editable-section";
import { EssentialExpenseEditable } from "./fifty-30-20-essential-expense-editable";
import { NonEssentialExpenseEditable } from "./fifty-30-20-non-essential-expense-editable";
import { AddEssentialExpense } from "./fifty-30-20-add-essential-expense";
import { AddNonEssentialExpense } from "./fifty-30-20-add-non-essential-expense";
import { Fifty3020BudgetTitle } from "./fifty-30-20-budget-title";
import { useTranslations } from "next-intl";

type Props = {};

export const Fifty3020BudgetCardLocal = (props: Props) => {
  const {
    budget,
    essentialsDifference,
    essentialsBudget,
    nonEssentialsBudget,
    nonEssentialsDifference,
    investmentsBudget,
  } = useFifty2030();
  const t = useTranslations("home.app.tab-content.503020");

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <Fifty3020BudgetTitle />
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
      <CardContent className="flex flex-col gap-8 ">
        <MonthlyIncomeEditableSection />
        <div className="flex flex-col gap-4 pb-4 border-b">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">
                {t("essential-expenses")}
              </Label>
              <p className="font-semibold shrink-0">
                {formatNumberWithCommas(essentialsBudget)} ₸
              </p>
            </div>
            <ul className="text-sm w-full">
              {budget.essentialExpenses.map((essentialExpense) => (
                <EssentialExpenseEditable
                  key={essentialExpense.id}
                  expense={essentialExpense}
                />
              ))}
            </ul>
            <AddEssentialExpense />
          </div>

          <div className="w-full flex items-center justify-between">
            <span className="md:text-lg font-semibold">{t("remainder")}</span>
            <span
              className={cn("text-end font-semibold shrink-0", {
                "text-green-700": essentialsDifference > 0,
                "text-destructive": essentialsDifference < 0,
              })}
            >
              {formatNumberWithCommas(essentialsDifference)} ₸
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b pb-4">
          <div className="flex flex-col gap-2 items-start justify-between">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">{t("wants")}</Label>
              <p className="font-semibold shrink-0">
                {formatNumberWithCommas(nonEssentialsBudget)} ₸
              </p>
            </div>
            <ul className="text-sm w-full">
              {budget.nonEssentialExpenses.map((nonEssentialExpense) => (
                <NonEssentialExpenseEditable
                  key={nonEssentialExpense.id}
                  expense={nonEssentialExpense}
                />
              ))}
            </ul>
            <AddNonEssentialExpense />
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="md:text-lg font-semibold">{t("remainder")}</span>
            <span
              className={cn("text-end font-semibold shrink-0", {
                "text-green-700": nonEssentialsDifference > 0,
                "text-destructive": nonEssentialsDifference < 0,
              })}
            >
              {formatNumberWithCommas(nonEssentialsDifference)} ₸
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <Label className="md:text-lg font-semibold">
              {t("savings.title")}
            </Label>
            <p className="font-semibold shrink-0">
              {formatNumberWithCommas(investmentsBudget)} ₸
            </p>
          </div>
          <p className="text-sm">{t("savings.sub-title")}</p>
        </div>
      </CardContent>
    </Card>
  );
};
