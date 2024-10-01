import { Footer } from "@/components/footer";
import { Header, HeaderSkeleton } from "@/components/header";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

const LandingLayout = (props: Props) => {
  unstable_setRequestLocale(props.params.locale);

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
