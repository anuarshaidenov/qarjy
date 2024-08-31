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
import { LOCALSTORAGE_KEYS } from "@/lib/constants";

const nonEssentialsFormSchema = z.object({
  nonEssentialExpenseName: z.string(),
  nonEssentialExpenseAmount: z.string(),
});

type Props = {};

export const AddNonEssentialExpense = (props: Props) => {
  const { budget, setBudget } = useFifty2030();
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

    const newBudget = {
      ...budget,
      nonEssentialExpenses: [
        ...budget.nonEssentialExpenses,
        {
          id: crypto.randomUUID(),
          name: data.nonEssentialExpenseName,
          amount: amount,
        },
      ],
    };

    setBudget(newBudget);
    localStorage.setItem(
      LOCALSTORAGE_KEYS.fifty3020budget,
      JSON.stringify(newBudget)
    );

    nonEssentialsForm.reset();
    nonEssentialsForm.setFocus("nonEssentialExpenseName");
  };

  return (
    <Form {...nonEssentialsForm}>
      <form
        onSubmit={nonEssentialsForm.handleSubmit(onNonEssentialsSubmit)}
        className="flex flex-col md:flex-row w-full items-center justify-between gap-2"
      >
        <FormField
          name="nonEssentialExpenseName"
          render={({ field }) => (
            <FormItem className="space-y-1 w-full md:w-auto">
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="Name"
                  className="shrink w-full md:w-[120px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FormField
            name="nonEssentialExpenseAmount"
            render={({ field }) => (
              <FormItem className="space-y-1 w-full md:w-auto">
                <FormControl>
                  <NumericFormat
                    autoComplete="off"
                    customInput={Input}
                    className="shrink w-full md:w-[120px]"
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
