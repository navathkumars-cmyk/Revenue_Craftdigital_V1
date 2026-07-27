import type { LeadDestination } from "../types"

/**
 * Google Sheets destination via a published Google Apps Script Web App —
 * the practical way to append form submissions to a spreadsheet without a
 * full service-account OAuth setup.
 *
 * 1. Open the target Google Sheet -> Extensions -> Apps Script.
 * 2. Add a `doPost(e)` function that `JSON.parse`s `e.postData.contents`
 *    and appends a row via `SpreadsheetApp.getActiveSheet().appendRow([...])`.
 * 3. Deploy -> New deployment -> Web app -> execute as yourself, access
 *    "Anyone" -> copy the deployment URL.
 * 4. Set GOOGLE_SHEETS_WEBHOOK_URL to that URL.
 */
export const googleSheetsDestination: LeadDestination = {
  key: "google-sheets",
  isConfigured() {
    return !!process.env.GOOGLE_SHEETS_WEBHOOK_URL
  },
  async send(payload) {
    const res = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error(`Google Sheets destination failed: ${res.status} ${res.statusText}`)
    }
  },
}
