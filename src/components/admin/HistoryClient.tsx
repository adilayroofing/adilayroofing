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
}

export default function HistoryClient({
  revisions,
  userEmail,
}: {
  revisions: Revision[];
  userEmail: string;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [revertingId, setRevertingId] = useState<string | null>(null);
  const [confirmRevertId, setConfirmRevertId] = useState<string | null>(null);
  const [revertedIds, setRevertedIds] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filtered = filter
    ? revisions.filter((r) => r.slug.toLowerCase().includes(filter.toLowerCase()))
    : revisions;

  const previewRevision = previewId ? revisions.find((r) => r.id === previewId) : null;

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

      // Log the revert action
      await supabase.from("activity_log").insert({
        user_email: userEmail,
        action: `Reverted page: ${revision.slug} to version from ${formatDate(revision.created_at)}`,
        details: { slug: revision.slug, page_id: revision.page_id, revision_id: revision.id },
      });

      setMessage({ type: "success", text: `Reverted "${revision.slug}" to version from ${formatDate(revision.created_at)}` });
      setRevertedIds((prev) => new Set(prev).add(revision.id));
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

      {/* Revisions Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {revisions.length === 0
            ? "No change history yet. Changes will appear here after you save a page."
            : "No revisions match your filter."}
        </div>
      ) : (
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50 text-left">
                <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Page</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Changed By</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filtered.map((rev) => (
                <tr key={rev.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-white text-sm font-medium">{rev.slug}</span>
                    <span className="block text-xs text-gray-500 mt-0.5">{rev.block_type.replace("structured_", "").replace("_", " ")}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{rev.saved_by}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{formatDate(rev.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setPreviewId(previewId === rev.id ? null : rev.id)}
                        className="px-3 py-1.5 text-xs font-medium text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-colors"
                      >
                        {previewId === rev.id ? "Close" : "Preview"}
                      </button>
                      {revertedIds.has(rev.id) ? (
                        <span className="px-3 py-1.5 text-xs font-medium text-green-400 border border-green-500/30 rounded-lg bg-green-500/10">
                          Reverted ✓
                        </span>
                      ) : confirmRevertId === rev.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleRevert(rev)}
                            disabled={revertingId === rev.id}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-700 transition-colors"
                          >
                            {revertingId === rev.id ? "Reverting..." : "Confirm"}
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
                          onClick={() => setConfirmRevertId(rev.id)}
                          className="px-3 py-1.5 text-xs font-medium text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-colors"
                        >
                          Revert
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview Modal */}
      {previewRevision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setPreviewId(null)} />
          <div className="relative bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <div>
                <h3 className="text-white font-semibold">
                  Revision Preview
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  {previewRevision.slug} — {formatDate(previewRevision.created_at)}
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
              {/* SEO Fields snapshot */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">SEO Fields (at time of save)</h4>
                <div className="space-y-2">
                  {renderField("Meta Title", previewRevision.page_data.meta_title)}
                  {renderField("Meta Description", previewRevision.page_data.meta_description)}
                  {renderField("Canonical URL", previewRevision.page_data.canonical_url)}
                  {renderField("Status", previewRevision.page_data.status)}
                </div>
              </div>

              {/* Content snapshot */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Content ({previewRevision.block_type.replace("structured_", "").replace("_", " ")})
                </h4>
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap break-all font-mono">
                    {JSON.stringify(previewRevision.content_data, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-700">
              <button
                onClick={() => setPreviewId(null)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
              {revertedIds.has(previewRevision.id) ? (
                <span className="px-4 py-2 text-sm font-medium text-green-400 border border-green-500/30 rounded-lg bg-green-500/10">
                  Reverted ✓
                </span>
              ) : (
                <button
                  onClick={() => {
                    setConfirmRevertId(previewRevision.id);
                    setPreviewId(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-colors"
                >
                  Revert to This Version
                </button>
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
