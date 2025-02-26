"use server";

import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const createBudget = async () => {
  const supabase = await createClient();
  const t = await getTranslations();

  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    return {
      data: null,
      error: authError,
    };
  }

  const { data: latestBudgetData } = await supabase
    .from("budgets")
    .select("*")
    .limit(1)
    .order("created_at", { ascending: false });

  const { data, error } = await supabase
    .from("budgets")
    .insert([
      {
        user_id: userData.user.id,
        title: t("new-budget"),
        monthly_income: latestBudgetData?.[0]?.monthly_income || 1000000,
        draft_income: 1000000,
      },
    ])
    .select("id");

  revalidatePath("/dashboard");

  return {
    data,
    error,
  };
};
