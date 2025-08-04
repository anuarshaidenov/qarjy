import { Loader, Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const ProfileLoadingState = (props: Props) => {
  return (
    <section className="py-8 px-4 container flex flex-col gap-4">
      <Loader2 className="size-10 animate-spin text-muted-foreground mb-4" />
    </section>
  );
};

export default ProfileLoadingState;
