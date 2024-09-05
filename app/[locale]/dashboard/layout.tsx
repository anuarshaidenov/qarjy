import { Calendar, Home, LogOut } from "lucide-react";
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

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const links: DashboardLink[] = [
    {
      href: "/dashboard",
      name: "Dashboard",
      icon: <DashboardIcon className="size-5" />,
    },
    {
      href: "/dashboard/monthly-budget",
      name: "Monthly Budget",
      icon: <Calendar className="size-5" />,
    },
  ];

  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[53px]">
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
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
          </nav>
          <nav className="mt-auto grid gap-1 p-2">
            <LocaleToggle />

            <form action={signOut}>
              <Tooltip>
                <TooltipTrigger>
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
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold font-mono">💸 qarjy</h1>
          </header>
          <main className="grid flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DashboardLayout;
