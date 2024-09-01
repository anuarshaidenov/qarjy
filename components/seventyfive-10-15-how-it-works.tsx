import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { getTranslations } from "next-intl/server";

type Props = {};

export const Seventyfive1015HowItWorks = async (props: Props) => {
  const t = await getTranslations("home");

  return (
    <div className="flex flex-col items-start gap-4 pl-8 border-l">
      <h3 className="text-xl md:text-4xl relative font-semibold font-mono before:absolute before:inline-flex before:size-8 before:items-center before:justify-center before:rounded-full before:border-2 before:border-background before:bg-muted before:text-center before:content-['1'] before:text-sm before:-left-12 before:-top-2">
        {t("how-it-works.steps.751015.step-1.title")}
      </h3>
      <p className="md:text-lg">
        {t("how-it-works.steps.751015.step-1.description")}
      </p>
      <Card className="max-w-[500px] w-full mb-10">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex items-center w-full pb-4">
            <Label
              className="md:md:text-lg font-semibold grow"
              id="monthly-income"
            >
              {t("app.tab-content.751015.monthly-income")}
            </Label>
            <div className="shrink max-w-[180px] flex items-center gap-2">
              <Input
                autoComplete="off"
                className="md:md:text-lg font-semibold"
                id="monthly-income"
                value={"1,000,000"}
              />
              <span>KZT</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <h3 className="text-xl md:text-4xl relative font-semibold font-mono before:absolute before:inline-flex before:size-8 before:items-center before:justify-center before:rounded-full before:border-2 before:border-background before:bg-muted before:text-center before:content-['2'] before:text-sm before:-left-12 before:-top-2">
        {t("how-it-works.steps.751015.step-2.title")}
      </h3>
      <p className="md:text-lg">
        {t("how-it-works.steps.751015.step-2.description")}
      </p>
      <Card className="max-w-[500px] w-full mb-10">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex md:flex-row flex-col w-full items-center justify-between gap-2">
            <Input
              autoComplete="off"
              placeholder="Name"
              value={"Rent"}
              className="shrink w-full md:w-[120px]"
            />

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Input
                autoComplete="off"
                className="shrink w-full md:w-[120px]"
                placeholder="Amount"
                value={"200,000"}
              />
              <Button size={"icon"} className="shrink-0">
                <PlusIcon />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <h3 className="text-xl md:text-4xl relative font-semibold font-mono before:absolute before:inline-flex before:size-8 before:items-center before:justify-center before:rounded-full before:border-2 before:border-background before:bg-muted before:text-center before:content-['3'] before:text-sm before:-left-12 before:-top-2">
        {t("how-it-works.steps.751015.step-3.title")}
      </h3>
      <p className="md:text-lg">
        {t("how-it-works.steps.751015.step-3.description")}
      </p>
      <Card className="max-w-[500px] w-full mb-12">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 items-start justify-between pb-4 border-b">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">
                {t("app.tab-content.751015.cushion-fund.title")}
              </Label>
              <p className="font-semibold shrink-0">40,000 KZT</p>
            </div>
            <p className="text-sm">
              {t("app.tab-content.751015.cushion-fund.sub-title")}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-start justify-between py-4">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">
                {t("app.tab-content.751015.savings.title")}
              </Label>
              <p className="font-semibold shrink-0">60,000 KZT</p>
            </div>
            <p className="text-sm">
              {t("app.tab-content.751015.savings.sub-title")}
            </p>
          </div>
        </CardContent>
      </Card>
      <h3 className="text-xl md:text-4xl relative font-semibold font-mono before:absolute before:inline-flex before:size-8 before:items-center before:justify-center before:rounded-full before:border-2 before:border-background before:bg-muted before:text-center before:content-['4'] before:text-sm before:-left-12 before:-top-2">
        {t("how-it-works.steps.751015.step-4.title")}
      </h3>
      <p className="md:text-lg">
        {t("how-it-works.steps.751015.step-4.description")}
      </p>
      <Button>{t("how-it-works.steps.751015.step-4.button")}</Button>
    </div>
  );
};
