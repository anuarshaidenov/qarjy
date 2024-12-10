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
    .from("budgets")
    .select("expenses(id, name, amount, type)")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: true, referencedTable: "expenses" });

  if (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json(
      { error: "Error fetching expenses" },
      { status: 500 }
    );
  }

  const flattenedAllExpenses = data.reduce(
    (
      acc: {
        id: string;
        name: string;
        amount: number;
        type: string;
      }[],
      budget: {
        expenses: { id: string; name: string; amount: number; type: string }[];
      }
    ) => {
      return [...acc, ...budget.expenses];
    },
    []
  );

  const startIndex = (Number(page) - 1) * Number(pageSize);
  const endIndex = Number(pageSize) * Number(page);
  const paginatedExpenses = flattenedAllExpenses.slice(startIndex, endIndex);

  const hasMore = endIndex < flattenedAllExpenses.length;

  return NextResponse.json({
    data: paginatedExpenses,
    count: flattenedAllExpenses.length,
    hasMore,
  });
}
