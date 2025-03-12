'use client';

import { Card } from './ui/card';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import { useCreateBudgetDialog } from './create-budget-dialog-provider';

type Props = {};

export const CreateBudgetButton = (props: Props) => {
  const { setOpen } = useCreateBudgetDialog();

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <button onClick={handleClick}>
      <Card
        className={cn('flex items-center h-full justify-center min-h-36')}
        aria-label="New Budget"
      >
        <Plus className="size-8" />
      </Card>
    </button>
  );
};
