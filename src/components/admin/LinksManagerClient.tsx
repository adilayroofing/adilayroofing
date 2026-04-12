"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

interface LinkData {
  id: string;
  anchor_text: string;
  context: string | null;
  updated_at: string;
  source: { id: string; slug: string } | null;
  target: { id: string; slug: string } | null;
}

interface PageRef {
  id: string;
  slug: string;
}

export default function LinksManagerClient({
  links,
  pages,
  userRole,
  userEmail,
}: {
  links: LinkData[];
  pages: PageRef[];
  userRole: string;
  userEmail: string;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAnchor, setEditAnchor] = useState("");

  // Add form state
  const [newSource, setNewSource] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newAnchor, setNewAnchor] = useState("");
  const [newContext, setNewContext] = useState("");
  const [saving, setSaving] = useState(false);

  const filtered = links.filter((l) => {
    if (!filter) return true;
    const lf = filter.toLowerCase();
    return (
      l.anchor_text.toLowerCase().includes(lf) ||
      l.source?.slug.toLowerCase().includes(lf) ||
      l.target?.slug.toLowerCase().includes(lf)
    );
  });

  async function handleAdd() {
    if (!newSource || !newTarget || !newAnchor) return;
    setSaving(true);
    const supabase = createClient();

    if (userRole === "editor") {
      // Submit as pending change
      await supabase.from("pending_changes").insert({
        table_name: "internal_links",
        record_id: "00000000-0000-0000-0000-000000000000",
        change_type: "create",
        old_value: null,
        new_value: {
          source_page_id: newSource,
          target_page_id: newTarget,
          anchor_text: newAnchor,
          context: newContext || null,
        },
        submitted_by: userEmail,
        status: "pending",
      });

      // Send push notification (fire-and-forget)
      fetch("/api/admin/notify-pending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageName: `${newAnchor} (internal link)`,
          changeType: "link added",
        }),
      }).catch(() => {});
    } else {
      await supabase.from("internal_links").insert({
        source_page_id: newSource,
        target_page_id: newTarget,
        anchor_text: newAnchor,
        context: newContext || null,
      });
    }

    await supabase.from("activity_log").insert({
      user_email: userEmail,
      action: `Added internal link: "${newAnchor}"`,
      details: { source: newSource, target: newTarget },
    });

    setNewSource("");
    setNewTarget("");
    setNewAnchor("");
    setNewContext("");
    setShowAdd(false);
    setSaving(false);
    router.refresh();
  }

  async function handleInlineEdit(linkId: string) {
    const supabase = createClient();

    if (userRole === "editor") {
      const link = links.find((l) => l.id === linkId);
      await supabase.from("pending_changes").insert({
        table_name: "internal_links",
        record_id: linkId,
        change_type: "update",
        old_value: { anchor_text: link?.anchor_text },
        new_value: { anchor_text: editAnchor },
        submitted_by: userEmail,
        status: "pending",
      });

      // Send push notification (fire-and-forget)
      fetch("/api/admin/notify-pending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageName: `${editAnchor} (internal link)`,
          changeType: "link edit",
        }),
      }).catch(() => {});
    } else {
      await supabase
        .from("internal_links")
        .update({ anchor_text: editAnchor })
        .eq("id", linkId);
    }

    setEditingId(null);
    router.refresh();
  }

  async function handleDelete(linkId: string) {
    if (!confirm("Delete this internal link?")) return;
    const supabase = createClient();
    await supabase.from("internal_links").delete().eq("id", linkId);
    await supabase.from("activity_log").insert({
      user_email: userEmail,
      action: "Deleted internal link",
      details: { link_id: linkId },
    });
    router.refresh();
  }

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Filter by page or anchor text..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add Link
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 mb-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Source Page</label>
              <select
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm outline-none"
              >
                <option value="">Select source page...</option>
                {pages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.slug}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Target Page</label>
              <select
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm outline-none"
              >
                <option value="">Select target page...</option>
                {pages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.slug}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Anchor Text</label>
            <input
              type="text"
              value={newAnchor}
              onChange={(e) => setNewAnchor(e.target.value)}
              placeholder="e.g., roof replacement in Philadelphia"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Context (optional)</label>
            <input
              type="text"
              value={newContext}
              onChange={(e) => setNewContext(e.target.value)}
              placeholder="Surrounding sentence for context"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={saving || !newSource || !newTarget || !newAnchor}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white text-sm rounded-lg transition-colors"
            >
              {saving ? "Saving..." : userRole === "editor" ? "Submit for Review" : "Add Link"}
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-gray-400 hover:text-white text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="text-left px-4 py-3 font-medium">Source Page</th>
                <th className="text-left px-4 py-3 font-medium">Target Page</th>
                <th className="text-left px-4 py-3 font-medium">Anchor Text</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Updated</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No internal links found
                  </td>
                </tr>
              ) : (
                filtered.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-700/30">
                    <td className="px-4 py-3 text-gray-300">{link.source?.slug || "—"}</td>
                    <td className="px-4 py-3 text-gray-300">{link.target?.slug || "—"}</td>
                    <td className="px-4 py-3">
                      {editingId === link.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editAnchor}
                            onChange={(e) => setEditAnchor(e.target.value)}
                            className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm outline-none flex-1"
                            autoFocus
                          />
                          <button
                            onClick={() => handleInlineEdit(link.id)}
                            className="text-green-400 hover:text-green-300 text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-500 hover:text-gray-300 text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span
                          className="text-blue-400 cursor-pointer hover:underline"
                          onClick={() => {
                            setEditingId(link.id);
                            setEditAnchor(link.anchor_text);
                          }}
                        >
                          {link.anchor_text}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">
                      {new Date(link.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {userRole === "admin" && (
                        <button
                          onClick={() => handleDelete(link.id)}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
