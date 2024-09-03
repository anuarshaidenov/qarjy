import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import React from "react";

type Props = {
  className?: string;
};

export const Logo = ({ className = "" }: Props) => {
  return (
    <Link className={cn("text-xl font-mono", className)} href={"/"}>
      💸 qarjy
    </Link>
  );
};
