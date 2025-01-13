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
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const user = data.user;

  const t = await getTranslations();

  return (
    <header className="fixed top-0 bg-background left-0 z-50 w-full">
      <div className="container py-4 flex items-center justify-between flex-wrap gap-4">
        <Logo />

        <div className="flex gap-4 items-center">
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
