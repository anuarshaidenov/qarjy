import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { ModeToggle } from "./mode-toggle";
import { LocaleToggle } from "./locale-toggle";
import { CurrencySelector } from "./currency-selector";
import Link from "next/link";

type Props = {};

export const MobileMenu = async (props: Props) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const user = data.user;
  const t = await getTranslations();

  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="pt-12">
        <SheetTitle className="sr-only">Mobile menu</SheetTitle>
        <SheetDescription className="sr-only">
          Use the navigation links to explore the site.
        </SheetDescription>
        <div className="gap-4 items-start h-full justify-between flex flex-col">
          <ul className="flex flex-wrap items-center gap-1 md:mr-6">
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
          </ul>

          <ul className="flex flex-col items-center gap-1 md:mr-6 pb-10">
            <li>
              <Link href="/pricing" className="font-semibold">
                {t("pricing")}
              </Link>
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};
