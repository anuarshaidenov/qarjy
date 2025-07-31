import { ModeToggle } from "@/components/mode-toggle";
import { LocaleToggle } from "./locale-toggle";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Link } from "@/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { Skeleton } from "./ui/skeleton";
import { CurrencySelector } from "./currency-selector";

type Props = {};

export const Header = async (props: Props) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const user = data.user;

  const t = await getTranslations();

  return (
    <header className="fixed top-0 bg-background left-0 z-50 w-full">
      <div className="container py-4 flex items-center justify-center md:justify-between flex-wrap gap-4">
        <Logo className="hidden md:flex" />

        <div className="flex gap-4 items-center">
          <ul className="flex items-center gap-1 md:mr-6">
            <li>
              <Link href="/pricing" className="text-sm font-semibold">
                {t("pricing")}
              </Link>
            </li>
          </ul>
          <ModeToggle />
          <LocaleToggle />
          <CurrencySelector />

          {(!user || !!error) && (
            <Button asChild>
              <Link href={"/signup"}>{t("header.cta")}</Link>
            </Button>
          )}
          {!!user && (
            <Button asChild>
              <Link href={"/dashboard"}>{t("dashboard.button")}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export const HeaderSkeleton = () => {
  return (
    <header className="">
      <div className="container py-4 flex items-center justify-between">
        <Logo />

        <div className="flex gap-4 items-center">
          <ModeToggle />
          <LocaleToggle />

          <Skeleton className="h-[36px] w-[80px]" />
        </div>
      </div>
    </header>
  );
};
