"use client";

import React from "react";
import { useCommandDialog } from "./command-dialog-provider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import { Loader, Plus } from "lucide-react";
import { createBudget } from "@/actions/create-budget";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useGetBudgets } from "@/hooks/use-get-budgets";

type Props = {};

export const SearchDialog = (props: Props) => {
  const { open, setOpen } = useCommandDialog();
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const { data, isLoading } = useGetBudgets({ page: 1, pageSize: 5 });

  const handleCreateBudget = () => {
    startTransition(async () => {
      const { data, error } = await createBudget();

      if (error || !data) {
        toast({
          title: "Error creating budget",
          description: error?.message,
          variant: "destructive",
        });
        return;
      }

      router.push(`/dashboard/budget/${data[0].id}`);

      setOpen(false);
    });
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleCreateBudget();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleOpenBudget = (url: string) => {
    router.push(url);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {data?.data.map((budget) => (
            <CommandItem
              key={budget.id}
              onSelect={() =>
                handleOpenBudget(`/dashboard/budget/${budget.id}`)
              }
            >
              <span>{budget.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Commands">
          <CommandItem onSelect={handleCreateBudget}>
            {isPending ? <Loader className="animate-spin" /> : <Plus />}
            <span>Create Budget</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
