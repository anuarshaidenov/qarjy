import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { OpacityWrapper } from "./ui/scroll-wrapper";
import { FloatingSigns } from "./ui/floating-signs";

type Props = {};
interface ItemProps {
  emoji: string;
  position: string;
}
export const HeroSection = async (props: Props) => {
  const t = await getTranslations("home.hero");

  const destinations: ItemProps[] = [
    {
      emoji: "💷",
      position:
        "-left-5 top-2 group-hover:-rotate-[10deg] group-hover:-translate-y-12 md:-left-10 md:-top-2",
    },
    {
      emoji: "💲",
      position:
        "-left-[10px] top-2 group-hover:-rotate-[20deg] group-hover:-translate-x-10 md:-left-[20px] md:top-10",
    },
    {
      emoji: "💸",
      position:
        "left-[100px] top-4  group-hover:rotate-[10deg] group-hover:-translate-y-10 md:left-[300px] md:top-2",
    },
    {
      emoji: "💰",
      position:
        "left-[50px] top-6 group-hover:rotate-[20deg] group-hover:translate-x-16 md:left-[220px] md:top-8",
    },
  ];

  return (
    <div className="overflow-hidden container sticky top-0 left-0">
      <FloatingSigns />
      <OpacityWrapper className=" pt-32 py-64 overflow-hidden flex flex-col items-center gap-6 container">
        <h1 className="flex items-center text-center text-4xl md:text-7xl font-bold justify-center gap-1 flex-wrap md:gap-4">
          <div className="group relative flex items-center">
            <span className="group-hover:text-primary animate-text-zinc-primary text-zinc-500">
              {t("title-highlight")}
            </span>

            <div className="duration-400 absolute inset-0 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100">
              {destinations.map((dest, index) => (
                <span
                  key={index}
                  className={cn(
                    "pointer-events-none absolute transform text-lg transition-transform duration-500 group-hover:scale-110 sm:text-2xl md:text-4xl",
                    dest.position
                  )}
                >
                  {dest.emoji}
                </span>
              ))}
            </div>
          </div>
          <span className=""> {t("title")}.</span>
        </h1>

        <p className="text-center max-w-[450px] font-mono">{t("subtitle")}</p>

        <Button className="mb-10" asChild>
          <Link href={"#how-it-works"}>{t("button")}</Link>
        </Button>
      </OpacityWrapper>
    </div>
  );
};
