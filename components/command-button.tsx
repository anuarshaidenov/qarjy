"use client";

import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useCommandDialog } from "./command-dialog-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {};

export const CommandButton = (props: Props) => {
  const { setOpen } = useCommandDialog();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-lg hover:bg-transparent md:hover:bg-accent")}
            aria-label="Search"
            onClick={() => setOpen(true)}
          >
            <Search className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-muted" side="right">
          <p className="text-sm text-muted-foreground">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
