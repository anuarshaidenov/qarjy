import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeaderSkeleton } from "@/components/header-skeleton";
import { HomepageSkeleton } from "@/components/homepage-skeleton";
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
      <Suspense fallback={<HomepageSkeleton />}>
        <main className="h-full grow">{props.children}</main>
      </Suspense>
      <Footer />
    </>
  );
};

export default LandingLayout;
