'use client';

import React from 'react';
import { CreateBudgetDialog } from './create-budget-dialog';

type CreateBudgetDialogContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateBudgetDialogContext =
  React.createContext<CreateBudgetDialogContextType>({
    open: false,
    setOpen: () => {},
  });

export const useCreateBudgetDialog = () =>
  React.useContext(CreateBudgetDialogContext);

export const CreateBudgetDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <CreateBudgetDialogContext.Provider value={{ open, setOpen }}>
      {children}
      <CreateBudgetDialog />
    </CreateBudgetDialogContext.Provider>
  );
};
