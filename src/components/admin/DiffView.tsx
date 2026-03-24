"use client";

interface DiffViewProps {
  oldValue: Record<string, unknown> | null;
  newValue: Record<string, unknown>;
}

export default function DiffView({ oldValue, newValue }: DiffViewProps) {
  const allKeys = new Set([
    ...Object.keys(oldValue || {}),
    ...Object.keys(newValue),
  ]);

  // Filter to keys that actually changed
  const changedKeys = [...allKeys].filter((key) => {
    if (key === "updated_at" || key === "updated_by") return false;
    const oldVal = oldValue ? JSON.stringify(oldValue[key]) : undefined;
    const newVal = JSON.stringify(newValue[key]);
    return oldVal !== newVal;
  });

  if (changedKeys.length === 0) {
    return <p className="text-gray-500 text-sm">No visible changes</p>;
  }

  return (
    <div className="space-y-3">
      {changedKeys.map((key) => {
        const oldVal = oldValue?.[key];
        const newVal = newValue[key];
        const oldStr = formatValue(oldVal);
        const newStr = formatValue(newVal);

        return (
          <div key={key} className="text-sm">
            <p className="text-gray-400 font-medium mb-1">{formatKey(key)}</p>
            {oldVal !== undefined && oldStr !== newStr && (
              <div className="bg-red-500/10 border border-red-500/20 rounded px-3 py-1.5 mb-1">
                <span className="text-red-400 font-mono text-xs break-all">
                  - {oldStr}
                </span>
              </div>
            )}
            <div className="bg-green-500/10 border border-green-500/20 rounded px-3 py-1.5">
              <span className="text-green-400 font-mono text-xs break-all">
                + {newStr}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatValue(val: unknown): string {
  if (val === null || val === undefined) return "(empty)";
  if (typeof val === "string") return val || "(empty)";
  return JSON.stringify(val, null, 2);
}
