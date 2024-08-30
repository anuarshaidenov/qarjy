"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { NumericFormat } from "react-number-format";

type Props = {};

export const AppSection = (props: Props) => {
  const tabs = [
    {
      value: "503020",
      name: "50-30-20 Rule",
    },
    {
      value: "751015",
      name: "75-10-15 Rule",
    },
  ];

  return (
    <div className="w-full mx-auto flex flex-col md:grid md:grid-cols-2 gap-10">
      <Tabs defaultValue={tabs[0].value}>
        <TabsList className="grid grid-cols-2">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="503020">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">50-30-20 rule</h2>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="space-y-1">
                  <Label htmlFor="monthly-income">Monthly income</Label>
                  <NumericFormat
                    customInput={Input}
                    id="monthly-income"
                    placeholder="20000 KZT"
                    thousandSeparator=","
                  />
                </div>
                <h4 className="text-lg font-semibold mt-4">
                  Essential expenses / needs
                </h4>
                <div className="flex gap-2 items-end">
                  <div className="space-y-1">
                    <Label htmlFor="expense-name">Expense</Label>
                    <Input id="expense-name" placeholder="Food, rent, etc" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="expense-amount">Amount</Label>
                    <NumericFormat
                      customInput={Input}
                      id="expense-amount"
                      placeholder="1000 KZT"
                      thousandSeparator=","
                    />
                  </div>
                  <Button>Add</Button>
                </div>
                <h4 className="text-lg font-semibold mt-4">
                  Non-essential expenses / wants
                </h4>
                <div className="flex gap-2 items-end">
                  <div className="space-y-1">
                    <Label htmlFor="expense-name">Expense</Label>
                    <Input id="expense-name" placeholder="Outings, etc" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="expense-amount">Amount</Label>
                    <NumericFormat
                      customInput={Input}
                      id="expense-amount"
                      placeholder="1000 KZT"
                      thousandSeparator=","
                    />
                  </div>
                  <Button>Add</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="">
        <CardHeader>
          <h2 className="text-lg font-semibold">Results</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <Label>Your monthly income:</Label>
            <p className="font-semibold">20000 KZT</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-between w-full">
              <Label>Essential expenses / needs (50%):</Label>
              <p className="font-semibold">1000 KZT</p>
            </div>
            <ul className="text-sm w-full">
              <li className="flex items-center justify-between w-full">
                <span>Food</span> <span>1000 KZT</span>
              </li>
              <li className="flex items-center justify-between w-full">
                <span>Food</span> <span>1000 KZT</span>
              </li>
              <li className="flex items-center justify-between w-full">
                <span>Food</span> <span>1000 KZT</span>
              </li>
              <li className="flex items-center justify-between w-full">
                <span>Food</span> <span>1000 KZT</span>
              </li>
            </ul>
          </div>

          <span className="text-red-700 text-end font-semibold text-sm mb-4">
            -3000 KZT
          </span>

          <div className="flex flex-col gap-2 items-start justify-between">
            <div className="flex items-center justify-between w-full">
              <Label>Wants (30%):</Label>
              <p className="font-semibold">1000 KZT</p>
            </div>
            <ul className="text-sm w-full">
              <li className="flex items-center justify-between w-full">
                <span>Food</span> <span>1000 KZT</span>
              </li>
              <li className="flex items-center justify-between w-full">
                <span>Food</span> <span>1000 KZT</span>
              </li>
              <li className="flex items-center justify-between w-full">
                <span>Food</span> <span>1000 KZT</span>
              </li>
              <li className="flex items-center justify-between w-full">
                <span>Food</span> <span>1000 KZT</span>
              </li>
            </ul>
          </div>
          <span className="text-green-700 text-end font-semibold text-sm mb-4">
            +32000 KZT
          </span>
          <div className="flex flex-col gap-2 items-start justify-between">
            <div className="flex items-center justify-between w-full">
              <Label>Savings / investments (20%):</Label>
              <p className="font-semibold">1000 KZT</p>
            </div>
            <p className="text-sm">
              Keep this money in your savings account or in your investments.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
