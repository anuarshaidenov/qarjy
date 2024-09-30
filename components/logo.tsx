import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import React from "react";

type Props = {
  className?: string;
  href?: string;
};

export const Logo = ({ className = "", href = "/" }: Props) => {
  return (
    <Link className={cn("text-xl ", className)} href={href}>
      💸 qarjy
    </Link>
  );
};
