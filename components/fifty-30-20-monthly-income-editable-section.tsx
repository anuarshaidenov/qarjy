"use client";

import { Label } from "@/components/ui/label";
import { useFifty2030 } from "@/hooks/use-fifty-20-30";
import { Input } from "./ui/input";
import { NumericFormat } from "react-number-format";
import { formatAmount } from "@/lib/utils";
import { LOCALSTORAGE_KEYS } from "@/lib/constants";
import { useTranslations } from "next-intl";

type Props = {};

export const MonthlyIncomeEditableSection = (props: Props) => {
  const { budget, setBudget } = useFifty2030();
  const t = useTranslations("home.app.tab-content.503020");

  const handleMonthlyIncomeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = formatAmount(event.target.value);

    const newBudget = {
      ...budget,
      monthlyIncome: amount,
    };

    setBudget(newBudget);
    localStorage.setItem(
      LOCALSTORAGE_KEYS.fifty3020budget,
      JSON.stringify(newBudget)
    );
  };

  return (
    <div className="flex items-center w-full border-b pb-4">
      <Label className="md:text-lg font-semibold grow" id="monthly-income">
        {t("monthly-income")}
      </Label>
      <div className="shrink max-w-[180px] flex items-center gap-2">
        <NumericFormat
          autoComplete="off"
          className="md:text-lg font-semibold"
          customInput={Input}
          id="monthly-income"
          thousandSeparator=","
          value={budget?.monthlyIncome}
          onChange={handleMonthlyIncomeChange}
        />
        <span>KZT</span>
      </div>
    </div>
  );
};
