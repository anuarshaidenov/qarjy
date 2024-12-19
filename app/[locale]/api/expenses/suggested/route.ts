import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const {
    nextUrl: { searchParams },
  } = request;
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "10";

  const supabase = createClient();

  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    console.error("Error fetching user:", authError);

    return NextResponse.json(
      {
        error:
          "User not authenticated. Please log in to see suggested expenses.",
      },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from("expenses")
    .select(
      `
      id,
      name,
      amount,
      type
    `
    )
    .eq("created_by", userData.user.id)
    .order("created_at", { ascending: false })
    .range((+page - 1) * +pageSize, +page * +pageSize - 1);

  if (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json(
      { error: "Error fetching expenses" },
      { status: 500 }
    );
  }

  const sortedDataByAmount = data.sort((a, b) => b.amount - a.amount);

  return NextResponse.json({
    data: sortedDataByAmount,
  });
}
