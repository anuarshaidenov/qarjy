"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { NumericFormat } from "react-number-format";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const essentialsFormSchema = z.object({
  essentialExpenseName: z.string(),
  essentialExpenseAmount: z.string(),
});

const nonEssentialsFormSchema = z.object({
  nonEssentialExpenseName: z.string(),
  nonEssentialExpenseAmount: z.string(),
});

type Props = {};

export const Fifty2030Form = (props: Props) => {
  const essentialsForm = useForm<z.infer<typeof essentialsFormSchema>>({
    resolver: zodResolver(essentialsFormSchema),
    defaultValues: {
      essentialExpenseName: "",
      essentialExpenseAmount: "",
    },
  });

  const formatAmount = (amount: string) => {
    return parseInt(amount.split(",").join(""));
  };

  const onEssentialsSubmit = async (
    data: z.infer<typeof essentialsFormSchema>
  ) => {
    const amount = formatAmount(data.essentialExpenseAmount);
    if (!amount) {
      essentialsForm.setError("essentialExpenseAmount", {
        message: "Amount is required",
      });
      return;
    }
    console.log({
      ...data,
      essentialExpenseAmount: amount,
    });
  };
  const nonEssentialsForm = useForm<z.infer<typeof nonEssentialsFormSchema>>({
    resolver: zodResolver(nonEssentialsFormSchema),
    defaultValues: {
      nonEssentialExpenseName: "",
      nonEssentialExpenseAmount: "",
    },
  });
  const onNonEssentialsSubmit = async (
    data: z.infer<typeof nonEssentialsFormSchema>
  ) => {
    const amount = formatAmount(data.nonEssentialExpenseAmount);
    if (!amount) {
      nonEssentialsForm.setError("nonEssentialExpenseAmount", {
        message: "Amount is required",
      });
      return;
    }

    console.log({
      ...data,
      nonEssentialExpenseAmount: amount,
    });
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">50-30-20 rule</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <Label htmlFor="monthly-income">Monthly income</Label>
            <NumericFormat
              customInput={Input}
              id="monthly-income"
              placeholder="20000 KZT"
              thousandSeparator=","
            />
          </div>
          <h4 className="text-lg font-semibold mt-4">
            Essential expenses / needs
          </h4>
          <Form {...essentialsForm}>
            <form
              onSubmit={essentialsForm.handleSubmit(onEssentialsSubmit)}
              className="flex gap-2 items-end"
            >
              <FormField
                name="essentialExpenseName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Expense</FormLabel>
                    <FormControl>
                      <Input placeholder="Food, rent, etc" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="essentialExpenseAmount"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <NumericFormat
                        customInput={Input}
                        placeholder="1000 KZT"
                        thousandSeparator=","
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button>Add</Button>
            </form>
          </Form>

          <h4 className="text-lg font-semibold mt-4">
            Non-essential expenses / wants
          </h4>

          <Form {...nonEssentialsForm}>
            <form
              onSubmit={nonEssentialsForm.handleSubmit(onNonEssentialsSubmit)}
              className="flex gap-2 items-end"
            >
              <FormField
                name="nonEssentialExpenseName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Expense</FormLabel>
                    <FormControl>
                      <Input placeholder="Outings, etc" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="nonEssentialExpenseAmount"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <NumericFormat
                        customInput={Input}
                        placeholder="1000 KZT"
                        thousandSeparator=","
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button>Add</Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
