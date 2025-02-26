import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import React from "react";

type Props = {};

const HomePage = async (props: Props) => {
  const t = await getTranslations();
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  return (
    <section className="py-8 px-4 container flex flex-col gap-4">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        {t("hello")}{" "}
        {sessionData?.session?.user.user_metadata.full_name.split(" ")[0]}
      </h1>
    </section>
  );
};

export default HomePage;
