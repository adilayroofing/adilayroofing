import { createServerSupabaseClient } from "./supabase-server";

export async function logActivity(
  userEmail: string,
  action: string,
  details: Record<string, unknown> = {}
) {
  try {
    const supabase = await createServerSupabaseClient();
    await supabase.from("activity_log").insert({
      user_email: userEmail,
      action,
      details,
    });
  } catch {
    // Don't fail the parent operation if logging fails
    console.error("Failed to log activity:", action);
  }
}
