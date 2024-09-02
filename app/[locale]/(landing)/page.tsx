import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { SignupSection } from "@/components/sign-up-section";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <SignupSection /> */}
      <HowItWorks />
      <TestimonialsSection />
    </>
  );
}
