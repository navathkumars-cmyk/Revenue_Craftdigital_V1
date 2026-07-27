import type { LeadDestination } from "../types"

/**
 * Zoho CRM destination — creates a Lead record via the Zoho CRM REST API.
 *
 * Zoho's OAuth2 access tokens expire hourly; the practical setup is a
 * "Self Client" (server-to-server) grant that yields a long-lived refresh
 * token, exchanged here for a fresh access token on every send. Set:
 *   ZOHO_REFRESH_TOKEN, ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET
 * and optionally ZOHO_ACCOUNTS_URL / ZOHO_API_DOMAIN if your account isn't
 * on the default .com data center (e.g. use the .eu or .in equivalents).
 */

async function getAccessToken(): Promise<string> {
  const accountsUrl = process.env.ZOHO_ACCOUNTS_URL ?? "https://accounts.zoho.com"
  const res = await fetch(`${accountsUrl}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN as string,
      client_id: process.env.ZOHO_CLIENT_ID as string,
      client_secret: process.env.ZOHO_CLIENT_SECRET as string,
      grant_type: "refresh_token",
    }),
  })

  if (!res.ok) {
    throw new Error(`Zoho token refresh failed: ${res.status} ${res.statusText}`)
  }

  const data = (await res.json()) as { access_token: string }
  return data.access_token
}

export const zohoDestination: LeadDestination = {
  key: "zoho-crm",
  isConfigured() {
    return !!(process.env.ZOHO_REFRESH_TOKEN && process.env.ZOHO_CLIENT_ID && process.env.ZOHO_CLIENT_SECRET)
  },
  async send(payload) {
    const accessToken = await getAccessToken()
    const apiDomain = process.env.ZOHO_API_DOMAIN ?? "https://www.zohoapis.com"

    const res = await fetch(`${apiDomain}/crm/v6/Leads`, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            Last_Name: payload.name,
            Email: payload.email,
            Phone: payload.phone,
            Company: payload.company || payload.name,
            Lead_Source: payload.source === "growth-audit" ? "Growth Audit Form" : "Contact Form",
            Description: payload.message,
          },
        ],
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Zoho CRM destination failed: ${res.status} ${body}`)
    }
  },
}
