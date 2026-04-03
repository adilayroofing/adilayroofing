import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getCurrentUser } from "@/lib/auth";
import PageListClient from "@/components/admin/PageListClient";

export default async function AdminPagesPage() {
  const user = await getCurrentUser();
  const supabase = await createServerSupabaseClient();

  const { data: pages } = await supabase
    .from("pages")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Pages</h1>
          <p className="text-gray-400 mt-1">Manage SEO metadata and content for all pages</p>
        </div>
        {user?.role !== "viewer" && (
          <div className="flex gap-2">
            <Link
              href="/admin/pages/new?type=blog"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              + New Blog Post
            </Link>
            <Link
              href="/admin/pages/new"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              + Add New Page
            </Link>
          </div>
        )}
      </div>

      <PageListClient pages={pages ?? []} />
    </div>
  );
}
