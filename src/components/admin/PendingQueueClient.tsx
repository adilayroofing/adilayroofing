"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import DiffView from "./DiffView";

interface PendingChange {
  id: string;
  table_name: string;
  record_id: string;
  change_type: string;
  old_value: Record<string, unknown> | null;
  new_value: Record<string, unknown>;
  submitted_by: string;
  submitted_at: string;
  status: string;
  notes: string | null;
}

export default function PendingQueueClient({
  changes,
  userEmail,
}: {
  changes: PendingChange[];
  userEmail: string;
}) {
  const router = useRouter();
  const [processing, setProcessing] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  async function handleAction(
    changeId: string,
    action: "approved" | "rejected",
    notes?: string
  ) {
    setProcessing(changeId);
    const supabase = createClient();

    try {
      const change = changes.find((c) => c.id === changeId);
      if (!change) return;

      // Update pending_changes status
      await supabase
        .from("pending_changes")
        .update({
          status: action,
          reviewed_by: userEmail,
          reviewed_at: new Date().toISOString(),
          notes: notes || null,
        })
        .eq("id", changeId);

      // If approved, apply the change to the actual table
      if (action === "approved") {
        const { new_value, table_name, record_id, change_type } = change;

        if (change_type === "create") {
          // Remove non-table fields
          const { content_html, ...pageData } = new_value as Record<string, unknown>;
          const { data: newPage } = await supabase
            .from(table_name)
            .insert(pageData)
            .select()
            .single();

          // If there's content, save it
          if (content_html && newPage) {
            await supabase.from("content_blocks").insert({
              page_id: newPage.id,
              block_type: "rich_text",
              content: { html: content_html },
              sort_order: 0,
            });
          }
        } else if (change_type === "update") {
          const { content_html, ...pageData } = new_value as Record<string, unknown>;
          await supabase
            .from(table_name)
            .update(pageData)
            .eq("id", record_id);

          // Update content if present
          if (content_html) {
            const { data: existing } = await supabase
              .from("content_blocks")
              .select("id")
              .eq("page_id", record_id)
              .limit(1);

            if (existing && existing.length > 0) {
              await supabase
                .from("content_blocks")
                .update({ content: { html: content_html } })
                .eq("id", existing[0].id);
            } else {
              await supabase.from("content_blocks").insert({
                page_id: record_id,
                block_type: "rich_text",
                content: { html: content_html },
                sort_order: 0,
              });
            }
          }
        } else if (change_type === "delete") {
          await supabase.from(table_name).delete().eq("id", record_id);
        }
      }

      // Log activity
      await supabase.from("activity_log").insert({
        user_email: userEmail,
        action: `${action === "approved" ? "Approved" : "Rejected"} change: ${change.table_name} (${change.change_type})`,
        details: { change_id: changeId, table: change.table_name },
      });

      router.refresh();
    } catch (err) {
      console.error("Failed to process change:", err);
    } finally {
      setProcessing(null);
    }
  }

  async function handleBulkApprove() {
    for (const id of selectedIds) {
      await handleAction(id, "approved");
    }
    setSelectedIds(new Set());
  }

  function toggleSelect(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  if (changes.length === 0) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
        <p className="text-gray-400">No pending changes to review</p>
      </div>
    );
  }

  return (
    <div>
      {/* Bulk actions */}
      {selectedIds.size > 0 && (
        <div className="mb-4 flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
          <span className="text-sm text-gray-300">
            {selectedIds.size} selected
          </span>
          <button
            onClick={handleBulkApprove}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
          >
            Approve Selected
          </button>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="px-3 py-1 text-gray-400 hover:text-white text-sm"
          >
            Clear
          </button>
        </div>
      )}

      {/* Changes list */}
      <div className="space-y-4">
        {changes.map((change) => (
          <div
            key={change.id}
            className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-700 flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedIds.has(change.id)}
                onChange={() => toggleSelect(change.id)}
                className="rounded border-gray-600"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      change.change_type === "create"
                        ? "bg-green-500/10 text-green-400"
                        : change.change_type === "delete"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {change.change_type}
                  </span>
                  <span className="text-white font-medium text-sm">
                    {change.table_name}
                  </span>
                  {typeof (change.new_value as Record<string, unknown>).slug === "string" && (
                    <span className="text-gray-400 text-sm">
                      ({String((change.new_value as Record<string, unknown>).slug)})
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  by {change.submitted_by} &middot;{" "}
                  {new Date(change.submitted_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Diff */}
            <div className="px-5 py-4">
              <DiffView oldValue={change.old_value} newValue={change.new_value} />
            </div>

            {/* Actions */}
            <div className="px-5 py-3 border-t border-gray-700 flex items-center gap-2">
              <button
                onClick={() => handleAction(change.id, "approved")}
                disabled={processing === change.id}
                className="px-4 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white text-sm rounded-lg transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  const note = window.prompt("Rejection reason (optional):");
                  handleAction(change.id, "rejected", note || undefined);
                }}
                disabled={processing === change.id}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white text-sm rounded-lg transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  const note = window.prompt("Add a note:");
                  if (note) {
                    const supabase = createClient();
                    supabase
                      .from("pending_changes")
                      .update({ notes: note })
                      .eq("id", change.id)
                      .then(() => router.refresh());
                  }
                }}
                className="px-4 py-1.5 text-gray-400 hover:text-white text-sm transition-colors"
              >
                Add Note
              </button>
              {processing === change.id && (
                <span className="text-xs text-gray-500">Processing...</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
