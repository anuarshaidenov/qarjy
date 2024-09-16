import React from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {};

export const HomepageSkeleton = (props: Props) => {
  return <Skeleton className="h-[200vh]" />;
};
