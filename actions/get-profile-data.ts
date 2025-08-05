"use server";

import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types/profile";

export const getProfileData = async () => {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (!userData.user) {
    return { data: userData.user, userError };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userData.user.id)
    .single();

  return {
    data: {
      ...data,
      providers: userData.user.app_metadata?.providers || [],
      email: userData.user.email,
    } as Profile | null,
    error,
  };
};
