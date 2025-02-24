import { AppSection } from "@/components/app-section";
import { CtaSection } from "@/components/cta-section";
import { DashboardSection } from "@/components/dashboard-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { TrustedBySection } from "@/components/trusted-by-section";
import {
  ScrollOpacityProvider,
  ScrollWrapper,
  ScrollYProgressProvider,
} from "@/components/ui/scroll-wrapper";
import { setRequestLocale } from "next-intl/server";

export default async function Home(
  props: Readonly<{ params: Promise<{ locale: string }> }>
) {
  const params = await props.params;

  const { locale } = params;

  setRequestLocale(locale);

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

      <TrustedBySection />
      <HowItWorks />
      <DashboardSection />
      <CtaSection />
    </>
  );
}
