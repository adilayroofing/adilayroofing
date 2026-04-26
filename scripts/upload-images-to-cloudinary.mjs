#!/usr/bin/env node
// Bulk-upload every file in public/images/** to Cloudinary, preserving the
// folder structure so existing /images/foo.jpg paths in the codebase resolve
// to <folder>/images/foo.jpg on Cloudinary.
//
// Usage:
//   node scripts/upload-images-to-cloudinary.mjs           # upload changed/new
//   node scripts/upload-images-to-cloudinary.mjs --force   # re-upload everything
//
// Reads creds from .env.local:
//   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
//   NEXT_PUBLIC_CLOUDINARY_FOLDER         (default: adilayroofing)
//   CLOUDINARY_API_KEY
//   CLOUDINARY_API_SECRET

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, posix } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_IMAGES = join(ROOT, "public", "images");

// --- minimal .env.local loader (avoid extra deps) -----------------------------
function loadEnvLocal() {
  try {
    const raw = readFileSync(join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const [, k, vRaw] = m;
      if (process.env[k]) continue;
      const v = vRaw.replace(/^['"]|['"]$/g, "");
      process.env[k] = v;
    }
  } catch {
    /* no .env.local — rely on shell env */
  }
}
loadEnvLocal();

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "adilayroofing";
const KEY = process.env.CLOUDINARY_API_KEY;
const SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD || !KEY || !SECRET) {
  console.error(
    "Missing Cloudinary credentials. Fill these in .env.local:\n" +
      "  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME\n" +
      "  CLOUDINARY_API_KEY\n" +
      "  CLOUDINARY_API_SECRET"
  );
  process.exit(1);
}

const FORCE = process.argv.includes("--force");

// --- walk public/images -------------------------------------------------------
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry === ".DS_Store") continue;
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

// Cloudinary signature for unsigned-style params (signed upload).
async function sign(params) {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const data = new TextEncoder().encode(sorted + SECRET);
  const buf = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function uploadOne(localPath) {
  // /images/foo.jpg → relative "images/foo.jpg"
  const rel = relative(join(ROOT, "public"), localPath);
  const relPosix = rel.split(/[\\/]/).join("/"); // images/foo.jpg
  // public_id is path WITHOUT extension. Cloudinary handles the extension.
  const dot = relPosix.lastIndexOf(".");
  const publicId = `${FOLDER}/${dot >= 0 ? relPosix.slice(0, dot) : relPosix}`;

  const timestamp = Math.floor(Date.now() / 1000);
  const params = {
    overwrite: FORCE ? "true" : "false",
    public_id: publicId,
    timestamp: String(timestamp),
    use_filename: "false",
    unique_filename: "false",
  };
  const signature = await sign(params);

  const fileBytes = readFileSync(localPath);
  const blob = new Blob([fileBytes]);

  const form = new FormData();
  form.append("file", blob, posix.basename(relPosix));
  form.append("api_key", KEY);
  for (const [k, v] of Object.entries(params)) form.append(k, v);
  form.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
    { method: "POST", body: form }
  );
  const body = await res.json();
  if (!res.ok) {
    // 'already exists' is fine when not forcing — surface anything else.
    if (
      !FORCE &&
      body?.error?.message?.toLowerCase().includes("already exists")
    ) {
      return { publicId, skipped: true };
    }
    throw new Error(`${publicId}: ${body?.error?.message || res.statusText}`);
  }
  return { publicId, url: body.secure_url };
}

const files = walk(PUBLIC_IMAGES);
console.log(
  `Uploading ${files.length} files to Cloudinary cloud "${CLOUD}" under folder "${FOLDER}/images/"...`
);

let ok = 0,
  skipped = 0,
  failed = 0;
for (const f of files) {
  try {
    const r = await uploadOne(f);
    if (r.skipped) {
      skipped++;
      process.stdout.write(".");
    } else {
      ok++;
      process.stdout.write("✓");
    }
  } catch (e) {
    failed++;
    console.error(`\n[fail] ${f}: ${e.message}`);
  }
}
console.log(`\nDone. uploaded=${ok} skipped=${skipped} failed=${failed}`);
if (failed) process.exit(1);
