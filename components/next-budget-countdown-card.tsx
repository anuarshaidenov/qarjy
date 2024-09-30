"use client";

import { daysUntilNextMonth, getNextMonthName } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTranslations } from "next-intl";
import { locales } from "@/navigation";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {};

export const NextBudgetCountdownCard = (props: Props) => {
  const params = useParams();
  const locale = params.locale === "kz" ? "kk" : params.locale;
  const t = useTranslations();

  const [nextMonthName, setNextMonthName] = useState<string | null>(null);
  useEffect(() => {
    setNextMonthName(getNextMonthName(locale as string));
  }, [locale]);
  const daysLeft = daysUntilNextMonth();
  const suffix =
    daysLeft === 1 ? t("next-budget-card.day") : t("next-budget-card.days");

  return (
    <Card className="opacity-50 pointer-events-none">
      <CardHeader>
        <CardTitle>
          {nextMonthName} {t("next-budget-card.budget")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-bold">
          {t("next-budget-card.coming-in")} {daysLeft} {suffix}{" "}
          {t("next-budget-card.from-now")}
        </h3>
      </CardContent>
    </Card>
  );
};
