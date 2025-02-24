import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { params } = context;

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

  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("id", params.id)
    .eq("user_id", userData.user.id);

  if (error) {
    return NextResponse.json(
      { error: "Error deleting budget" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
