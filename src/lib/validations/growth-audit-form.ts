import { z } from "zod"

import { industries } from "@/config/industries"
import { budgetOptions } from "@/lib/validations/contact-form"

const businessTypeValues = industries.map((industry) => industry.slug) as [string, ...string[]]

export const growthAuditFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .regex(/^[+\d][\d\s()-]{6,}$/, "Enter a valid phone number."),
  company: z.string().trim().min(2, "Enter your company name."),
  businessType: z.enum(businessTypeValues, { error: "Select your business type." }),
  monthlyBudget: z.enum(["under-2k", "2k-5k", "5k-15k", "15k-plus"], {
    error: "Select an approximate monthly ad budget.",
  }),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
})

export type GrowthAuditFormValues = z.infer<typeof growthAuditFormSchema>

export const businessTypeOptions = industries.map((industry) => ({
  value: industry.slug,
  label: industry.name,
}))

export { budgetOptions }
