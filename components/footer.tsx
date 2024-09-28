import { Link } from "@/navigation";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { getTranslations } from "next-intl/server";

type Props = {};

export const Footer = async (props: Props) => {
  const t = await getTranslations();

  return (
    <footer className="mt-20 border-b border-t">
      <div className="container w-full py-10 md:py-20 flex items-start gap-8 flex-wrap justify-between">
        <Logo />

        <nav className="flex items-start gap-8 flex-wrap">
          <ul className="flex flex-col gap-4">
            <li>
              <h4 className="md:text-lg font-semibold">
                {t("footer.about-us")}
              </h4>
            </li>
            <li>
              <Button asChild variant={"link"} className="p-0 text-foreground">
                <Link href={"#how-it-works"}>{t("footer.how-it-works")}</Link>
              </Button>
            </li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li>
              <h4 className="md:text-lg font-semibold">
                {t("footer.get-help")}
              </h4>
            </li>
            <li>
              <Button asChild variant={"link"} className="p-0 text-foreground">
                <Link href={"mailto:anuarshaidenov@gmail.com"}>
                  {t("footer.contact-us")}
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="py-8 container">
        <p className="text-sm text-border">{t("footer.copyright")}</p>
      </div>
    </footer>
  );
};
