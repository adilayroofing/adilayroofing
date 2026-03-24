import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  const supabase = await createServerSupabaseClient();

  // Fetch stats
  const [pagesRes, pendingRes, activityRes] = await Promise.all([
    supabase.from("pages").select("id", { count: "exact", head: true }),
    supabase
      .from("pending_changes")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("activity_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const totalPages = pagesRes.count ?? 0;
  const pendingCount = pendingRes.count ?? 0;
  const recentActivity = activityRes.data ?? [];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back, {user?.name}</p>
      </div>

      {/* Pending alert */}
      {pendingCount > 0 && user?.role === "admin" && (
        <Link
          href="/admin/pending"
          className="block mb-6 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 hover:bg-amber-500/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <p className="text-amber-300 font-semibold">
                {pendingCount} pending change{pendingCount !== 1 ? "s" : ""} awaiting approval
              </p>
              <p className="text-amber-400/70 text-sm">Click to review</p>
            </div>
          </div>
        </Link>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Pages" value={totalPages} href="/admin/pages" />
        <StatCard
          label="Pending Changes"
          value={pendingCount}
          href="/admin/pending"
          highlight={pendingCount > 0}
        />
        <StatCard label="Recent Activity" value={recentActivity.length} href="#activity" />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <QuickLink href="/admin/pages" label="Manage Pages" description="Edit SEO & content" />
        <QuickLink href="/admin/links" label="Internal Links" description="Manage link structure" />
        <QuickLink href="/admin/canonicals" label="Canonical Audit" description="Review canonical URLs" />
        {user?.role === "admin" && (
          <QuickLink href="/admin/pending" label="Review Changes" description="Approve or reject" />
        )}
      </div>

      {/* Recent Activity */}
      <div id="activity" className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-700/50">
          {recentActivity.length === 0 ? (
            <p className="px-6 py-8 text-gray-500 text-center">No activity yet</p>
          ) : (
            recentActivity.map((entry) => (
              <div key={entry.id} className="px-6 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-200">{entry.action}</p>
                  <p className="text-xs text-gray-500">{entry.user_email}</p>
                </div>
                <time className="text-xs text-gray-500">
                  {new Date(entry.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  highlight,
}: {
  label: string;
  value: number;
  href: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-xl border p-6 transition-colors ${
        highlight
          ? "bg-red-600/10 border-red-500/30 hover:bg-red-600/20"
          : "bg-gray-800/50 border-gray-700 hover:bg-gray-800"
      }`}
    >
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${highlight ? "text-red-400" : "text-white"}`}>
        {value}
      </p>
    </Link>
  );
}

function QuickLink({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:bg-gray-800 transition-colors group"
    >
      <p className="text-white font-medium group-hover:text-red-400 transition-colors">
        {label}
      </p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </Link>
  );
}
