"use client";

import { useState } from "react";
import DiffView from "./DiffView";

interface Change {
  id: string;
  table_name: string;
  record_id: string;
  change_type: string;
  old_value: Record<string, unknown> | null;
  new_value: Record<string, unknown>;
  submitted_by: string;
  submitted_at: string;
  status: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  notes: string | null;
}

type FilterStatus = "all" | "pending" | "approved" | "rejected";

export default function MyChangesClient({ changes }: { changes: Change[] }) {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === "all" ? changes : changes.filter((c) => c.status === filter);

  const counts = {
    all: changes.length,
    pending: changes.filter((c) => c.status === "pending").length,
    approved: changes.filter((c) => c.status === "approved").length,
    rejected: changes.filter((c) => c.status === "rejected").length,
  };

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <SummaryCard
          label="Total"
          count={counts.all}
          active={filter === "all"}
          onClick={() => setFilter("all")}
          color="gray"
        />
        <SummaryCard
          label="Pending"
          count={counts.pending}
          active={filter === "pending"}
          onClick={() => setFilter("pending")}
          color="amber"
        />
        <SummaryCard
          label="Approved"
          count={counts.approved}
          active={filter === "approved"}
          onClick={() => setFilter("approved")}
          color="green"
        />
        <SummaryCard
          label="Rejected"
          count={counts.rejected}
          active={filter === "rejected"}
          onClick={() => setFilter("rejected")}
          color="red"
        />
      </div>

      {/* Changes list */}
      {filtered.length === 0 ? (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-400">
            {changes.length === 0
              ? "No changes submitted yet. Your submissions will appear here."
              : `No ${filter} changes.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((change) => {
            const slug = getSlug(change);
            const isExpanded = expandedId === change.id;

            return (
              <div
                key={change.id}
                className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden"
              >
                {/* Row header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : change.id)}
                  className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-gray-800/80 transition-colors"
                >
                  {/* Status badge */}
                  <StatusBadge status={change.status} />

                  {/* Change type badge */}
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

                  {/* Page info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-white text-sm font-medium truncate block">
                      {slug || change.table_name}
                    </span>
                    <span className="text-xs text-gray-500">
                      Submitted {formatDate(change.submitted_at)}
                    </span>
                  </div>

                  {/* Review info */}
                  {change.status !== "pending" && change.reviewed_at && (
                    <div className="text-right hidden sm:block">
                      <span className="text-xs text-gray-500 block">
                        {change.status === "approved" ? "Approved" : "Rejected"}{" "}
                        {formatDate(change.reviewed_at)}
                      </span>
                      {change.reviewed_by && (
                        <span className="text-xs text-gray-600 block">
                          by {change.reviewed_by}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Expand arrow */}
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-gray-700">
                    {/* Notes from admin */}
                    {change.notes && (
                      <div className="px-5 py-3 bg-gray-900/50 border-b border-gray-700/50">
                        <p className="text-xs text-gray-500 mb-1">Admin note:</p>
                        <p className="text-sm text-gray-300">{change.notes}</p>
                      </div>
                    )}

                    {/* Review timeline */}
                    <div className="px-5 py-3 border-b border-gray-700/50">
                      <div className="flex flex-col gap-2">
                        <TimelineItem
                          label="Submitted"
                          date={change.submitted_at}
                          by={change.submitted_by}
                          color="blue"
                        />
                        {change.reviewed_at && (
                          <TimelineItem
                            label={change.status === "approved" ? "Approved" : "Rejected"}
                            date={change.reviewed_at}
                            by={change.reviewed_by}
                            color={change.status === "approved" ? "green" : "red"}
                          />
                        )}
                        {change.status === "approved" && (
                          <div className="flex items-center gap-2 text-xs text-green-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Changes applied to live site
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Diff view */}
                    <div className="px-5 py-4">
                      <p className="text-xs text-gray-500 mb-3">Changes submitted:</p>
                      <DiffView oldValue={change.old_value} newValue={change.new_value} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    pending: {
      bg: "bg-amber-500/10 border-amber-500/30",
      text: "text-amber-400",
      dot: "bg-amber-400",
      label: "Pending",
    },
    approved: {
      bg: "bg-green-500/10 border-green-500/30",
      text: "text-green-400",
      dot: "bg-green-400",
      label: "Approved",
    },
    rejected: {
      bg: "bg-red-500/10 border-red-500/30",
      text: "text-red-400",
      dot: "bg-red-400",
      label: "Rejected",
    },
  }[status] || {
    bg: "bg-gray-500/10 border-gray-500/30",
    text: "text-gray-400",
    dot: "bg-gray-400",
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function SummaryCard({
  label,
  count,
  active,
  onClick,
  color,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  color: "gray" | "amber" | "green" | "red";
}) {
  const colorMap = {
    gray: { bg: "bg-gray-800/50", border: "border-gray-600", text: "text-white" },
    amber: { bg: "bg-amber-500/5", border: "border-amber-500/30", text: "text-amber-400" },
    green: { bg: "bg-green-500/5", border: "border-green-500/30", text: "text-green-400" },
    red: { bg: "bg-red-500/5", border: "border-red-500/30", text: "text-red-400" },
  };
  const c = colorMap[color];

  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition-colors ${
        active ? `${c.bg} ${c.border} ring-1 ring-${color}-500/20` : "bg-gray-800/30 border-gray-700 hover:bg-gray-800/50"
      }`}
    >
      <p className="text-xs text-gray-400">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${active ? c.text : "text-white"}`}>
        {count}
      </p>
    </button>
  );
}

function TimelineItem({
  label,
  date,
  by,
  color,
}: {
  label: string;
  date: string;
  by: string | null;
  color: "blue" | "green" | "red";
}) {
  const dotColor = {
    blue: "bg-blue-400",
    green: "bg-green-400",
    red: "bg-red-400",
  }[color];

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`w-2 h-2 rounded-full ${dotColor} flex-shrink-0`} />
      <span className="text-gray-400">
        {label} {formatDate(date)}
        {by && <span className="text-gray-600"> by {by}</span>}
      </span>
    </div>
  );
}

function getSlug(change: Change): string {
  const nv = change.new_value || {};
  if (typeof nv.slug === "string") return nv.slug;
  const ov = change.old_value || {};
  if (typeof ov.slug === "string") return String(ov.slug);
  return "";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
