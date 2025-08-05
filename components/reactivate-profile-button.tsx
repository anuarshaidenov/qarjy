"use client";

import { reactivateProfile } from "@/actions/reactivate-profile";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { startTransition, useActionState } from "react";
import { Loader2 } from "lucide-react";

type Props = {};

export const ReactivateProfileButton = (props: Props) => {
  const [state, action, pending] = useActionState(reactivateProfile, {
    error: null,
    data: null,
  });

  return (
    <Button
      disabled={pending}
      variant={"secondary"}
      onClick={() => {
        startTransition(action);
        if (!state.error) {
          toast({
            title: "Profile reactivated",
            description: "Your profile has been successfully reactivated.",
          });
        } else if (!!state.error) {
          toast({
            title: "Error reactivating profile",
            description: state.error.message,
            variant: "destructive",
          });
        }
      }}
    >
      {pending ? <Loader2 className="animate-spin size-4 mr-2" /> : null}
      Reactivate my account
    </Button>
  );
};
