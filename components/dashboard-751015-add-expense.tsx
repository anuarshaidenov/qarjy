"use client";

import { Input } from "./ui/input";
import { NumericFormat } from "./ui/numeric-format";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useAddExpense } from "@/hooks/use-add-expense";
import { useParams } from "next/navigation";
import { formatAmount } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().max(14, "Title is too long").min(1, "Title is required"),
  amount: z.string(),
});

type Props = {};

export const Dashboard751015AddExpense = (props: Props) => {
  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: "",
    },
  });
  const { mutate, isPending } = useAddExpense();

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(
      {
        budgetId: params.id as string,
        name: values.title,
        amount: formatAmount(values.amount),
        type: "overall",
      },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex md:flex-row flex-col w-full items-center justify-between gap-2"
      >
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder={"Title"}
                  className="shrink w-full md:w-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FormField
            control={form.control}
            name={"amount"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NumericFormat
                    autoComplete="off"
                    className="shrink w-full md:w-[120px]"
                    placeholder={"Amount"}
                    thousandSeparator=","
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button disabled={isPending} size={"icon"} className="shrink-0">
            <PlusIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
};
