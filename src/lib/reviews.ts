import { google } from "googleapis";
import { unstable_cache } from "next/cache";
import { getAuth } from "@/lib/googleSheets";
import {
  fallbackReviews,
  fallbackReviewStats,
  type Review,
} from "@/data/reviews";

/**
 * Google reviews pipeline (no database — the leads Google Sheet is the store).
 *
 * "Reviews" tab:       Date | Name | Stars | Review | Show on site? | Google ID
 * "Review Stats" tab:  B1 = Google rating, B2 = total Google reviews, B3 = last checked
 *
 * A daily cron (/api/cron/reviews) appends new Google reviews with
 * "Show on site?" blank. The owner types YES to publish one; the site
 * picks it up within an hour (REVIEWS_TAG cache).
 */

export const REVIEWS_SHEET = "Reviews";
export const STATS_SHEET = "Review Stats";
export const REVIEWS_TAG = "google-reviews";

export const PLACE_ID = "ChIJc0S-XEUevaARojPgET8esHQ";

/** Only Google reviews published after this date are queued for approval.
 *  Older ones not already on the site were left off on purpose. */
export const REVIEWS_CUTOFF = "2026-06-22"; // Abby Houff — newest review on the site as of setup

export interface ReviewStats {
  rating: number;
  count: number;
}

export interface SiteReviews {
  reviews: Review[];
  stats: ReviewStats;
  /** When this data was loaded — used for the server-rendered "X ago" labels. */
  loadedAt: number;
}

/** Accepts YYYY-MM-DD or M/D/YYYY (in case a date gets retyped in the sheet). */
function normalizeDate(v: unknown): string {
  const s = String(v ?? "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}` : "";
}

export function sheetsClient() {
  return google.sheets({ version: "v4", auth: getAuth() });
}

async function loadFromSheet(): Promise<SiteReviews> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const loadedAt = Date.now();
  if (!spreadsheetId) return { reviews: fallbackReviews, stats: fallbackReviewStats, loadedAt };

  try {
    const res = await sheetsClient().spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: [`${REVIEWS_SHEET}!A2:E`, `${STATS_SHEET}!B1:B2`],
    });
    const [rowsRange, statsRange] = res.data.valueRanges ?? [];

    const reviews: Review[] = (rowsRange?.values ?? [])
      .filter((r) => String(r[4] ?? "").trim().toUpperCase() === "YES")
      .map((r) => ({
        date: normalizeDate(r[0]),
        name: String(r[1] ?? "").trim(),
        stars: Number(r[2]) || 5,
        quote: String(r[3] ?? "").trim(),
      }))
      .filter((r) => r.name && r.quote && r.date)
      .sort((a, b) => b.date.localeCompare(a.date));

    const rating = Number(statsRange?.values?.[0]?.[0]);
    const count = Number(statsRange?.values?.[1]?.[0]);

    return {
      reviews: reviews.length ? reviews : fallbackReviews,
      stats: {
        rating: rating > 0 ? rating : fallbackReviewStats.rating,
        count: count > 0 ? count : fallbackReviewStats.count,
      },
      loadedAt,
    };
  } catch (err) {
    console.error("[reviews] Failed to read reviews sheet:", err);
    return { reviews: fallbackReviews, stats: fallbackReviewStats, loadedAt };
  }
}

/** Approved reviews + Google stats for the site, cached for an hour. */
export const getSiteReviews = unstable_cache(loadFromSheet, ["site-reviews"], {
  revalidate: 3600,
  tags: [REVIEWS_TAG],
});
