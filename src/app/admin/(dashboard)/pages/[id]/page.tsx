import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getCurrentUser } from "@/lib/auth";
import PageEditorClient from "@/components/admin/PageEditorClient";

type PageProps = { params: Promise<{ id: string }> };

export default async function PageEditorPage({ params }: PageProps) {
  const { id } = await params;
  const user = await getCurrentUser();
  const supabase = await createServerSupabaseClient();

  // Handle "new" page creation
  if (id === "new") {
    return (
      <PageEditorClient
        page={null}
        contentBlocks={[]}
        userRole={user!.role}
        userEmail={user!.email}
      />
    );
  }

  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("id", id)
    .single();

  if (!page) notFound();

  const { data: contentBlocks } = await supabase
    .from("content_blocks")
    .select("*")
    .eq("page_id", id)
    .order("sort_order", { ascending: true });

  return (
    <PageEditorClient
      page={page}
      contentBlocks={contentBlocks ?? []}
      userRole={user!.role}
      userEmail={user!.email}
    />
  );
}
