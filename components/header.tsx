import { ModeToggle } from "@/components/mode-toggle";
import { LocaleToggle } from "./locale-toggle";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Link } from "@/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { Skeleton } from "./ui/skeleton";
import { CurrencySelector } from "./currency-selector";
import { Menu } from "lucide-react";
import { MobileMenu } from "./mobile-menu";

type Props = {};

export const Header = async (props: Props) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const user = data.user;

  const t = await getTranslations();

  return (
    <header className="fixed top-0 bg-background left-0 z-50 w-full">
      <div className="container py-4 flex items-center justify-between flex-wrap gap-4">
        <Logo className="flex" />

        <MobileMenu />

        <div className="gap-4 items-center hidden md:flex">
          <ul className="flex items-center gap-1 md:mr-6">
            <li>
              <Button asChild variant={"link"} className="text-foreground">
                <Link href="/pricing" className="text-sm font-semibold">
                  {t("pricing")}
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild variant={"link"} className="text-foreground">
                <Link href="#how-it-works" className="text-sm font-semibold">
                  {t("how-it-works")}
                </Link>
              </Button>
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
