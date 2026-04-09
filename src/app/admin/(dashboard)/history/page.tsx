import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import HistoryClient from "@/components/admin/HistoryClient";

export default async function HistoryPage() {
  const user = await getCurrentUser();

  // Only admins can access change history
  if (!user || user.role !== "admin") {
    redirect("/admin");
  }

  const supabase = await createServerSupabaseClient();

  // Fetch recent revisions (last 50)
  const { data: revisions } = await supabase
    .from("page_revisions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  // Fetch creation/deletion activity log entries to show in history
  const { data: activityEntries } = await supabase
    .from("activity_log")
    .select("*")
    .or("action.like.Created page:%,action.like.Deleted blog post:%")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Change History</h1>
        <p className="text-gray-400 mt-1">
          Preview and revert changes made to any page
        </p>
      </div>

      <HistoryClient
        revisions={revisions ?? []}
        activityEntries={activityEntries ?? []}
        userEmail={user.email}
      />
    </div>
  );
}
