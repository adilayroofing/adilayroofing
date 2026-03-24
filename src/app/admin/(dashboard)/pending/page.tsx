import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import PendingQueueClient from "@/components/admin/PendingQueueClient";

export default async function PendingPage() {
  const user = await getCurrentUser();

  // Only admins can access the approval queue
  if (!user || user.role !== "admin") {
    redirect("/admin");
  }

  const supabase = await createServerSupabaseClient();

  const { data: pendingChanges } = await supabase
    .from("pending_changes")
    .select("*")
    .eq("status", "pending")
    .order("submitted_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Approval Queue</h1>
        <p className="text-gray-400 mt-1">
          Review and approve changes submitted by the SEO team
        </p>
      </div>

      <PendingQueueClient
        changes={pendingChanges ?? []}
        userEmail={user.email}
      />
    </div>
  );
}
