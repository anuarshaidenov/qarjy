import { Skeleton } from "@/components/ui/skeleton";
import { Loader, Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const ProfileLoadingState = (props: Props) => {
  return (
    <section className="py-8 px-4 container flex flex-col gap-4">
      <Skeleton className="w-full max-w-[300px] h-[39.59px] mb-8" />
      <Skeleton className="w-full max-w-[385px] h-[342px]" />
    </section>
  );
};

export default ProfileLoadingState;
