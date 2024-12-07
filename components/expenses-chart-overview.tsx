'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useGetExpensesOverview } from '@/hooks/use-get-exenses-overview';
import { Skeleton } from './ui/skeleton';
import { formatNumberWithCommas } from '@/lib/utils';

type Props = {
  expenseType?: 'essential' | 'non-essential' | 'overall' | 'draft';
  title?: string;
};

const chartConfig = {
  desktop: {
    label: 'Spent',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export const ExpensesChartOverview = ({ expenseType, title }: Props) => {
  const { data, isLoading } = useGetExpensesOverview({
    expenseType,
  });

  const chartData = data?.data?.map((budget) => ({
    budget: budget.title,
    spent: budget.totalExpenses,
  }));

  if (isLoading) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              //   tickMargin={8}
              dataKey="budget"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(x) => formatNumberWithCommas(x)}
              tickSize={1}
            />
            <Line
              dataKey="spent"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
};
