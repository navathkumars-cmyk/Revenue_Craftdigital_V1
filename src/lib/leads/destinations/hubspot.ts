import type { LeadDestination } from "../types"

/**
 * HubSpot destination — creates a Contact via the HubSpot CRM API using a
 * Private App access token (Settings -> Integrations -> Private Apps,
 * needs the `crm.objects.contacts.write` scope). Set HUBSPOT_ACCESS_TOKEN.
 */
export const hubspotDestination: LeadDestination = {
  key: "hubspot",
  isConfigured() {
    return !!process.env.HUBSPOT_ACCESS_TOKEN
  },
  async send(payload) {
    const [firstName, ...rest] = payload.name.trim().split(/\s+/)
    const lastName = rest.join(" ") || firstName

    const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          firstname: firstName,
          lastname: lastName,
          email: payload.email,
          phone: payload.phone,
          company: payload.company,
          message: payload.message,
          hs_lead_status: "NEW",
        },
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`HubSpot destination failed: ${res.status} ${body}`)
    }
  },
}
