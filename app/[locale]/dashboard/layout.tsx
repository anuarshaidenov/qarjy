import { Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { signOut } from "@/actions/sign-out";
import { LocaleToggle } from "@/components/locale-toggle";
import { DashboardIcon } from "@radix-ui/react-icons";
import {
  DashboardActiveLink,
  DashboardLink,
} from "@/components/dashboard-active-link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";
import { DashboardLatestBudgetLink } from "@/components/dashboard-latest-budget-link";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const links: DashboardLink[] = [
    {
      href: "/dashboard",
      name: "Dashboard",
      icon: <DashboardIcon className="size-6 md:size-5" />,
    },
  ];

  return (
    <TooltipProvider>
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
            {links.map((link) => (
              <Tooltip key={link.href}>
                <TooltipTrigger>
                  <DashboardActiveLink route={link} />
                </TooltipTrigger>
                <TooltipContent side="right">{link.name}</TooltipContent>
              </Tooltip>
            ))}
            <DashboardLatestBudgetLink />
          </nav>
          <nav className="mt-auto grid gap-1 p-2">
            <LocaleToggle />
            <ModeToggle />

            <form action={signOut}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-auto rounded-lg"
                    aria-label="Help"
                  >
                    <LogOut className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Sign Out</TooltipContent>
              </Tooltip>
            </form>
          </nav>
        </aside>
        <div className="">
          <header className="flex sticky z-10 left-0 w-full top-0 h-[53px] items-center justify-between gap-1 border-b bg-background px-4">
            <Logo />
            <nav className="md:hidden flex items-center gap-4">
              <LocaleToggle />
              <ModeToggle />

              <form action={signOut}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Help">
                      <LogOut className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Sign Out</TooltipContent>
                </Tooltip>
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
              </nav>
            </div>
          </footer>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DashboardLayout;
