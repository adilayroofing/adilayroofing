"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

const BASE_URL = "https://www.adilayroofing.com";

interface PageCanonical {
  id: string;
  slug: string;
  canonical_url: string | null;
  status: string;
}

type IssueType = "missing" | "not-self-referencing" | "duplicate" | "none";

function detectIssue(
  page: PageCanonical,
  allPages: PageCanonical[]
): { type: IssueType; message: string } {
  if (!page.canonical_url) {
    return { type: "missing", message: "Missing canonical URL" };
  }

  const expectedCanonical = `${BASE_URL}${page.slug}`;
  if (page.canonical_url !== expectedCanonical) {
    return {
      type: "not-self-referencing",
      message: `Points to ${page.canonical_url} instead of ${expectedCanonical}`,
    };
  }

  const duplicates = allPages.filter(
    (p) => p.id !== page.id && p.canonical_url === page.canonical_url
  );
  if (duplicates.length > 0) {
    return {
      type: "duplicate",
      message: `Shared with: ${duplicates.map((d) => d.slug).join(", ")}`,
    };
  }

  return { type: "none", message: "" };
}

export default function CanonicalsClient({
  pages,
  userRole,
  userEmail,
}: {
  pages: PageCanonical[];
  userRole: string;
  userEmail: string;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "issues">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const pagesWithIssues = pages.map((p) => ({
    ...p,
    issue: detectIssue(p, pages),
  }));

  const issueCount = pagesWithIssues.filter((p) => p.issue.type !== "none").length;

  const filtered =
    filter === "issues"
      ? pagesWithIssues.filter((p) => p.issue.type !== "none")
      : pagesWithIssues;

  async function handleSaveCanonical(pageId: string) {
    const supabase = createClient();

    if (userRole === "editor") {
      const page = pages.find((p) => p.id === pageId);
      await supabase.from("pending_changes").insert({
        table_name: "pages",
        record_id: pageId,
        change_type: "update",
        old_value: { canonical_url: page?.canonical_url },
        new_value: { canonical_url: editValue },
        submitted_by: userEmail,
        status: "pending",
      });
    } else {
      await supabase
        .from("pages")
        .update({ canonical_url: editValue, updated_by: userEmail })
        .eq("id", pageId);
    }

    await supabase.from("activity_log").insert({
      user_email: userEmail,
      action: `Updated canonical URL for page`,
      details: { page_id: pageId, canonical_url: editValue },
    });

    setEditingId(null);
    router.refresh();
  }

  async function autoFixCanonical(page: PageCanonical) {
    const correct = `${BASE_URL}${page.slug}`;
    const supabase = createClient();
    await supabase
      .from("pages")
      .update({ canonical_url: correct, updated_by: userEmail })
      .eq("id", page.id);

    await supabase.from("activity_log").insert({
      user_email: userEmail,
      action: `Auto-fixed canonical URL: ${page.slug}`,
      details: { page_id: page.id, canonical_url: correct },
    });

    router.refresh();
  }

  return (
    <>
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <p className="text-sm text-gray-400">Total Pages</p>
          <p className="text-2xl font-bold text-white">{pages.length}</p>
        </div>
        <div
          className={`border rounded-xl p-4 ${
            issueCount > 0
              ? "bg-red-500/10 border-red-500/30"
              : "bg-green-500/10 border-green-500/30"
          }`}
        >
          <p className="text-sm text-gray-400">Issues Found</p>
          <p
            className={`text-2xl font-bold ${
              issueCount > 0 ? "text-red-400" : "text-green-400"
            }`}
          >
            {issueCount}
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <p className="text-sm text-gray-400">Healthy</p>
          <p className="text-2xl font-bold text-green-400">
            {pages.length - issueCount}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            filter === "all"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          All ({pages.length})
        </button>
        <button
          onClick={() => setFilter("issues")}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            filter === "issues"
              ? "bg-red-600/20 text-red-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Issues Only ({issueCount})
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="text-left px-4 py-3 font-medium">Page Slug</th>
                <th className="text-left px-4 py-3 font-medium">Canonical URL</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filtered.map((page) => (
                <tr key={page.id} className="hover:bg-gray-700/30">
                  <td className="px-4 py-3 text-gray-300 font-mono text-xs">
                    {page.slug}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === page.id && userRole !== "viewer" ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs outline-none font-mono"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveCanonical(page.id)}
                          className="text-green-400 hover:text-green-300 text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-gray-500 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`text-gray-400 font-mono text-xs ${userRole !== "viewer" ? "cursor-pointer hover:text-white" : ""}`}
                        onClick={() => {
                          if (userRole === "viewer") return;
                          setEditingId(page.id);
                          setEditValue(page.canonical_url || "");
                        }}
                      >
                        {page.canonical_url || "(none)"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {page.issue.type === "none" ? (
                      <span className="text-green-400 text-xs">OK</span>
                    ) : (
                      <div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            page.issue.type === "missing"
                              ? "bg-red-500/10 text-red-400"
                              : page.issue.type === "duplicate"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-orange-500/10 text-orange-400"
                          }`}
                        >
                          {page.issue.type}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {page.issue.message}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {page.issue.type !== "none" && userRole === "admin" && (
                      <button
                        onClick={() => autoFixCanonical(page)}
                        className="text-blue-400 hover:text-blue-300 text-xs"
                      >
                        Auto-fix
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
