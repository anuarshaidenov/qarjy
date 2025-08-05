"use client";

import React, { startTransition, useActionState } from "react";
import { Button } from "./ui/button";
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
import { deleteProfile } from "@/actions/delete-profile";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

export const DeleteProfileButton = (props: Props) => {
  const [state, action, pending] = useActionState(deleteProfile, {
    error: null,
    data: null,
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="text-destructive hover:text-destructive"
          variant={"outline"}
        >
          {pending ? <Loader2 className="animate-spin size-4 mr-2" /> : null}
          Delete my account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={pending}
              onClick={() => {
                startTransition(action);
                if (!state.error) {
                  toast({
                    title: "Profile deleted",
                    description: "Your profile has been successfully deleted.",
                  });
                } else if (!!state.error) {
                  toast({
                    title: "Error deleting profile",
                    description:
                      state.error.message ||
                      "An error occurred while deleting your profile.",
                    variant: "destructive",
                  });
                }
              }}
            >
              {pending ? (
                <Loader2 className="animate-spin size-4 mr-2" />
              ) : null}
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
