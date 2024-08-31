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
import { useContext } from "react";
import { BudgetContext } from "./budget-context-provider";
import { formatNumberWithCommas } from "@/lib/utils";

type Props = {};

export const Fifty3020BudgetCardLocal = (props: Props) => {
  const { budget } = useContext(BudgetContext);

  return (
    <Card className="h-full max-h-[490px] overflow-scroll">
      <CardHeader>
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold">September budget</h2>
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
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <Label className="text-lg font-semibold">Your monthly income:</Label>
          <p className="font-semibold">
            {formatNumberWithCommas(budget.monthlyIncome || 0)} KZT
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center justify-between w-full">
            <Label className="text-lg font-semibold">
              Essential expenses / needs (50%):
            </Label>
            <p className="font-semibold">1000 KZT</p>
          </div>
          <ul className="text-sm w-full">
            {budget.essentialExpenses.map((essentialExpense) => (
              <li
                key={essentialExpense.id}
                className="flex items-center justify-between w-full"
              >
                <span>{essentialExpense.name}</span>{" "}
                <span>
                  {formatNumberWithCommas(essentialExpense.amount)} KZT
                </span>
              </li>
            ))}
          </ul>
        </div>

        <span className="text-red-700 text-end font-semibold text-sm mb-4">
          -3000 KZT
        </span>

        <div className="flex flex-col gap-2 items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <Label className="text-lg font-semibold">Wants (30%):</Label>
            <p className="font-semibold">1000 KZT</p>
          </div>
          <ul className="text-sm w-full">
            {budget.nonEssentialExpenses.map((nonEssentialExpense) => (
              <li
                key={nonEssentialExpense.id}
                className="flex items-center justify-between w-full"
              >
                <span>{nonEssentialExpense.name}</span>{" "}
                <span>
                  {formatNumberWithCommas(nonEssentialExpense.amount)} KZT
                </span>
              </li>
            ))}
          </ul>
        </div>
        <span className="text-green-700 text-end font-semibold text-sm mb-4">
          +32000 KZT
        </span>
        <div className="flex flex-col gap-2 items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <Label className="text-lg font-semibold">
              Savings / investments (20%):
            </Label>
            <p className="font-semibold">1000 KZT</p>
          </div>
          <p className="text-sm">
            Keep this money in your savings account or in your investments.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
