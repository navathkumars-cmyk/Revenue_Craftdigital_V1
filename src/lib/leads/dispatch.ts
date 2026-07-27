import type { LeadDestination, LeadPayload } from "./types"
import { webhookDestination } from "./destinations/webhook"
import { resendDestination } from "./destinations/resend"
import { googleSheetsDestination } from "./destinations/google-sheets"
import { zohoDestination } from "./destinations/zoho"
import { hubspotDestination } from "./destinations/hubspot"
import { emailjsDestination } from "./destinations/emailjs"

const allDestinations: LeadDestination[] = [
  webhookDestination,
  resendDestination,
  googleSheetsDestination,
  zohoDestination,
  hubspotDestination,
  emailjsDestination,
]

export interface DispatchResult {
  destination: string
  status: "sent" | "failed"
  error?: string
}

/**
 * Fans a lead out to every *configured* destination in parallel — add a new
 * destination to `allDestinations` above and it's automatically included.
 * A destination with missing env vars is silently skipped, not treated as
 * an error, so you can enable exactly the backends you've actually set up
 * without touching this file. One destination failing never blocks the
 * others, and never blocks the form's success response to the visitor —
 * the API route should always return success once the lead is validated,
 * regardless of what dispatchLead() reports.
 */
export async function dispatchLead(payload: LeadPayload): Promise<DispatchResult[]> {
  const configured = allDestinations.filter((destination) => destination.isConfigured())

  if (configured.length === 0) {
    console.warn(
      `[leads] No destination is configured — lead from "${payload.name}" <${payload.email}> was received but not forwarded anywhere. Set at least one destination's env vars (see .env.example).`
    )
    return []
  }

  const results = await Promise.allSettled(configured.map((destination) => destination.send(payload)))

  return results.map((result, index) => {
    const destination = configured[index]
    if (result.status === "fulfilled") {
      return { destination: destination.key, status: "sent" as const }
    }
    console.error(`[leads] ${destination.key} destination failed:`, result.reason)
    return { destination: destination.key, status: "failed" as const, error: String(result.reason) }
  })
}
