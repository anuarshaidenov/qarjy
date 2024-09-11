"use client";

import { useGetExpensesByTypeAndBudgetId } from "@/hooks/use-get-expenses";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "./ui/card";
import { useParams } from "next/navigation";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { useMemo } from "react";
import { formatNumberWithCommas } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { useTranslations } from "next-intl";

type Props = {
  title?: string;
  subtitle?: string;
  expenseType: "essential" | "non-essential" | "overall";
};

export const ExpensesPieChart = (props: Props) => {
  const params = useParams();
  const { data, isLoading } = useGetExpensesByTypeAndBudgetId(
    params.id as string,
    props.expenseType
  );

  const totalAmount = useMemo(() => {
    return data?.reduce((acc, curr) => acc + curr.amount, 0);
  }, [data]);

  const chartConfig = useMemo(
    () =>
      data?.reduce((acc: ChartConfig, item) => {
        acc[item.name] = {
          label: item.name,
        };
        return acc;
      }, {}) as ChartConfig,
    [data]
  );

  const dataWithFill = useMemo(
    () =>
      data?.map((item, index) => {
        return {
          ...item,
          fill: `hsl(var(--chart-${(index % 5) + 1}))`,
        };
      }),
    [data]
  );

  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title || t("expenses-pie-chart.title")}</CardTitle>
        {!!data?.length && (
          <CardDescription>
            {props.subtitle || t("expenses-pie-chart.subtitle")}
          </CardDescription>
        )}
        {!data?.length && (
          <CardDescription className="py-4">
            {t("expenses-pie-chart.no-expenses")}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {isLoading && <Skeleton className="h-[300px] md:h-[290px]" />}
        {!isLoading && !!dataWithFill?.length && (
          <>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square h-full max-h-[300px] md:max-h-[290px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={dataWithFill}
                  dataKey="amount"
                  nameKey="name"
                  innerRadius={80}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {formatNumberWithCommas(totalAmount as number)}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              {t("expenses-pie-chart.total")}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
            <ul className="flex items-center gap-4 flex-wrap">
              {dataWithFill?.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full`}
                    style={{ backgroundColor: item.fill }}
                  ></div>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
};
