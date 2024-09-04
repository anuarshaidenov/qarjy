import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

type Props = {};

async function DashboardPage({}: Props) {
  const t = await getTranslations();
  return (
    <section className="container py-20">
      <div className="flex text-center items-center flex-col gap-4">
        <h1 className="md:text-5xl text-lg font-mono">
          {t("dashboard.home.title")}
        </h1>
        <Button asChild size={"lg"}>
          <Link href={"/"}>{t("dashboard.home.button")}</Link>
        </Button>
      </div>
    </section>
  );
}

export default DashboardPage;
