import { getTranslations } from "next-intl/server";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "@/navigation";

type Props = {};

export const CtaSection = async (props: Props) => {
  const t = await getTranslations();

  return (
    <section className="container py-32 flex flex-col gap-5 items-start">
      <h2 className="text-3xl md:text-5xl font-semibold">
        {t("cta-section.title")}
      </h2>
      <p className="text-muted-foreground">{t("cta-section.description")}</p>

      <Button asChild>
        <Link href={"/signup"}>{t("cta-section.button")}</Link>
      </Button>
    </section>
  );
};
