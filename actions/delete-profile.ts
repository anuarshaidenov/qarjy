"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthError } from "@supabase/supabase-js";

export async function deleteProfile(): Promise<{
  success: boolean;
  data: any;
  error: AuthError | null;
}> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw {
      success: false,
      error: "You must be logged in to delete your profile.",
    };
  }

  //   return {
  //     success: true,
  //     data: null,
  //     error: null,
  //   };

  const { data: deletedUser, error } = await supabase.auth.admin.deleteUser(
    userData.user.id
  );

  return {
    success: !error,
    data: deletedUser || null,
    error,
  };
}
