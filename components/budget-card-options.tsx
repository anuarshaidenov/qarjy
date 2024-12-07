"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Ellipsis, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useDeleteBudget } from "@/hooks/use-delete-budget";

type Props = {
  triggerClassname?: string;
  budgetId: string;
};

export const BudgetCardOptions = (props: Props) => {
  const { mutate, isPending } = useDeleteBudget();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutate(props.budgetId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className={cn(props.triggerClassname)}
        >
          <Ellipsis className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={handleDelete}
          className="bg-red-700 flex items-center justify-between"
        >
          Delete <Trash className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
