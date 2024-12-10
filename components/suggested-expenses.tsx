"use client";

import { useGetSuggestedExpenses } from "@/hooks/use-get-suggested-expenes";
import { useCurrency } from "./currency-provider";
import { formatNumberWithCommas } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAddExpense } from "@/hooks/use-add-expense";
import { useParams } from "next/navigation";

type Props = {
  expenseType: "essential" | "non-essential" | "overall" | "draft";
};

export const SuggestedExpenses = (props: Props) => {
  const [pageOptions, setPageOptions] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading } = useGetSuggestedExpenses(pageOptions);
  const params = useParams();
  const budgetId = params.id as string;
  const { mutate } = useAddExpense();
  const [filteredExpenses, setFilteredExpenses] = useState<
    {
      id: string;
      name: string;
      amount: number;
    }[]
  >([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setFilteredExpenses([...data.data]);
  }, [data, setFilteredExpenses]);

  const { currency } = useCurrency();

  const handleClick = (expense: {
    id: string;
    name: string;
    amount: number;
  }) => {
    mutate({
      budgetId: budgetId,
      name: expense.name,
      amount: expense.amount,
      type: props.expenseType,
    });

    setFilteredExpenses((prev) => {
      return prev.filter((item) => item.id !== expense.id);
    });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filteredExpenses.map((expense, i) => (
        <button
          key={i}
          onClick={() => handleClick(expense)}
          className="p-1 text-xs rounded-lg border bg-card text-card-foreground shadow hover:border-foreground/50 transition-colors"
        >
          {expense.name} {formatNumberWithCommas(expense.amount)}{" "}
          {currency.symbol}
        </button>
      ))}
      {/* {
        // if has more
        data?.hasMore && (
          <button
            className="p-1 cursor-pointer text-xs rounded-lg border bg-card text-card-foreground shadow hover:border-foreground/50 transition-colors"
            onClick={() =>
              setPageOptions((prev) => ({
                ...prev,
                pageSize: prev.pageSize + 10,
              }))
            }
          >
            Show more
          </button>
        )
      } */}
    </div>
  );
};