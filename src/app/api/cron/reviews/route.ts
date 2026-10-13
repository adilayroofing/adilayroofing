import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import {
  PLACE_ID,
  REVIEWS_CUTOFF,
  REVIEWS_SHEET,
  REVIEWS_TAG,
  STATS_SHEET,
  sheetsClient,
} from "@/lib/reviews";
import { getESTTimestamp } from "@/lib/googleSheets";

/**
 * Daily Google reviews check — scheduled in vercel.json.
 *
 * 1. Pulls the 5 reviews Google's Places API returns + the rating/total.
 * 2. Appends any review newer than REVIEWS_CUTOFF that isn't in the
 *    "Reviews" sheet yet, with "Show on site?" left blank for approval.
 * 3. Updates the "Review Stats" tab and pushes a phone notification (ntfy).
 *
 * Places only returns 5 "most relevant" reviews, so if the total goes up
 * by more than we found, the notification says to check Google directly.
 */

export const dynamic = "force-dynamic";

interface PlaceReview {
  name: string; // "places/<id>/reviews/<reviewId>"
  rating: number;
  publishTime: string;
  text?: { text: string };
  originalText?: { text: string };
  authorAttribution?: { displayName: string };
}

interface PlaceDetails {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlaceReview[];
}

async function notify(title: string, message: string, clickUrl: string) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return;
  try {
    await fetch(`https://ntfy.sh/${topic}`, {
      method: "POST",
      headers: { Title: title, Click: clickUrl, Priority: "high", Tags: "star" },
      body: message,
    });
  } catch (err) {
    console.error("[cron/reviews] ntfy failed:", err);
  }
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!apiKey || !spreadsheetId) {
    return NextResponse.json({ error: "Missing GOOGLE_PLACES_API_KEY or GOOGLE_SHEET_ID" }, { status: 500 });
  }

  // 1. Google
  const placeRes = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
    },
    cache: "no-store",
  });
  if (!placeRes.ok) {
    const body = await placeRes.text();
    console.error("[cron/reviews] Places API error:", placeRes.status, body);
    return NextResponse.json({ error: "Places API error", status: placeRes.status }, { status: 502 });
  }
  const place = (await placeRes.json()) as PlaceDetails;

  // 2. What's already in the sheet
  const sheets = sheetsClient();
  const existing = await sheets.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges: [`${REVIEWS_SHEET}!A2:F`, `${STATS_SHEET}!B2`],
  });
  const [rowsRange, countRange] = existing.data.valueRanges ?? [];
  const rows = rowsRange?.values ?? [];
  const knownIds = new Set(rows.map((r) => String(r[5] ?? "")).filter(Boolean));
  const knownNameDate = new Set(rows.map((r) => `${String(r[1] ?? "").trim()}|${r[0]}`));
  const prevCount = Number(countRange?.values?.[0]?.[0]) || 0;

  const fresh = (place.reviews ?? [])
    .map((r) => ({
      id: r.name,
      date: r.publishTime.slice(0, 10),
      name: r.authorAttribution?.displayName?.trim() || "Google user",
      stars: r.rating,
      text: (r.originalText?.text ?? r.text?.text ?? "").trim(),
    }))
    .filter((r) => r.date > REVIEWS_CUTOFF)
    .filter((r) => !knownIds.has(r.id) && !knownNameDate.has(`${r.name}|${r.date}`))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (fresh.length) {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${REVIEWS_SHEET}!A:F`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: fresh.map((r) => [r.date, r.name, r.stars, r.text, "", r.id]) },
    });
  }

  // 3. Stats + notifications
  const rating = place.rating ?? 0;
  const count = place.userRatingCount ?? 0;
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${STATS_SHEET}!A1:B3`,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        ["Google rating", rating],
        ["Total Google reviews", count],
        ["Last checked", getESTTimestamp()],
      ],
    },
  });

  const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
  for (const r of fresh) {
    await notify(
      `New ${r.stars}★ Google review`,
      `${r.name}: "${r.text.slice(0, 120)}${r.text.length > 120 ? "…" : ""}"\nType YES in the Reviews sheet to show it on the website.`,
      sheetUrl
    );
  }
  const missing = prevCount > 0 ? count - prevCount - fresh.length : 0;
  if (missing > 0) {
    await notify(
      "New Google review — check manually",
      `${missing} new Google review${missing > 1 ? "s" : ""} came in that Google didn't send the text for. Copy ${missing > 1 ? "them" : "it"} into the Reviews sheet if you want ${missing > 1 ? "them" : "it"} on the site.`,
      "https://www.google.com/maps/place/?q=place_id:" + PLACE_ID
    );
  }

  if (count !== prevCount || fresh.length) revalidateTag(REVIEWS_TAG, { expire: 0 });

  return NextResponse.json({ added: fresh.map((r) => r.name), rating, count, prevCount });
}
