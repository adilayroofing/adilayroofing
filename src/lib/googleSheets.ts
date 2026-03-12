import { google } from "googleapis";
import crypto from "crypto";

/** Generate a unique lead ID like ADL-1A2B3C */
function generateLeadId(): string {
  const hex = crypto.randomBytes(3).toString("hex").toUpperCase(); // 6 chars
  return `ADL-${hex}`;
}

function getAuth() {
  const credentials = JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}"
  );

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendToSheet(
  sheetName: string,
  values: string[]
) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    console.warn("GOOGLE_SHEET_ID not set — skipping Google Sheets append.");
    return;
  }

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const leadId = generateLeadId();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:A`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[leadId, ...values]],
      },
    });
  } catch (error) {
    // Log but don't throw — email is the primary delivery method
    console.error(`Failed to append to Google Sheet (${sheetName}):`, error);
  }
}
