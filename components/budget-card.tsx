import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "@/navigation";

type Props = {
  current?: boolean;
};

export const BudgetCard = ({ current }: Props) => {
  return (
    <Link href="/dashboard/monthly-budget">
      <Card className="hover:border-foreground/50 transition-colors">
        <CardHeader>
          <CardTitle>September Budget</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="space-y-1">
            <p>
              Monthly income: <span className="font-bold">1,000,000</span>
            </p>
            <p>
              Remaining balance: <span className="font-bold">1,000,000</span>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          {current ? (
            <CardDescription className="text-green-700">
              Current
            </CardDescription>
          ) : (
            <CardDescription className="text-green-700 opacity-0">
              Not current
            </CardDescription>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};
