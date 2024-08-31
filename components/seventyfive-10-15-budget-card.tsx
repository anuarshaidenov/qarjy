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

type Props = {};

export const SeventyFive1015BudgetCard = (props: Props) => {
  const { budget, essentialsBudget, cushionFund, savings, expensesDifference } =
    useSeventyFive1015();

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-semibold">September budget</h2>
          <div className="flex items-start gap-4">
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
              <Label className="text-lg font-semibold">Expenses (75%):</Label>
              <p className="font-semibold">
                {formatNumberWithCommas(essentialsBudget)} KZT
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
            <span className="text-lg font-semibold">Remainder</span>
            <span
              className={cn("text-end font-semibold", {
                "text-green-700": expensesDifference > 0,
                "text-destructive": expensesDifference < 0,
              })}
            >
              {formatNumberWithCommas(expensesDifference)} KZT
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start justify-between pb-4 border-b">
          <div className="flex items-center justify-between w-full">
            <Label className="text-lg font-semibold">Cushion fund (10%):</Label>
            <p className="font-semibold">
              {formatNumberWithCommas(cushionFund)} KZT
            </p>
          </div>
          <p className="text-sm">
            Keep this money in case of unexpected expenses.
          </p>
        </div>
        <div className="flex flex-col gap-2 items-start justify-between pb-4 border-b">
          <div className="flex items-center justify-between w-full">
            <Label className="text-lg font-semibold">
              Savings / investments (15%):
            </Label>
            <p className="font-semibold">
              {formatNumberWithCommas(savings)} KZT
            </p>
          </div>
          <p className="text-sm">
            Keep this money in your savings account or in your investments.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
