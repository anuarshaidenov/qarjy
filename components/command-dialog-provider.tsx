"use client";

import React, { createContext, useContext, useState } from "react";

type CommandDialogContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CommandDialogContext = createContext<CommandDialogContextType>({
  open: false,
  setOpen: () => {},
});

export const useCommandDialog = () => useContext(CommandDialogContext);

export const CommandDialogProvider = ({
  children,
  key = "k",
}: {
  children: React.ReactNode;
  key?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </CommandDialogContext.Provider>
  );
};
