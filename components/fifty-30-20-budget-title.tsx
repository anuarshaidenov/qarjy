"use client";

import React from "react";
import { Input } from "./ui/input";
import { useFifty2030 } from "@/hooks/use-fifty-20-30";
import { LOCALSTORAGE_KEYS } from "@/lib/constants";

type Props = {};

export const Fifty3020BudgetTitle = (props: Props) => {
  const { budget, setBudget } = useFifty2030();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBudget = {
      ...budget,
      title: e.target.value,
    };
    setBudget(newBudget);
    localStorage.setItem(
      LOCALSTORAGE_KEYS.fifty3020budget,
      JSON.stringify(newBudget)
    );
  };

  return (
    <Input
      value={budget?.title}
      onChange={handleChange}
      className="md:text-2xl font-semibold"
    ></Input>
  );
};
