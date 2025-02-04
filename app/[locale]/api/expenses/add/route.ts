import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { budgetId, name, amount, type } = body;
  const supabase = createClient();

  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    console.error("Error fetching user:", authError);

    return NextResponse.json(
      {
        error: "User not authenticated. Please log in to create a budget.",
      },
      { status: 401 }
    );
  }

  const { data: lastExpense } = await supabase
    .from("expenses")
    .select("sort_order")
    .eq("budget_id", budgetId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  const newSortOrder = lastExpense ? lastExpense.sort_order + 1 : 0;

  const { data, error } = await supabase
    .from("expenses")
    .insert([
      {
        budget_id: budgetId,
        name,
        amount,
        type,
        created_by: userData.user.id,
        sort_order: newSortOrder,
      },
    ])
    .single();

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data,
  });
}
