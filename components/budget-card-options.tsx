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
import { Copy, Ellipsis, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { deleteBudget } from "@/actions/delete-budget";
import { duplicateBudget } from "@/actions/duplicate-budget";
import { useToast } from "@/hooks/use-toast";

type Props = {
  triggerClassname?: string;
  budgetId: string;
  onLoadStart?: () => void;
  onLoad?: () => void;
};

export const BudgetCardOptions = (props: Props) => {
  const { toast } = useToast();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Deleting budget",
      description: "Please wait",
      variant: "default",
    });

    props.onLoadStart?.();

    const { data, error } = await deleteBudget(props.budgetId);

    if (data) {
      toast({
        title: "Budget deleted",
        description: "Your budget has been deleted",
        variant: "default",
      });
    }

    if (error) {
      toast({
        title: "Error deleting budget",
        description: error.message,
        variant: "destructive",
      });
    }

    props.onLoad?.();
  };

  const handleDuplicate = async (e: React.MouseEvent) => {
    e.stopPropagation();

    toast({
      title: "Duplicating budget",
      description: "Please wait",
      variant: "default",
    });

    props.onLoadStart?.();

    const { data, error } = await duplicateBudget(props.budgetId);

    if (data) {
      toast({
        title: "Budget duplicated",
        description: "Your budget has been duplicated",
        variant: "default",
      });
    }

    if (error) {
      toast({
        title: "Error duplicating budget",
        description: error.message,
        variant: "destructive",
      });
    }

    props.onLoad?.();
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
            onClick={handleDuplicate}
            className="w-full justify-between cursor-pointer"
          >
            Duplicate <Copy className="size-4" />
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="hover:bg-red-700 focus:bg-red-700 cursor-pointer hover:text-white focus:text-white flex items-center justify-between"
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
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
};
