// One-shot: replace old phone (888) 823-4766 with (267) 255-3620 across all
// Supabase CMS rows. Surgical — only touches strings containing the old number,
// preserves every other field. Dry-run by default; pass --apply to write.

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const APPLY = process.argv.includes("--apply");
const sb = createClient(SUPABASE_URL, SERVICE_KEY);

const REPLACEMENTS = [
  [/\(888\)\s*823[\s-]*4766/g, "(267) 255-3620"],
  [/888-823-4766/g, "267-255-3620"],
  [/888\.823\.4766/g, "267.255.3620"],
  [/8888234766/g, "2672553620"],
  [/\+18888234766/g, "+12672553620"],
  [/tel:8882348766/g, "tel:+12672553620"],
];

function rewriteString(s) {
  if (typeof s !== "string") return s;
  let out = s;
  for (const [pat, rep] of REPLACEMENTS) out = out.replace(pat, rep);
  return out;
}

function rewriteJson(v) {
  if (v === null || v === undefined) return v;
  if (typeof v === "string") return rewriteString(v);
  if (Array.isArray(v)) return v.map(rewriteJson);
  if (typeof v === "object") {
    const out = {};
    for (const k of Object.keys(v)) out[k] = rewriteJson(v[k]);
    return out;
  }
  return v;
}

function changed(a, b) {
  return JSON.stringify(a) !== JSON.stringify(b);
}

async function processPages() {
  console.log(`\n--- TABLE: pages ---`);
  const { data, error } = await sb.from("pages").select("*");
  if (error) throw error;
  let touched = 0;
  for (const row of data) {
    const fields = ["meta_title", "meta_description", "og_title", "og_description", "canonical_url", "custom_head_tags"];
    const updates = {};
    for (const f of fields) {
      const before = row[f];
      const after = rewriteString(before);
      if (before !== after) updates[f] = after;
    }
    if (Object.keys(updates).length === 0) continue;
    touched++;
    console.log(`  page ${row.slug} (id=${row.id}) — fields: ${Object.keys(updates).join(", ")}`);
    for (const [k, v] of Object.entries(updates)) {
      console.log(`    ${k}: …${(row[k] || "").slice(-80)} → …${(v || "").slice(-80)}`);
    }
    if (APPLY) {
      const { error: upErr } = await sb.from("pages").update(updates).eq("id", row.id);
      if (upErr) console.error(`    UPDATE FAILED: ${upErr.message}`);
      else console.log(`    ✓ updated`);
    }
  }
  console.log(`pages: ${touched} row(s) ${APPLY ? "updated" : "would be updated (dry run)"}`);
  return touched;
}

async function processContentBlocks() {
  console.log(`\n--- TABLE: content_blocks ---`);
  const { data, error } = await sb.from("content_blocks").select("*");
  if (error) throw error;
  let touched = 0;
  for (const row of data) {
    const before = row.content;
    const after = rewriteJson(before);
    if (!changed(before, after)) continue;
    touched++;
    console.log(`  block id=${row.id} type=${row.block_type} page_id=${row.page_id}`);
    if (APPLY) {
      const { error: upErr } = await sb.from("content_blocks").update({ content: after }).eq("id", row.id);
      if (upErr) console.error(`    UPDATE FAILED: ${upErr.message}`);
      else console.log(`    ✓ updated`);
    }
  }
  console.log(`content_blocks: ${touched} row(s) ${APPLY ? "updated" : "would be updated (dry run)"}`);
  return touched;
}

(async () => {
  console.log(`Mode: ${APPLY ? "APPLY (writing)" : "DRY RUN (no writes)"}`);
  const a = await processPages();
  const b = await processContentBlocks();
  console.log(`\nTotal: ${a + b} row(s) ${APPLY ? "updated" : "would be updated"}`);
  if (!APPLY && a + b > 0) console.log(`Re-run with --apply to write.`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
