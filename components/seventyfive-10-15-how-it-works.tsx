import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

type Props = {};

export const Seventyfive1015HowItWorks = (props: Props) => {
  return (
    <div className="flex flex-col items-start gap-4 pl-8 border-l">
      <h3 className="text-xl md:text-4xl relative font-semibold font-mono before:absolute before:inline-flex before:size-8 before:items-center before:justify-center before:rounded-full before:border-2 before:border-background before:bg-muted before:text-center before:content-['1'] before:text-sm before:-left-12 before:-top-2">
        Enter your monthly income.
      </h3>
      <p className="md:text-lg">
        Put your salary or any other income you have for the month.
      </p>
      <Card className="max-w-[500px] w-full mb-10">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex items-center w-full pb-4">
            <Label
              className="md:md:text-lg font-semibold grow"
              id="monthly-income"
            >
              Your monthly income:
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
        Save your expenses.
      </h3>
      <p className="md:text-lg">
        Save all your expenses. This method is different from 50-30-20, where
        you keep track of all your expenses regardless of whether they are
        essential or non-essential.
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
        Save your non-essential expenses (wants).
      </h3>
      <p className="md:text-lg">
        Save your essential expenses. Usually includes things like outings,
        clothes, netflix subscriptions and so on.
      </p>
      <Card className="max-w-[500px] w-full mb-12">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 items-start justify-between pb-4 border-b">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">
                Cushion fund (10%):
              </Label>
              <p className="font-semibold shrink-0">40,000 KZT</p>
            </div>
            <p className="text-sm">
              Keep this money in case of unexpected expenses.
            </p>
          </div>
          <div className="flex flex-col gap-2 items-start justify-between py-4">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">
                Savings / investments (15%):
              </Label>
              <p className="font-semibold shrink-0">60,000 KZT</p>
            </div>
            <p className="text-sm">
              Keep this money in your savings account or in your investments.
            </p>
          </div>
        </CardContent>
      </Card>
      <h3 className="text-xl md:text-4xl relative font-semibold font-mono before:absolute before:inline-flex before:size-8 before:items-center before:justify-center before:rounded-full before:border-2 before:border-background before:bg-muted before:text-center before:content-['4'] before:text-sm before:-left-12 before:-top-2">
        Divide your money accordingly and start budgeting with us.
      </h3>
      <p className="md:text-lg">
        Keep track of your money and start budgeting with us in your
        personalized dashboard.
      </p>
      <Button>Sign up now</Button>
    </div>
  );
};
