import { AppSection } from "./app-section";
import { Button } from "./ui/button";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";

type Props = {};

export const HeroSection = async (props: Props) => {
  const t = await getTranslations("home.hero");

  return (
    <section className="py-16 overflow-hidden flex flex-col items-center gap-3 container">
      <h1 className="text-center text-2xl md:text-6xl font-bold">
        {t("title")}
      </h1>
      <p className="text-center text-xl">{t("subtitle")}</p>

      <Button className="mb-10" asChild>
        <Link href={"#how-it-works"}>{t("button")}</Link>
      </Button>

      <AppSection />
    </section>
  );
};
