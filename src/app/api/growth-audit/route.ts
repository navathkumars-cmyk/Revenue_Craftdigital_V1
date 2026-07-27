import { NextResponse } from "next/server"

import { growthAuditFormSchema } from "@/lib/validations/growth-audit-form"
import { dispatchLead } from "@/lib/leads/dispatch"

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = growthAuditFormSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const results = await dispatchLead({
    source: "growth-audit",
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    company: parsed.data.company,
    businessType: parsed.data.businessType,
    monthlyBudget: parsed.data.monthlyBudget,
    message: parsed.data.message,
    submittedAt: new Date().toISOString(),
  })

  return NextResponse.json({ success: true, results })
}
