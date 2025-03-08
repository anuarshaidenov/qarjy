import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { OpacityWrapper } from "./ui/scroll-wrapper";
import { FloatingSigns } from "./ui/floating-signs";
import { BlurFade } from "./ui/blur-fade";
import { ArrowRight } from "lucide-react";

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
    <div className="container relative top-0 left-0 overflow-hidden">
      <FloatingSigns />
      <OpacityWrapper className="py-32 overflow-hidden flex flex-col items-center gap-6 container">
        <BlurFade inView delay={0}>
          <h1 className="flex flex-col items-center text-center text-5xl md:text-8xl font-bold justify-center gap-1 flex-wrap md:gap-4">
            <div className="group relative flex items-center">
              <span className="group-hover:text-primary/70 transition-colors text-primary">
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
        </BlurFade>

        <BlurFade inView delay={0.2}>
          <p className="text-center text-muted-foreground text-lg md:text-2xl max-w-[450px]">
            {t("subtitle")}
          </p>
        </BlurFade>

        <BlurFade inView delay={0.4}>
          <div className="flex flex-col mt-4 gap-2">
            <Button className="w-56" asChild>
              <Link href={"/signup"}>
                {t("button-get-started")} <ArrowRight className="size-5 ml-2" />
              </Link>
            </Button>
            <Button className="w-56" variant={"secondary"} asChild>
              <Link href={"#how-it-works"}>{t("button")}</Link>
            </Button>
          </div>
        </BlurFade>
      </OpacityWrapper>
    </div>
  );
};
