import { createClient } from "@/lib/supabase/server";

export async function UpdateNotes(id: number, text: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("notes")
    .update({ content: text })
    .eq("id", id);

  if (error) {
    console.error("Error updating notes:", error);
    return { error };
  }

  return { success: true };
}
