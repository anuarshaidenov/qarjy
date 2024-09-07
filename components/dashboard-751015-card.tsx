import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { NumericFormat } from "./ui/numeric-format";
import { Button } from "./ui/button";
import { CircleBackslashIcon, PlusIcon } from "@radix-ui/react-icons";
import { Dashboard751015CardTitle } from "./dashboard-751015-title";

type Props = {};

export const Dashboard751015Card = (props: Props) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start gap-2 justify-between">
          <Dashboard751015CardTitle />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex items-center w-full border-b pb-4">
          <Label className="md:text-lg font-semibold grow" id="monthly-income">
            Monthly Income
          </Label>
          <div className="shrink max-w-[180px] flex items-center gap-2">
            <NumericFormat
              autoComplete="off"
              className="md:text-lg font-semibold"
              id="monthly-income"
              thousandSeparator=","
            />
            <span>₸</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-4 border-b">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">Expenses</Label>
              <p className="font-semibold shrink-0">133313 ₸</p>
            </div>
            <ul className="text-sm w-full">
              <li className="flex items-center py-1 justify-between w-full group">
                <span>Food</span>
                <div className="flex shrink grow-0 items-center  gap-2">
                  <NumericFormat
                    thousandSeparator=","
                    className="md:w-[120px] w-[80px]"
                    autoComplete="off"
                  />
                  <span className="md:flex hidden md:group-hover:hidden text-lg">
                    ₸
                  </span>
                  <Button
                    className="shrink-0 md:hidden md:group-hover:flex transition-opacity"
                    variant={"destructive"}
                    size={"icon"}
                  >
                    <CircleBackslashIcon />
                  </Button>
                </div>
              </li>
            </ul>

            <form className="flex flex-col md:flex-row w-full items-center justify-between gap-2">
              <Input
                autoComplete="off"
                placeholder={"Title"}
                className="shrink w-full md:w-[120px]"
              />

              <div className="flex items-center gap-2 w-full md:w-auto">
                <NumericFormat
                  autoComplete="off"
                  className="shrink w-full md:w-[120px]"
                  placeholder={"Amount"}
                  thousandSeparator=","
                />

                <Button size={"icon"} className="shrink-0">
                  <PlusIcon />
                </Button>
              </div>
            </form>
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="md:text-lg font-semibold">{"Remainder"}</span>
            <span
              className={cn("text-end shrink-0 font-semibold", {
                // "text-green-700": expensesDifference > 0,
                // "text-destructive": expensesDifference < 0,
              })}
            >
              2211 ₸
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start justify-between pb-4 border-b">
          <div className="flex items-center justify-between w-full">
            <Label className="md:text-lg font-semibold">Cushion Fund</Label>
            <p className="font-semibold shrink-0">2112 ₸</p>
          </div>
          <p className="text-sm">Descriptione</p>
        </div>
        <div className="flex flex-col gap-2 items-start justify-between pb-4">
          <div className="flex items-center justify-between w-full">
            <Label className="md:text-lg font-semibold">Savings</Label>
            <p className="font-semibold shrink-0">3313131 ₸</p>
          </div>
          <p className="text-sm">Descriptione</p>
        </div>
      </CardContent>
    </Card>
  );
};
