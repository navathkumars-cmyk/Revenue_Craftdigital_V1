import { NextResponse } from "next/server"

import { contactFormSchema } from "@/lib/validations/contact-form"
import { dispatchLead } from "@/lib/leads/dispatch"

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = contactFormSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const results = await dispatchLead({
    source: "contact",
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company,
    monthlyBudget: parsed.data.monthlyBudget,
    message: parsed.data.message,
    submittedAt: new Date().toISOString(),
  })

  return NextResponse.json({ success: true, results })
}
