import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import React from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {};

export const DashboardAuthInfo = async (props: Props) => {
  const t = await getTranslations();
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  return (
    <>
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        {t("hello")}{" "}
        {userData.user?.user_metadata?.full_name?.split(" ")[0] ||
          userData.user?.email}
      </h1>

      <p className="text-xs md:text-sm font-light text-muted-foreground mb-8">
        {t("dashboard.description")}
      </p>
    </>
  );
};

export const DashboardAuthInfoSkeleton = () => (
  <>
    <Skeleton className="w-full md:w-[385px] h-[36px] md:h-[48px]" />

    <Skeleton className="w-full h-[64px] md:h-[24px] mb-8" />
  </>
);
