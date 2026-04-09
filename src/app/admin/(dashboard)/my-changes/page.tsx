import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import MyChangesClient from "@/components/admin/MyChangesClient";

export default async function MyChangesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  const supabase = await createServerSupabaseClient();

  // Fetch changes submitted by this user (all statuses)
  const { data: changes } = await supabase
    .from("pending_changes")
    .select("*")
    .eq("submitted_by", user.email)
    .order("submitted_at", { ascending: false })
    .limit(100);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">My Changes</h1>
        <p className="text-gray-400 mt-1">
          Track your submitted changes and their approval status
        </p>
      </div>

      <MyChangesClient changes={changes ?? []} />
    </div>
  );
}
