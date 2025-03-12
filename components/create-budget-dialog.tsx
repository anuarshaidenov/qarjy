'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateBudgetDialog } from './create-budget-dialog-provider';
import { useToast } from '@/hooks/use-toast';
import { createBudget } from '@/actions/create-budget';
import { useRouter } from 'next/navigation';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { BUDGET_TYPES } from '@/lib/constants';

type Props = {};

export const CreateBudgetDialog = (props: Props) => {
  const { open, setOpen } = useCreateBudgetDialog();
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations();

  const handleClick = async (type: string) => {
    startTransition(async () => {
      const { data, error } = await createBudget({ type });

      if (error || !data) {
        toast({
          title: 'Error creating budget',
          description: error?.message,
          variant: 'destructive',
        });
        return;
      }

      router.push(`/dashboard/budget/${data[0].id}`);

      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>{t('create-budget')}</DialogTitle>
          <DialogDescription>
            {t('create-budget-description')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            disabled={isPending}
            className={cn(isPending && 'animate-pulse')}
            onClick={() => handleClick(BUDGET_TYPES['50-30-20'])}
          >
            <Card
              className={'flex items-center h-full justify-center min-h-36'}
              aria-label="New Budget"
            >
              <span className="font-bold md:text-2xl">50-30-20</span>
            </Card>
          </button>
          <button
            disabled={isPending}
            className={cn(isPending && 'animate-pulse')}
            onClick={() => handleClick('75-10-15')}
          >
            <Card
              className={'flex items-center h-full justify-center min-h-36'}
              aria-label="New Budget"
            >
              <span className="font-bold md:text-2xl">75-10-15</span>
            </Card>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
