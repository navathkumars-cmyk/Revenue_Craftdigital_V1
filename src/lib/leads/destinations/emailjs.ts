import type { LeadDestination } from "../types"

/**
 * EmailJS destination via their server-side REST API — uses the *private*
 * key, not the public key from their browser widget/React SDK; don't
 * confuse the two. Set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
 * EMAILJS_PUBLIC_KEY, and EMAILJS_PRIVATE_KEY.
 *
 * Note: EmailJS is more commonly wired directly into the form component and
 * called from the browser with just the public key (see their official
 * React SDK) — that's a legitimate alternative if you'd rather skip a
 * server round-trip. This adapter exists for when you want every
 * destination to flow through the same server-side dispatch path.
 */
export const emailjsDestination: LeadDestination = {
  key: "emailjs",
  isConfigured() {
    return !!(
      process.env.EMAILJS_SERVICE_ID &&
      process.env.EMAILJS_TEMPLATE_ID &&
      process.env.EMAILJS_PUBLIC_KEY &&
      process.env.EMAILJS_PRIVATE_KEY
    )
  },
  async send(payload) {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name: payload.name,
          from_email: payload.email,
          phone: payload.phone ?? "",
          company: payload.company ?? "",
          message: payload.message ?? "",
          source: payload.source,
        },
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`EmailJS destination failed: ${res.status} ${body}`)
    }
  },
}
