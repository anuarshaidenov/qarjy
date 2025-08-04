"use client";

import React from "react";
import { useCommandDialog } from "./command-dialog-provider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import { MoonIcon, Plus, SunIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetBudgets } from "@/hooks/use-get-budgets";
import Link from "next/link";
import { DashboardIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useCurrency } from "./currency-provider";
import { currencies } from "@/lib/constants";
import { useCreateBudgetDialog } from "./create-budget-dialog-provider";

type Props = {};

export const SearchDialog = (props: Props) => {
  const { open, setOpen } = useCommandDialog();

  const router = useRouter();
  const { data } = useGetBudgets({ page: 1, pageSize: 30 });
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const { setCurrency } = useCurrency();
  const { setOpen: setOpenCreateBudget } = useCreateBudgetDialog();

  const handleCreateBudget = () => {
    setOpenCreateBudget(true);
    setOpen(false);
  };

  const handleOpenDashboard = () => {
    router.push("/dashboard");
    setOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleCreateBudget();
      }
      if (e.key === "d" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleOpenDashboard();
      }
      if (e.key === "t" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleTheme();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={t("search.placeholder")} />
      <CommandList>
        <CommandEmpty>{t("search.empty")}</CommandEmpty>
        <CommandGroup heading={t("search.commands")}>
          <CommandItem onSelect={handleCreateBudget}>
            <Plus />
            <span>{t("search.new")}</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleOpenDashboard}>
            <DashboardIcon />
            <span>{t("search.dashboard")}</span>
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={toggleTheme}>
            <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span>{t("search.theme")}</span>
            <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t("search.suggestions")}>
          {data?.data.map((budget) => (
            <CommandLink
              key={budget.id}
              onSelect={() => {
                setOpen(false);
              }}
              href={`/dashboard/budget/${budget.id}`}
            >
              {budget.title}
            </CommandLink>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t("search.currencies-heading")}>
          {currencies.map((currency) => (
            <CommandItem
              key={currency.code}
              onSelect={() => {
                setCurrency(currency);
                setOpen(false);
              }}
            >
              <span className="ml-1">{currency.symbol}</span>
              <span>{t("search.currency", { currency: currency.name })}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t("settings")}>
          <CommandLink
            href="/dashboard/profile"
            onSelect={() => setOpen(false)}
          >
            <span className="sr-only">Profile Account</span>
            Profile
          </CommandLink>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

const CommandLink = ({
  onSelect,
  href,
  children,
}: {
  onSelect: () => void;
  href: string;
  children: React.ReactNode;
}) => {
  const ref = React.useRef<HTMLAnchorElement>(null);

  const handleOpenBudget = () => {
    ref.current?.click();
    onSelect();
  };
  return (
    <CommandItem onSelect={handleOpenBudget}>
      <Link ref={ref} href={href}>
        {children}
      </Link>
    </CommandItem>
  );
};
