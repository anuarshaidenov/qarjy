import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { useUpdateBudgetTitle } from "@/hooks/use-update-budget-title";

type Props = {};

export const Dashboard503020Title = (props: Props) => {
  const { title, isLoading, setTitle } = useUpdateBudgetTitle();

  if (isLoading) {
    return <Skeleton className="h-9 w-full" />;
  }

  return (
    <Input
      className="md:text-2xl font-semibold"
      placeholder={"Budget title"}
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
    />
  );
};
