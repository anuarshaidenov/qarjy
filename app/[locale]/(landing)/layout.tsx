import { Footer } from "@/components/footer";
import { Header, HeaderSkeleton } from "@/components/header";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const LandingLayout = async (props: Props) => {
  setRequestLocale((await props.params).locale);

  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      <main className="h-full grow">{props.children}</main>

      <Footer />
    </>
  );
};

export default LandingLayout;
