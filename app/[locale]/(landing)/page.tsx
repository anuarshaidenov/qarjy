import { AppSection } from "@/components/app-section";
import { CtaSection } from "@/components/cta-section";
import { DashboardSection } from "@/components/dashboard-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import {
  ScrollOpacityProvider,
  ScrollWrapper,
  ScrollYProgressProvider,
} from "@/components/ui/scroll-wrapper";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Home({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <ScrollYProgressProvider>
        <ScrollOpacityProvider>
          <ScrollWrapper className="relative">
            <HeroSection />
            <section className="pb-72 pt-12 relative container">
              <AppSection />
            </section>
          </ScrollWrapper>
        </ScrollOpacityProvider>
      </ScrollYProgressProvider>

      <HowItWorks />
      <DashboardSection />
      <CtaSection />
    </>
  );
}
