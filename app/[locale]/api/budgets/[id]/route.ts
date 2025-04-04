import { createClient } from '@/lib/supabase/server';
import { Budget } from '@/types/budget';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const supabase = await createClient();

  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData?.user) {
    console.error('Error fetching user:', authError);

    return NextResponse.json(
      {
        error: 'User not authenticated. Please log in to create a budget.',
      },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from('budgets')
    .select(
      `
        id,
        title,
        monthly_income,
        draft_income,
        savings,
        cushion_fund,
        expenses(id, name, amount, type),
        type
      `
    )
    .eq('id', (await params).id)
    .eq('user_id', userData.user.id)
    .single();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const essentialExpenses = data.expenses.filter(
    (expense) => expense.type === 'essential'
  );
  const nonEssentialExpenses = data.expenses.filter(
    (expense) => expense.type === 'non-essential'
  );
  const overallExpenses = data.expenses.filter(
    (expense) => expense.type === 'overall'
  );

  const budget: Budget = {
    id: data.id,
    title: data.title,
    monthlyIncome: data.monthly_income,
    expenses: overallExpenses.map((exp) => ({
      id: exp.id,
      name: exp.name,
      amount: exp.amount,
    })),
    essentialExpenses: essentialExpenses.map((exp) => ({
      id: exp.id,
      name: exp.name,
      amount: exp.amount,
    })),
    nonEssentialExpenses: nonEssentialExpenses.map((exp) => ({
      id: exp.id,
      name: exp.name,
      amount: exp.amount,
    })),
    draftIncome: data.draft_income,
    savings: data.savings,
    cushionFund: data.cushion_fund,
    expensesTotal: overallExpenses.reduce(
      (total, exp) => total + exp.amount,
      0
    ),
    essentialExpensesTotal: essentialExpenses.reduce(
      (total, exp) => total + exp.amount,
      0
    ),
    nonEssentialExpensesTotal: nonEssentialExpenses.reduce(
      (total, exp) => total + exp.amount,
      0
    ),
    type: data.type,
  };

  return NextResponse.json(budget);
}
