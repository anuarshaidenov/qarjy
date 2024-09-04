"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "@/navigation";

export const signOut = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect("/");
};
