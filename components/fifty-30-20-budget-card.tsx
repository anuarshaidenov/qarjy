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
import { MonthlyIncomeEditableSection } from "./monthly-income-editable-section";
import { ExpenseEditable } from "./expense-editable";

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

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold">September budget</h2>
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
      <CardContent className="flex flex-col gap-8 ">
        <MonthlyIncomeEditableSection />
        <div className="flex flex-col gap-4 pb-4 border-b">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-between w-full">
              <Label className="text-lg font-semibold">
                Essential expenses / needs (50%):
              </Label>
              <p className="font-semibold">
                {formatNumberWithCommas(essentialsBudget)} KZT
              </p>
            </div>
            <ul className="text-sm w-full">
              {budget.essentialExpenses.map((essentialExpense) => (
                <ExpenseEditable
                  key={essentialExpense.id}
                  expense={essentialExpense}
                />
              ))}
            </ul>
          </div>

          <div className="w-full flex items-center justify-between">
            <span className="text-lg font-semibold">Remainder</span>
            <span
              className={cn("text-end font-semibold", {
                "text-green-700": essentialsDifference > 0,
                "text-red-700": essentialsDifference < 0,
              })}
            >
              {formatNumberWithCommas(essentialsDifference)} KZT
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b pb-4">
          <div className="flex flex-col gap-2 items-start justify-between">
            <div className="flex items-center justify-between w-full">
              <Label className="text-lg font-semibold">Wants (30%):</Label>
              <p className="font-semibold">
                {formatNumberWithCommas(nonEssentialsBudget)} KZT
              </p>
            </div>
            <ul className="text-sm w-full">
              {budget.nonEssentialExpenses.map((nonEssentialExpense) => (
                <li
                  key={nonEssentialExpense.id}
                  className="flex items-center justify-between w-full"
                >
                  <span>{nonEssentialExpense.name}</span>{" "}
                  <span>
                    {formatNumberWithCommas(nonEssentialExpense.amount || 0)}{" "}
                    KZT
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="text-lg font-semibold">Remainder</span>
            <span
              className={cn("text-end font-semibold", {
                "text-green-700": nonEssentialsDifference > 0,
                "text-red-700": nonEssentialsDifference < 0,
              })}
            >
              {formatNumberWithCommas(nonEssentialsDifference)} KZT
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <Label className="text-lg font-semibold">
              Savings / investments (20%):
            </Label>
            <p className="font-semibold">
              {formatNumberWithCommas(investmentsBudget)} KZT
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
