'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export const deleteBudget = async (budgetId: string) => {
  const supabase = await createClient();

  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    return {
      data: false,
      error: authError,
    };
  }

  const { error } = await supabase
    .from('budgets')
    .delete()
    .eq('id', budgetId)
    .eq('user_id', userData.user.id);

  if (!error) {
    revalidatePath('/dashboard');
  }

  return {
    data: !error,
    error,
  };
};
