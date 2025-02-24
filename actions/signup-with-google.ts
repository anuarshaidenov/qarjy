"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpWithGoogle = async () => {
  const header = await headers();
  const host = header.get("host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: isLocalEnv
        ? `http://${host}/auth/callback`
        : `https://${host}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  if (!data.url) {
    throw new Error("No redirect URL provided");
  }

  redirect(data.url);
};
