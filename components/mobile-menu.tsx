import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { ModeToggle } from "./mode-toggle";
import { LocaleToggle } from "./locale-toggle";
import { CurrencySelector } from "./currency-selector";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type Props = {};

export const MobileMenu = async (props: Props) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const user = data.user;
  const t = await getTranslations();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="md:hidden" variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">Are you absolutely sure?</DrawerTitle>
        <DrawerDescription className="sr-only">
          This action cannot be undone.
        </DrawerDescription>

        <div className="flex items-center w-full justify-center gap-4 py-10">
          <DrawerClose asChild>
            <Link href="/pricing" className="text-sm font-semibold">
              {t("pricing")}
            </Link>
          </DrawerClose>
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
      </DrawerContent>
    </Drawer>
  );
};
