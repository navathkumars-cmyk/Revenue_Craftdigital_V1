import type { LeadDestination } from "../types"

/**
 * Generic outbound webhook — POSTs the lead payload as JSON to any URL that
 * expects it (Zapier, Make, n8n, a custom endpoint, etc.). Set
 * LEAD_WEBHOOK_URL to activate.
 */
export const webhookDestination: LeadDestination = {
  key: "webhook",
  isConfigured() {
    return !!process.env.LEAD_WEBHOOK_URL
  },
  async send(payload) {
    const res = await fetch(process.env.LEAD_WEBHOOK_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error(`Webhook destination failed: ${res.status} ${res.statusText}`)
    }
  },
}
