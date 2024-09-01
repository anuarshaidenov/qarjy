import { useTranslations } from "next-intl";
import { AppSection } from "./app-section";
import { Button } from "./ui/button";
import { Link } from "@/navigation";

type Props = {};

export const HeroSection = (props: Props) => {
  const t = useTranslations("home.hero");

  return (
    <section className="py-16 overflow-hidden flex flex-col items-center gap-3 container">
      <h1 className="text-center text-2xl md:text-6xl font-bold">
        {t("title")}
      </h1>
      <p className="text-center text-xl">{t("subtitle")}</p>

      <Button variant={"secondary"} className="mb-10" asChild>
        <Link href={"#how-it-works"}>{t("button")}</Link>
      </Button>

      <AppSection />
    </section>
  );
};
