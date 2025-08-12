"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export interface CopyToClipboardProps {
  text: string
  children: React.ReactNode
  asChild?: boolean
  className?: string
  onCopied?: () => void
}

export function CopyToClipboard({
  text,
  children,
  asChild = false,
  className,
  onCopied,
}: CopyToClipboardProps) {
  const handleClick = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      toast({ title: "Copied" })
      onCopied?.()
    } catch (error) {
      toast({ title: "Failed to copy", description: String(error) })
    }
  }

  const Comp = asChild ? Slot : ("button" as const)

  return (
    <Comp
      onClick={handleClick}
      className={cn("cursor-pointer", className)}
      {...(!asChild ? { type: "button" } : {})}
    >
      {children}
    </Comp>
  )
}


