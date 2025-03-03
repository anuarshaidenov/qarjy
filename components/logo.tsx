import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
  href?: string;
};

export const Logo = ({ className = "", href = "/" }: Props) => {
  return (
    <Link className={cn("text-xl font-mono", className)} href={href}>
      💸 qarjy
    </Link>
  );
};
