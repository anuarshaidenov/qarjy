'use client';

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
} from '@/components/ui/alert-dialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Copy, Ellipsis, Trash } from 'lucide-react';
import { Button } from './ui/button';
import { deleteBudget } from '@/actions/delete-budget';
import { duplicateBudget } from '@/actions/duplicate-budget';

type Props = {
  triggerClassname?: string;
  budgetId: string;
};

export const BudgetCardOptions = (props: Props) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteBudget(props.budgetId);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateBudget(props.budgetId);
  };

  return (
    <DropdownMenu>
      <AlertDialog>
        <DropdownMenuTrigger asChild>
          <Button
            size={'icon'}
            variant={'ghost'}
            className={cn(props.triggerClassname)}
          >
            <Ellipsis className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={handleDuplicate}
            className="w-full justify-between"
          >
            Duplicate <Copy className="size-4" />
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="hover:bg-red-700 focus:bg-red-700 cursor-pointer text-white hover:text-white focus:text-white flex items-center justify-between"
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
