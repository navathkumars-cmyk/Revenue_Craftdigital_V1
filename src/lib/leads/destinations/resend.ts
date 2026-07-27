import { siteConfig } from "@/config/site"
import { formatLeadEmailHtml } from "../format"
import type { LeadDestination } from "../types"

/**
 * Resend destination — emails the lead to your team via Resend's REST API
 * (plain `fetch`, no SDK dependency needed for a single call). Set
 * RESEND_API_KEY, and optionally RESEND_FROM_EMAIL / RESEND_TO_EMAIL to
 * override the defaults below. The from-address domain must be verified in
 * your Resend account.
 */
export const resendDestination: LeadDestination = {
  key: "resend",
  isConfigured() {
    return !!process.env.RESEND_API_KEY
  },
  async send(payload) {
    const fromDomain = new URL(siteConfig.url).hostname
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? `Revenue Craft Digital <notifications@${fromDomain}>`,
        to: process.env.RESEND_TO_EMAIL ?? siteConfig.email,
        subject: `New ${payload.source === "growth-audit" ? "Growth Audit" : "contact"} lead: ${payload.name}`,
        html: formatLeadEmailHtml(payload),
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Resend destination failed: ${res.status} ${body}`)
    }
  },
}
