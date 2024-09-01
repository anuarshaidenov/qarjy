import { HowItWorksWrapper } from "./how-it-works-wrapper";
import { Fifty2030HowItWorks } from "./fifty-20-30-how-it-works";
import { Seventyfive1015HowItWorks } from "./seventyfive-10-15-how-it-works";
import { getTranslations } from "next-intl/server";

type Props = {};

export const HowItWorks = async (props: Props) => {
  const t = await getTranslations("home.how-it-works");

  return (
    <section
      id="how-it-works"
      className="py-16 container min-h-screen max-w-[800px] mx-auto"
    >
      <h2 className="text-3xl font-semibold text-center mb-10">{t("title")}</h2>
      <HowItWorksWrapper
        fifty3020content={<Fifty2030HowItWorks />}
        seventyfive1015content={<Seventyfive1015HowItWorks />}
      />
    </section>
  );
};
