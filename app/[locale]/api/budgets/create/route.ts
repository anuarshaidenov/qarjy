import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

  const { data: latestBudgetData } = await supabase
    .from("budgets")
    .select("*")
    .limit(1)
    .order("created_at", { ascending: false });

  const { error } = await supabase.from("budgets").insert([
    {
      user_id: userData.user.id,
      title: "New Budget",
      monthly_income: latestBudgetData?.[0]?.monthly_income,
      draft_income: 1000000,
    },
  ]);

  if (error) {
    console.error("Error creating budget:", error);
    return NextResponse.json(
      { error: "Error creating budget" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}
