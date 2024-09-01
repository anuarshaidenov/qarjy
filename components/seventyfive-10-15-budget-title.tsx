"use client";

import React from "react";
import { Input } from "./ui/input";
import { useSeventyFive1015 } from "@/hooks/use-seventyfive-10-15";

type Props = {};

export const SeventyFive1015BudgetTitle = (props: Props) => {
  const { budget, setBudget, setBudgetToLocalStorage } = useSeventyFive1015();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBudget = {
      ...budget,
      title: e.target.value,
    };
    setBudget(newBudget);
    setBudgetToLocalStorage(newBudget);
  };

  return (
    <Input
      value={budget?.title}
      onChange={handleChange}
      className="md:text-2xl font-semibold"
    ></Input>
  );
};
