"use client";

import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { NumericFormat } from "./ui/numeric-format";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CircleBackslashIcon, PlusIcon } from "@radix-ui/react-icons";
import { Dashboard503020Title } from "./dashboard-504020-title";

type Props = {};

export const Dashboard503020Card = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <Dashboard503020Title />
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
              <Label className="md:text-lg font-semibold">
                Essential expenses
              </Label>
              <p className="font-semibold shrink-0">2133131 ₸</p>
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
                    className="shrink-0 md:hidden group-hover:flex transition-opacity"
                    variant={"destructive"}
                    size={"icon"}
                  >
                    <CircleBackslashIcon />
                  </Button>
                </div>
              </li>
            </ul>
            <form className="flex md:flex-row flex-col w-full items-center justify-between gap-2">
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
            <span className="md:text-lg font-semibold">Remainder</span>
            <span className={cn("text-end font-semibold shrink-0")}>
              313131331 ₸
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b pb-4">
          <div className="flex flex-col gap-2 items-start justify-between">
            <div className="flex items-center justify-between w-full">
              <Label className="md:text-lg font-semibold">Non essential</Label>
              <p className="font-semibold shrink-0">2133131 ₸</p>
            </div>
            <ul className="text-sm w-full">
              <li className="flex items-center py-1 justify-between w-full group">
                <span>Netflix</span>
                <div className="flex shrink grow-0 items-center gap-2">
                  <NumericFormat
                    thousandSeparator=","
                    className="md:w-[120px] w-[80px]"
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
            <span className="md:text-lg font-semibold">Remainder</span>
            <span
              className={cn("text-end font-semibold shrink-0", {
                // "text-green-700": nonEssentialsDifference > 0,
                // "text-destructive": nonEssentialsDifference < 0,
              })}
            >
              311331 ₸
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <Label className="md:text-lg font-semibold">Savings</Label>
            <p className="font-semibold shrink-0">313131331 ₸</p>
          </div>
          <p className="text-sm">Descriptione</p>
        </div>
      </CardContent>
    </Card>
  );
};
