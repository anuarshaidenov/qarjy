import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { ModeToggle } from "./mode-toggle";
import { LocaleToggle } from "./locale-toggle";
import { CurrencySelector } from "./currency-selector";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {};

export const MobileMenu = async (props: Props) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const user = data.user;
  const t = await getTranslations();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="pt-12">
        <SheetHeader>
          <SheetTitle className="sr-only">Mobile menu</SheetTitle>
        </SheetHeader>
        <ul className="flex items-start flex-col gap-8">
          <li className="flex items-center gap-2">
            <ModeToggle />
            <LocaleToggle />
            <CurrencySelector />
            {(!user || !!error) && (
              <SheetClose asChild>
                <Button asChild>
                  <Link href={"/signup"}>{t("header.cta")}</Link>
                </Button>
              </SheetClose>
            )}
            {!!user && (
              <SheetClose asChild>
                <Button asChild>
                  <Link href={"/dashboard"}>{t("dashboard.button")}</Link>
                </Button>
              </SheetClose>
            )}
          </li>
          <li>
            <ul className="flex flex-col items-start gap-2">
              <li>
                <SheetClose asChild>
                  <Button asChild variant={"link"} className="text-foreground">
                    <Link href="/pricing" className="text-xl font-semibold">
                      {t("pricing")}
                    </Link>
                  </Button>
                </SheetClose>
              </li>
              <li className="w-full">
                <SheetClose asChild>
                  <Button asChild variant={"link"} className="text-foreground">
                    <Link
                      href="/#how-it-works"
                      className="text-xl font-semibold"
                    >
                      {t("how-it-works")}
                    </Link>
                  </Button>
                </SheetClose>
              </li>
            </ul>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};
