import { useFifty2030 } from "@/hooks/use-fifty-20-30";
import { Input } from "./ui/input";
import { NumericFormat } from "react-number-format";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formatAmount } from "@/lib/utils";

const essentialsFormSchema = z.object({
  essentialExpenseName: z.string(),
  essentialExpenseAmount: z.string(),
});

type Props = {};

export const AddEssentialExpense = (props: Props) => {
  const { budget, setBudget } = useFifty2030();
  const essentialsForm = useForm<z.infer<typeof essentialsFormSchema>>({
    resolver: zodResolver(essentialsFormSchema),
    defaultValues: {
      essentialExpenseName: "",
      essentialExpenseAmount: "",
    },
  });

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

    setBudget({
      ...budget,
      essentialExpenses: [
        ...budget.essentialExpenses,
        {
          id: crypto.randomUUID(),
          name: data.essentialExpenseName,
          amount: amount,
        },
      ],
    });

    essentialsForm.reset();
    essentialsForm.setFocus("essentialExpenseName");
  };

  return (
    <Form {...essentialsForm}>
      <form
        onSubmit={essentialsForm.handleSubmit(onEssentialsSubmit)}
        className="flex w-full items-center justify-between gap-2"
      >
        <FormField
          name="essentialExpenseName"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormControl>
                <Input
                  placeholder="Name"
                  className="shrink w-[120px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <FormField
            name="essentialExpenseAmount"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <NumericFormat
                    customInput={Input}
                    className="shrink w-[120px]"
                    placeholder="Amount"
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
