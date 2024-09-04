"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "@/navigation";
import { headers } from "next/headers";

export const signUpWithGoogle = async () => {
  const header = headers();
  const host = header.get("x-forwarded-host");
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://${host}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};
