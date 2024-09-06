import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "@/navigation";

type Props = {};

export const BudgetCard = (props: Props) => {
  return (
    <Link href="/dashboard/monthly-budget">
      <Card className="md:hover:bg-foreground/20 transition-colors">
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
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
};
