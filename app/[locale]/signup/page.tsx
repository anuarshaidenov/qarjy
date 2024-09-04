import { signUpWithGoogle } from "@/actions/signup-with-google";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import React from "react";

type Props = {};

const LoginPage = async (props: Props) => {
  const t = await getTranslations();

  return (
    <main className="h-screen">
      <div className="container flex flex-col items-center justify-center gap-8 h-full w-full">
        <h1 className="text-5xl font-bold">{t("signup.title")}</h1>

        <form className="flex flex-col gap-4" action={signUpWithGoogle}>
          <Button>{t("signup.button")}</Button>
          <Button variant={"secondary"} asChild>
            <Link href={"/"}>{t("signup.back-button")}</Link>
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
