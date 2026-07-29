import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.email("Enter a valid work email."),
  company: z.string().trim().min(2, "Enter your company name."),
  monthlyBudget: z.enum(["under-2k", "2k-5k", "5k-15k", "15k-plus"], {
    error: "Select an approximate monthly ad budget.",
  }),
  message: z.string().trim().min(10, "Tell us a bit more about your goals.").max(2000),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const budgetOptions: { value: ContactFormValues["monthlyBudget"]; label: string }[] = [
  { value: "under-2k", label: "Under ₹1,50,000 / month" },
  { value: "2k-5k", label: "₹1,50,000 – ₹4,00,000 / month" },
  { value: "5k-15k", label: "₹4,00,000 – ₹12,00,000 / month" },
  { value: "15k-plus", label: "₹12,00,000+ / month" },
]
