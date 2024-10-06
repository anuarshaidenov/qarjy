"use client";

import { forwardRef, ReactNode } from "react";
import { Button } from "./ui/button";
import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";

export type DashboardLink = {
  icon: ReactNode;
  name: string;
  href: string;
  tooltip?: ReactNode;
};

export type DashboardActiveLinkProps = {
  route: {
    icon: ReactNode;
    name: string;
    href: string;
  };
  className?: string;
};

export const DashboardActiveLink = forwardRef<
  HTMLButtonElement,
  DashboardActiveLinkProps
>(({ route, className }, ref) => {
  const pathname = usePathname();

  const isActive = pathname === route.href;

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-lg hover:bg-transparent md:hover:bg-accent",
        {
          "bg-accent text-accent-foreground hover:bg-accent": isActive,
        },
        className
      )}
      aria-label={route.name}
      asChild
    >
      <Link href={route.href}>{route.icon}</Link>
    </Button>
  );
});

DashboardActiveLink.displayName = "DashboardActiveLink";
