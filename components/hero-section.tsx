import { useTranslations } from "next-intl";
import { AppSection } from "./app-section";

type Props = {};

export const HeroSection = (props: Props) => {
  const t = useTranslations("home.hero");

  return (
    <section className="py-16 overflow-hidden flex flex-col gap-3">
      <h1 className="text-center text-2xl md:text-6xl font-bold">
        {t("title")}
      </h1>
      <p className="text-center text-xl mb-10">{t("subtitle")}</p>

      <AppSection />
    </section>
  );
};
