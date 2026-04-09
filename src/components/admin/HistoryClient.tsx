"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import DiffView from "./DiffView";

interface Revision {
  id: string;
  page_id: string;
  slug: string;
  page_data: Record<string, unknown>;
  content_data: Record<string, unknown>;
  block_type: string;
  saved_by: string;
  created_at: string;
  reverted_at: string | null;
}

interface ActivityEntry {
  id: string;
  user_email: string;
  action: string;
  details: Record<string, unknown>;
  created_at: string;
}

// Unified history item that can represent either a revision or an activity entry
interface HistoryItem {
  id: string;
  slug: string;
  type: "revision" | "created" | "deleted";
  saved_by: string;
  created_at: string;
  // Revision-specific
  revision?: Revision;
  // Activity-specific
  activity?: ActivityEntry;
}

export default function HistoryClient({
  revisions,
  activityEntries = [],
  userEmail,
}: {
  revisions: Revision[];
  activityEntries?: ActivityEntry[];
  userEmail: string;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [revertingId, setRevertingId] = useState<string | null>(null);
  const [confirmRevertId, setConfirmRevertId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Build unified history list
  const historyItems: HistoryItem[] = [
    ...revisions.map((r): HistoryItem => ({
      id: r.id,
      slug: r.slug,
      type: "revision",
      saved_by: r.saved_by,
      created_at: r.created_at,
      revision: r,
    })),
    ...activityEntries.map((a): HistoryItem => {
      const details = a.details || {};
      const slug = (details.slug as string) || "";
      const isDelete = a.action.startsWith("Deleted");
      return {
        id: `activity-${a.id}`,
        slug,
        type: isDelete ? "deleted" : "created",
        saved_by: a.user_email,
        created_at: a.created_at,
        activity: a,
      };
    }),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const filtered = filter
    ? historyItems.filter((item) => item.slug.toLowerCase().includes(filter.toLowerCase()))
    : historyItems;

  const previewItem = previewId ? historyItems.find((item) => item.id === previewId) : null;

  async function handleRevert(revision: Revision) {
    setRevertingId(revision.id);
    setMessage(null);
    const supabase = createClient();

    try {
      // Restore page SEO data
      const { meta_title, meta_description, canonical_url, og_title, og_description, og_image, custom_head_tags, status } =
        revision.page_data as Record<string, string | null>;

      const { error: pageError } = await supabase
        .from("pages")
        .update({
          meta_title: meta_title || null,
          meta_description: meta_description || null,
          canonical_url: canonical_url || null,
          og_title: og_title || null,
          og_description: og_description || null,
          og_image: og_image || null,
          custom_head_tags: custom_head_tags || null,
          status: status || "published",
          updated_by: userEmail,
        })
        .eq("id", revision.page_id);

      if (pageError) throw pageError;

      // Restore content block
      const { data: existingBlocks } = await supabase
        .from("content_blocks")
        .select("id")
        .eq("page_id", revision.page_id)
        .limit(1);

      if (existingBlocks && existingBlocks.length > 0) {
        await supabase
          .from("content_blocks")
          .update({
            block_type: revision.block_type,
            content: revision.content_data,
          })
          .eq("id", existingBlocks[0].id);
      } else {
        await supabase.from("content_blocks").insert({
          page_id: revision.page_id,
          block_type: revision.block_type,
          content: revision.content_data,
          sort_order: 0,
        });
      }

      // Mark this revision as reverted
      await supabase
        .from("page_revisions")
        .update({ reverted_at: new Date().toISOString() })
        .eq("id", revision.id);

      // Log the revert action
      await supabase.from("activity_log").insert({
        user_email: userEmail,
        action: `Reverted page: ${revision.slug} to version from ${formatDate(revision.created_at)}`,
        details: { slug: revision.slug, page_id: revision.page_id, revision_id: revision.id },
      });

      setMessage({ type: "success", text: `Reverted "${revision.slug}" to version from ${formatDate(revision.created_at)}` });
      setConfirmRevertId(null);
      router.refresh();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to revert",
      });
    } finally {
      setRevertingId(null);
    }
  }

  function getTypeLabel(type: HistoryItem["type"]) {
    switch (type) {
      case "created":
        return { text: "Created", className: "bg-green-500/10 text-green-400" };
      case "deleted":
        return { text: "Deleted", className: "bg-red-500/10 text-red-400" };
      default:
        return { text: "Updated", className: "bg-blue-500/10 text-blue-400" };
    }
  }

  return (
    <div>
      {/* Message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Filter */}
      <div className="mb-4">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by page slug..."
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent placeholder-gray-500"
        />
      </div>

      {/* History Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {historyItems.length === 0
            ? "No change history yet. Changes will appear here after you save a page."
            : "No entries match your filter."}
        </div>
      ) : (
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50 text-left">
                <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Page</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Changed By</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filtered.map((item) => {
                const label = getTypeLabel(item.type);
                const blockType = item.revision
                  ? item.revision.block_type.replace("structured_", "").replace("_", " ")
                  : ((item.activity?.details?.block_type as string) || "").replace("structured_", "").replace("_", " ");

                return (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-white text-sm font-medium">{item.slug}</span>
                      {blockType && (
                        <span className="block text-xs text-gray-500 mt-0.5">{blockType}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${label.className}`}>
                        {label.text}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{item.saved_by}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{formatDate(item.created_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Preview button */}
                        <button
                          onClick={() => setPreviewId(previewId === item.id ? null : item.id)}
                          className="px-3 py-1.5 text-xs font-medium text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-colors"
                        >
                          {previewId === item.id ? "Close" : "Preview"}
                        </button>

                        {/* Revert button — only for revisions (not create/delete activity) */}
                        {item.revision && (
                          item.revision.reverted_at ? (
                            <span className="px-3 py-1.5 text-xs font-medium text-green-400 border border-green-500/30 rounded-lg bg-green-500/10">
                              Reverted
                            </span>
                          ) : confirmRevertId === item.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleRevert(item.revision!)}
                                disabled={revertingId === item.id}
                                className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-700 transition-colors"
                              >
                                {revertingId === item.id ? "Reverting..." : "Confirm"}
                              </button>
                              <button
                                onClick={() => setConfirmRevertId(null)}
                                className="px-3 py-1.5 text-xs font-medium text-gray-400 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmRevertId(item.id)}
                              className="px-3 py-1.5 text-xs font-medium text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-colors"
                            >
                              Revert
                            </button>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setPreviewId(null)} />
          <div className="relative bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <div>
                <h3 className="text-white font-semibold">
                  {previewItem.type === "revision" ? "Revision Preview" : previewItem.type === "created" ? "Creation Details" : "Deletion Details"}
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  {previewItem.slug} — {formatDate(previewItem.created_at)}
                </p>
              </div>
              <button
                onClick={() => setPreviewId(null)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-6">
              {previewItem.revision ? (
                <>
                  {/* SEO Fields snapshot */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">SEO Fields (at time of save)</h4>
                    <div className="space-y-2">
                      {renderField("Meta Title", previewItem.revision.page_data.meta_title)}
                      {renderField("Meta Description", previewItem.revision.page_data.meta_description)}
                      {renderField("Canonical URL", previewItem.revision.page_data.canonical_url)}
                      {renderField("Status", previewItem.revision.page_data.status)}
                    </div>
                  </div>

                  {/* Content snapshot */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">
                      Content ({previewItem.revision.block_type.replace("structured_", "").replace("_", " ")})
                    </h4>
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                      <pre className="text-xs text-gray-300 whitespace-pre-wrap break-all font-mono">
                        {JSON.stringify(previewItem.revision.content_data, null, 2)}
                      </pre>
                    </div>
                  </div>
                </>
              ) : previewItem.activity ? (
                <>
                  {/* Activity entry preview (creation or deletion) */}
                  <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium mb-4 ${
                      previewItem.type === "created"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {previewItem.type === "created" ? "Page Created" : "Page Deleted"}
                    </div>

                    <h4 className="text-sm font-medium text-gray-300 mb-3">Details</h4>
                    <div className="space-y-2">
                      {renderField("Action", previewItem.activity.action)}
                      {renderField("By", previewItem.activity.user_email)}
                      {renderField("Date", formatDate(previewItem.activity.created_at))}
                    </div>
                  </div>

                  {/* Show page data if available in details */}
                  {previewItem.activity.details.page_data && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-3">SEO Fields</h4>
                      <div className="space-y-2">
                        {renderField("Meta Title", (previewItem.activity.details.page_data as Record<string, unknown>).meta_title)}
                        {renderField("Meta Description", (previewItem.activity.details.page_data as Record<string, unknown>).meta_description)}
                        {renderField("Canonical URL", (previewItem.activity.details.page_data as Record<string, unknown>).canonical_url)}
                        {renderField("Status", (previewItem.activity.details.page_data as Record<string, unknown>).status)}
                      </div>
                    </div>
                  )}

                  {/* Show content data if available */}
                  {previewItem.activity.details.content_data && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-3">
                        Content ({((previewItem.activity.details.block_type as string) || "").replace("structured_", "").replace("_", " ")})
                      </h4>
                      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                        <pre className="text-xs text-gray-300 whitespace-pre-wrap break-all font-mono">
                          {JSON.stringify(previewItem.activity.details.content_data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-700">
              <button
                onClick={() => setPreviewId(null)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
              {previewItem.revision && (
                previewItem.revision.reverted_at ? (
                  <span className="px-4 py-2 text-sm font-medium text-green-400 border border-green-500/30 rounded-lg bg-green-500/10">
                    Reverted
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setConfirmRevertId(previewItem.id);
                      setPreviewId(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-colors"
                  >
                    Revert to This Version
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function renderField(label: string, value: unknown) {
  const str = value === null || value === undefined ? "(empty)" : String(value);
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className="text-gray-500 w-32 flex-shrink-0">{label}</span>
      <span className="text-gray-300 break-all">{str}</span>
    </div>
  );
}
