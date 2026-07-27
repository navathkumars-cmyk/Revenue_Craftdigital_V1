import type { LeadPayload } from "./types"

/** Shared HTML formatter for email-based destinations (Resend, EmailJS). */
export function formatLeadEmailHtml(payload: LeadPayload): string {
  const rows: [string, string | undefined][] = [
    ["Source", payload.source === "growth-audit" ? "Growth Audit form" : "Contact form"],
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["Company", payload.company],
    ["Business type", payload.businessType],
    ["Monthly budget", payload.monthlyBudget],
    ["Message", payload.message],
    ["Submitted at", payload.submittedAt],
  ]

  const rowsHtml = rows
    .filter(([, value]) => !!value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#6b7280;font-size:13px;">${label}</td><td style="padding:6px 12px;font-size:14px;">${value}</td></tr>`
    )
    .join("")

  return `<table style="border-collapse:collapse;font-family:sans-serif;">${rowsHtml}</table>`
}
