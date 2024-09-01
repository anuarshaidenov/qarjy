import { HowItWorksWrapper } from "./how-it-works-wrapper";
import { Fifty2030HowItWorks } from "./fifty-20-30-how-it-works";
import { Seventyfive1015HowItWorks } from "./seventyfive-10-15-how-it-works";

type Props = {};

export const HowItWorks = (props: Props) => {
  return (
    <section id="how-it-works" className="py-16 container min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-10">How it works</h2>
      <HowItWorksWrapper
        fifty3020content={<Fifty2030HowItWorks />}
        seventyfive1015content={<Seventyfive1015HowItWorks />}
      />
    </section>
  );
};
