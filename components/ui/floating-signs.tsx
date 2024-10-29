import { DollarSign, EuroSign, PoundTown, YenSign } from "../shapes";

type Props = {};

export const FloatingSigns = (props: Props) => {
  return (
    <>
      <PoundTown className="bottom-[100px] left-[12%] absolute" />
      <DollarSign className="top-[100px] right-[10%] md:w-[50px] md:h-[100px]  absolute" />
      <EuroSign className="bottom-[500px] left-[8%] absolute" />
      <YenSign className="bottom-[100px] right-[15%] absolute" />
    </>
  );
};
