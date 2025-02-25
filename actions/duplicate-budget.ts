'use server';

import { createClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';
import { revalidatePath } from 'next/cache';

export const duplicateBudget = async (budgetId: string) => {
  const supabase = await createClient();
  const t = await getTranslations();

  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    return {
      data: false,
      error: authError,
    };
  }

  const { data: budget, error: budgetError } = await supabase
    .from('budgets')
    .select('*')
    .eq('id', budgetId)
    .eq('user_id', userData.user.id)
    .single();

  if (budgetError) {
    return {
      data: false,
      error: budgetError,
    };
  }

  const { data: duplicatedBudget, error: insertBudgetError } = await supabase
    .from('budgets')
    .insert([
      {
        user_id: userData.user.id,
        title: `${budget.title} ${t('copy')}`,
        monthly_income: budget.monthly_income,
        draft_income: budget.draft_income,
        savings: budget.savings,
        cushion_fund: budget.cushion_fund,
      },
    ])
    .select('id');

  if (insertBudgetError) {
    return {
      data: false,
      error: insertBudgetError,
    };
  }

  const { data: expenses, error: expensesError } = await supabase
    .from('expenses')
    .select('name, amount, type, budget_id, created_by')
    .eq('budget_id', budgetId);

  if (expensesError) {
    return {
      data: false,
      error: expensesError,
    };
  }

  if (expenses.length > 0) {
    const duplicatedExpenses = expenses.map((expense) => ({
      ...expense,
      budget_id: duplicatedBudget[0].id,
      created_at: new Date().toISOString(),
    }));

    console.log({ duplicatedExpenses });

    const { error: insertExpensesError } = await supabase
      .from('expenses')
      .insert(duplicatedExpenses);

    if (insertExpensesError) {
      return {
        data: false,
        error: insertExpensesError,
      };
    }
  }

  const { data: notes, error: notesError } = await supabase
    .from('notes')
    .select('*')
    .eq('budget_id, content', budgetId);

  if (notesError) {
    return {
      data: false,
      error: notesError,
    };
  }

  if (notes.length > 0) {
    const { data: notesFromNewBudget, error: notesFromNewBudgetError } =
      await supabase
        .from('notes')
        .select('id')
        .eq('budget_id', duplicatedBudget[0].id);

    if (notesFromNewBudgetError) {
      return {
        data: false,
        error: notesFromNewBudgetError,
      };
    }

    const { error: updateNotesError } = await supabase
      .from('notes')
      .update({
        content: notes[0].content,
      })
      .eq('id', notesFromNewBudget[0].id);

    if (updateNotesError) {
      return {
        data: false,
        error: updateNotesError,
      };
    }
  }

  revalidatePath('/dashboard');

  return {
    data: true,
    error: null,
  };
};
