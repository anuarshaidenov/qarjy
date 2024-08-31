"use client";

import React from "react";
import { Input } from "./ui/input";
import { useFifty2030 } from "@/hooks/use-fifty-20-30";

type Props = {};

export const Fifty3020BudgetTitle = (props: Props) => {
  const { budget, setBudget } = useFifty2030();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget({
      ...budget,
      title: e.target.value,
    });
  };

  return (
    <Input
      value={budget?.title}
      onChange={handleChange}
      className="md:text-2xl font-semibold"
    ></Input>
  );
};
