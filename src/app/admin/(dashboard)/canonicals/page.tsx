import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getCurrentUser } from "@/lib/auth";
import CanonicalsClient from "@/components/admin/CanonicalsClient";

export default async function CanonicalsPage() {
  const user = await getCurrentUser();
  const supabase = await createServerSupabaseClient();

  const { data: pages } = await supabase
    .from("pages")
    .select("id, slug, canonical_url, status")
    .order("slug");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Canonical URL Overview</h1>
        <p className="text-gray-400 mt-1">
          Audit and manage canonical URLs across all pages
        </p>
      </div>

      <CanonicalsClient
        pages={pages ?? []}
        userRole={user!.role}
        userEmail={user!.email}
      />
    </div>
  );
}
