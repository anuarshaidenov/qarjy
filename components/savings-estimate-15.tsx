"use client";

import { Card, CardContent } from "./ui/card";
import {
  calculate15SavingsBasedOnIncome,
  formatNumberWithCommas,
} from "@/lib/utils";
import { NumericFormat } from "./ui/numeric-format";
import { useMemo, useState } from "react";
import { useMonthlyIncome } from "./monthly-income-context-provider";
import { useTranslations } from "next-intl";

type Props = {};

export const SavingsEstimate15 = (props: Props) => {
  const [value, setValue] = useState(6);
  const { monthlyIncome } = useMonthlyIncome();

  const savingsAmount = useMemo(() => {
    return calculate15SavingsBasedOnIncome(monthlyIncome as number) * value;
  }, [monthlyIncome, value]);

  const t = useTranslations();

  return (
    <Card>
      <CardContent className="h-52 pt-10 flex flex-col gap-8 items-center justify-center">
        <h2 className="font-bold text-green-700 text-3xl sm:text-5xl">
          {formatNumberWithCommas(savingsAmount)} ₸
        </h2>
        <div className="flex flex-wrap gap-4 text-sm items-center">
          <p className="shrink-0">✨{t("dashboard.savings-estimate-left")}</p>
          <NumericFormat
            className="w-8 h-8 block p-0 pl-2"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
          <p>{t("dashboard.savings-estimate-right")} ✨</p>
        </div>
      </CardContent>
    </Card>
  );
};
