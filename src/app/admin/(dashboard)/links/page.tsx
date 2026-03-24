import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getCurrentUser } from "@/lib/auth";
import LinksManagerClient from "@/components/admin/LinksManagerClient";

export default async function LinksPage() {
  const user = await getCurrentUser();
  const supabase = await createServerSupabaseClient();

  const [linksRes, pagesRes] = await Promise.all([
    supabase
      .from("internal_links")
      .select("*, source:source_page_id(id, slug), target:target_page_id(id, slug)")
      .order("updated_at", { ascending: false }),
    supabase.from("pages").select("id, slug").order("slug"),
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Internal Links</h1>
        <p className="text-gray-400 mt-1">
          Manage internal link structure and anchor text
        </p>
      </div>

      <LinksManagerClient
        links={linksRes.data ?? []}
        pages={pagesRes.data ?? []}
        userRole={user!.role}
        userEmail={user!.email}
      />
    </div>
  );
}
