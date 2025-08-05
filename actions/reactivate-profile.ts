"use server";

import { UserStatus } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const reactivateProfile = async () => {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (!userData.user) {
    return {
      data: userData.user,
      error: userError || null,
    };
  }

  const { data: profileUpdateData, error: profileUpdateError } = await supabase
    .from("profiles")
    .update({
      status: UserStatus.ACTIVE,
    })
    .eq("user_id", userData.user.id)
    .single();

  if (!profileUpdateError) {
    revalidatePath("/dashboard/profile");
  }

  return {
    data: profileUpdateData,
    error: profileUpdateError || null,
  };
};
