import { BudgetContext } from "@/components/budget-context-provider";
import { useContext } from "react";

export const useFifty2030 = () => {
  const { budget, setBudget } = useContext(BudgetContext);

  return {
    budget,
    setBudget,
  };
};
