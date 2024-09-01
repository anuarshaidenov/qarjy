import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { SignupSection } from "@/components/sign-up-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <SignupSection /> */}
      <HowItWorks />
    </>
  );
}
