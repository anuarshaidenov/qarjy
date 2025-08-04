import { Home, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { signOut } from "@/actions/sign-out";
import { LocaleToggle } from "@/components/locale-toggle";
import { DashboardIcon } from "@radix-ui/react-icons";
import {
  DashboardActiveLink,
  DashboardLink,
} from "@/components/dashboard-active-link";

import { ModeToggle } from "@/components/mode-toggle";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CurrencySelector } from "@/components/currency-selector";
import { BudgetBreadcrumbs } from "@/components/budget-breadcrumbs";
import { CommandDialogProvider } from "@/components/command-dialog-provider";
import { CommandButton } from "@/components/command-button";
import { CreateBudgetDialogProvider } from "@/components/create-budget-dialog-provider";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const t = await getTranslations();
  return {
    title: t("dashboard.metadata.title"),
  };
};

const DashboardLayout = async (props: Props) => {
  const params = await props.params;

  const { children } = props;

  const links: DashboardLink[] = [
    {
      href: "/dashboard",
      name: "dashboard",
      icon: <DashboardIcon className="size-6 md:size-5" />,
    },
  ];
  setRequestLocale(params.locale);

  return (
    <CreateBudgetDialogProvider>
      <CommandDialogProvider>
        <div className="grid h-screen w-full md:pl-[53px]">
          <aside className="inset-y fixed left-0 z-20 hidden md:flex h-full flex-col border-r">
            <div className="border-b p-2">
              <Button variant="outline" size="icon" aria-label="Home" asChild>
                <Link href={"/"}>
                  <Home className="size-5" />
                </Link>
              </Button>
            </div>
            <nav className="grid gap-1 p-2">
              <CommandButton />
              {links.map((link) => (
                <DashboardActiveLink key={link.href} route={link} />
              ))}
            </nav>
            <nav className="mt-auto grid gap-1 p-2">
              <Button variant={"outline"} size={"icon"}>
                <Link href={"/dashboard/profile"}>
                  <User className="size-5" />
                </Link>
              </Button>
              <LocaleToggle />
              <ModeToggle />
              <CurrencySelector />

              <form action={signOut}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Help"
                >
                  <LogOut className="size-5" />
                </Button>
              </form>
            </nav>
          </aside>
          <div className="">
            <header className="flex sticky z-10 left-0 w-full top-0 h-[53px] items-center justify-between gap-1 border-b bg-background px-4">
              <BudgetBreadcrumbs currentPageTitle="Dashboard" />
              <nav className="md:hidden flex items-center gap-4">
                <LocaleToggle />
                <ModeToggle />
                <CurrencySelector />

                <form action={signOut}>
                  <Button variant="ghost" size="icon" aria-label="Help">
                    <LogOut className="size-5" />
                  </Button>
                </form>
              </nav>
            </header>
            <main className="h-full">{children}</main>
            <footer className="md:hidden bg-background sticky bottom-0 left-0 border-t">
              <div className="container py-2 flex items-center justify-center gap-4">
                <nav className="flex items-center gap-4">
                  {links.map((link) => (
                    <DashboardActiveLink
                      className="h-12 w-12"
                      key={link.href}
                      route={link}
                    />
                  ))}
                  <DashboardActiveLink
                    className="h-12 w-12"
                    route={{
                      href: "/dashboard/profile",
                      name: "profile",
                      icon: <User className="size-6 md:size-5" />,
                    }}
                  />
                </nav>
              </div>
            </footer>
          </div>
        </div>
      </CommandDialogProvider>
    </CreateBudgetDialogProvider>
  );
};

export default DashboardLayout;
