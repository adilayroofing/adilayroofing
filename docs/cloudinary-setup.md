# Cloudinary setup (Adilay Roofing)

This project uses a **dedicated** Cloudinary account (NOT shared with other
projects on this Mac). All photos are served from Cloudinary so they don't
sit in the repo or eat Vercel bandwidth.

## 1. One-time: create the Cloudinary account & get keys

1. Sign up at https://cloudinary.com using the email you want for adilayroofing.
2. After login, open https://console.cloudinary.com → **Dashboard**.
3. Copy these three values from the "Product Environment Credentials" card:
   - **Cloud Name** (e.g. `adilayroofing`)
   - **API Key**
   - **API Secret**

## 2. Fill in `.env.local`

Open `adilay-roofing/.env.local` and fill in:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your cloud name>
NEXT_PUBLIC_CLOUDINARY_FOLDER=adilayroofing
CLOUDINARY_API_KEY=<your api key>
CLOUDINARY_API_SECRET=<your api secret>
```

Leave `NEXT_PUBLIC_CLOUDINARY_FOLDER=adilayroofing` exactly as-is — that's the
prefix the loader expects.

## 3. Upload existing images

From `adilay-roofing/`:

```bash
npm run cloudinary:upload
```

This walks `public/images/**` and uploads every file to Cloudinary under
`adilayroofing/images/...`, preserving folder structure. Re-run anytime; it
skips files already there. Use `npm run cloudinary:upload:force` to overwrite.

## 4. Verify locally

Restart `npm run dev`. Open the site and inspect any image — its URL should
now resolve to `https://res.cloudinary.com/<cloud>/image/upload/.../adilayroofing/images/...`.

Two mechanisms make this work, both already wired up in `next.config.ts`:

- **`next/image` components** use a custom loader (`src/lib/cloudinary.ts`)
  that builds Cloudinary URLs with `f_auto,q_auto` + per-request width.
- **Raw `<img src="/images/...">` tags** are caught by a 308 redirect to
  Cloudinary. Browsers cache the redirect, so the hop only happens once.

## 5. Remove `/public/images` from the repo (optional, recommended)

Once you've uploaded and confirmed everything works, you can delete the local
folder so it stops bloating the deploy:

```bash
rm -rf public/images
```

If anything's still referenced and missing, the redirect will still pull it
from Cloudinary — `/public/images` is no longer the source of truth.

## 6. Add the same env vars to Vercel

Open https://vercel.com → your `adilay-roofing` project → **Settings** →
**Environment Variables**. Add these four, one at a time:

| Name                                | Value              | Environments                      |
| ----------------------------------- | ------------------ | --------------------------------- |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | your cloud name    | Production, Preview, Development  |
| `NEXT_PUBLIC_CLOUDINARY_FOLDER`     | `adilayroofing`    | Production, Preview, Development  |
| `CLOUDINARY_API_KEY`                | your api key       | Production, Preview               |
| `CLOUDINARY_API_SECRET`             | your api secret    | Production, Preview               |

Notes:
- The two `NEXT_PUBLIC_*` vars are bundled into the browser. Safe — they're
  only the cloud name + folder, not the secret.
- `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` are server-only, used by the
  upload script + MCP. They never reach the browser.
- After adding, click **Redeploy** on the latest deployment so Vercel picks
  up the new env. Or just push a commit.

## 7. MCP integration (Cursor / Claude Code)

A project-scoped MCP config at `.mcp.json` gives the AI tools access to the
Cloudinary asset management API using the credentials in `.env.local`. No
global config — it only applies inside this repo, which keeps it isolated
from other Cloudinary accounts on this machine.

If your editor doesn't auto-load `.mcp.json`, restart it after filling in
`.env.local`.

## Troubleshooting

- **Images 404 after upload**: check the Cloudinary console → Media Library.
  Files should be under `adilayroofing/images/...`. If they're elsewhere,
  re-run with `--force` and confirm `NEXT_PUBLIC_CLOUDINARY_FOLDER` matches.
- **SVG logos not loading**: by default new Cloudinary accounts disallow SVG
  delivery. Console → Settings → Security → uncheck "Restricted media types"
  for SVG, or convert the logos to PNG.
- **CORS / hotlink errors**: Console → Settings → Security → Allowed fetch
  domains. Add `adilayroofing.com` and your Vercel preview domain.
