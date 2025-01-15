import { Ellipsis, Loader } from "lucide-react";
import { Card } from "./ui/card";

type Props = {
  onClick: () => void;
  isLoading: boolean;
};

export const LoadMoreBudgetsButton = (props: Props) => {
  return (
    <button onClick={props.onClick}>
      <Card className="flex items-center h-full justify-center min-h-36">
        {props.isLoading ? (
          <Loader className="h-6 w-6 animate-spin" />
        ) : (
          <Ellipsis />
        )}
      </Card>
    </button>
  );
};
