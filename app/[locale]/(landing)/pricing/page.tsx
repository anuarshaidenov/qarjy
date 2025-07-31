import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

type Props = {};

async function PricingPage({}: Props) {
  const t = await getTranslations("");

  return (
    <div className="container py-32 md:py-52 flex flex-col gap-8">
      <div className="flex flex-col items-start gap-6">
        <h1 className="text-5xl md:text-8xl font-bold">
          {t("pricing-page-title")}
        </h1>
        <p className="max-w-xl">{t("pricing-page-description")}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>{t("pricing-card-basic")}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {t("pricing-card-basic-description")}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {t("pricing-card-basic-price")}
            </p>
          </CardContent>
        </Card>
        <Card className="opacity-50">
          <CardHeader>
            <CardTitle>{t("pricing-card-pro")}</CardTitle>
            <p className="opacity-0">{t("pricing-card-basic-description")}</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{t("pricing-card-pro-price")}</p>
          </CardContent>
        </Card>
      </div>
      <ul className="flex items-center gap-4 text-sm text-muted-foreground">
        <li>
          <Link href="/terms-of-service">Terms of service</Link>
        </li>
        <li>
          <Link href="/privacy-policy">Privacy policy</Link>
        </li>
      </ul>
    </div>
  );
}

export default PricingPage;
