"use client";

import { useSeventyFive1015 } from "@/hooks/use-seventyfive-10-15";
import { Input } from "./ui/input";
import { NumericFormat } from "react-number-format";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formatAmount } from "@/lib/utils";
import { useTranslations } from "next-intl";

const expensesFormSchema = z.object({
  expenseName: z.string(),
  expenseAmount: z.string(),
});

type Props = {};

export const Seventyfive1015AddExpense = (props: Props) => {
  const { budget, setBudget, setBudgetToLocalStorage } = useSeventyFive1015();

  const expensesForm = useForm<z.infer<typeof expensesFormSchema>>({
    resolver: zodResolver(expensesFormSchema),
    defaultValues: {
      expenseName: "",
      expenseAmount: "",
    },
  });

  const onExpensesSubmit = async (data: z.infer<typeof expensesFormSchema>) => {
    const amount = formatAmount(data.expenseAmount);
    if (!amount) {
      expensesForm.setError("expenseAmount", {
        message: "Amount is required",
      });
      return;
    }

    const newBudget = {
      ...budget,
      expenses: [
        ...budget.expenses,
        {
          id: crypto.randomUUID(),
          name: data.expenseName,
          amount: amount,
        },
      ],
    };

    setBudget(newBudget);
    setBudgetToLocalStorage(newBudget);
    expensesForm.reset();
    expensesForm.setFocus("expenseName");
  };

  const t = useTranslations("home.app.tab-content.751015");

  return (
    <Form {...expensesForm}>
      <form
        onSubmit={expensesForm.handleSubmit(onExpensesSubmit)}
        className="flex flex-col md:flex-row w-full items-center justify-between gap-2"
      >
        <FormField
          name="expenseName"
          render={({ field }) => (
            <FormItem className="space-y-1 w-full md:w-auto">
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder={t("add-expenses.placeholder-title")}
                  className="shrink w-full md:w-[120px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FormField
            name="expenseAmount"
            render={({ field }) => (
              <FormItem className="space-y-1 w-full md:w-auto">
                <FormControl>
                  <NumericFormat
                    autoComplete="off"
                    customInput={Input}
                    className="shrink w-full md:w-[120px]"
                    placeholder={t("add-expenses.placeholder-amount")}
                    thousandSeparator=","
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button size={"icon"} className="shrink-0">
            <PlusIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
};
