"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const { mutate } = useDeleteBudget();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutate(props.budgetId);
  };

  return (
    <DropdownMenu>
      <AlertDialog>
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
            asChild
            className="bg-red-600 hover:bg-red-700 focus:bg-red-700 cursor-pointer text-white hover:text-white focus:text-white flex items-center justify-between"
          >
            <AlertDialogTrigger
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            >
              Delete <Trash className="size-4" />
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              budget.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-foreground hover:bg-red-700"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
};
