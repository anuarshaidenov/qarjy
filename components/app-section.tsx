"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

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
    <div className="max-w-[500px] w-full mx-auto">
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
                  <Input
                    id="monthly-income"
                    placeholder="20000 KZT"
                    type="number"
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <div className="space-y-1">
                    <Label htmlFor="expense-name">Expense</Label>
                    <Input id="expense-name" placeholder="Food" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="expense-amount">Amount</Label>
                    <Input
                      id="expense-amount"
                      placeholder="1000 KZT"
                      type="number"
                    />
                  </div>
                  <Button>Add</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-4">
        <CardHeader>
          <h2 className="text-lg font-semibold">Results</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label>Your monthly income:</Label>
            <p className="font-semibold">20000 KZT</p>
          </div>
          <div className="flex items-start justify-between">
            <Label>Essential expenses / needs (50%):</Label>
            <ul className="text-sm">
              <li>Food: 1000 KZT</li>
              <li>Food: 1000 KZT</li>
              <li>Food: 1000 KZT</li>
              <li>Food: 1000 KZT</li>
            </ul>
          </div>

          <span className="text-red-400 font-semibold text-sm mb-4">
            3000 KZT deficit
          </span>

          <div className="flex items-start justify-between">
            <Label>Wants (30%):</Label>
            <ul className="text-sm">
              <li>Food: 1000 KZT</li>
              <li>Food: 1000 KZT</li>
              <li>Food: 1000 KZT</li>
              <li>Food: 1000 KZT</li>
            </ul>
          </div>
          <span className="text-green-400 font-semibold text-sm mb-4">
            32000 KZT profit
          </span>
          <div className="flex items-start justify-between">
            <Label>Savings / investments (20%):</Label>
            <ul className="text-sm">
              <li>Food: 1000 KZT</li>
              <li>Food: 1000 KZT</li>
              <li>Food: 1000 KZT</li>
              <li>Food: 1000 KZT</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
