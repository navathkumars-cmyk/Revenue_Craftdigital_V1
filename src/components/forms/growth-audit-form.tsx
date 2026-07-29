"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react"

import {
  growthAuditFormSchema,
  businessTypeOptions,
  budgetOptions,
  type GrowthAuditFormValues,
} from "@/lib/validations/growth-audit-form"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

interface GrowthAuditFormProps {
  id?: string
  className?: string
}

export function GrowthAuditForm({ id, className }: GrowthAuditFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const form = useForm<GrowthAuditFormValues>({
    resolver: zodResolver(growthAuditFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      businessType: "" as GrowthAuditFormValues["businessType"],
      monthlyBudget: "" as GrowthAuditFormValues["monthlyBudget"],
    },
  })

  async function onSubmit(values: GrowthAuditFormValues) {
    setStatus("submitting")
    try {
      const res = await fetch("/api/growth-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div id={id} className={className}>
        <div className="flex flex-col items-center gap-3 p-6 text-center sm:p-8">
          <CheckCircle2 className="text-signal-600 size-10" />
          <h3 className="text-lg font-semibold">Your audit request is in.</h3>
          <p className="text-muted-foreground text-sm">
            We&apos;ll review your details and follow up within one business day with next steps.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div id={id} className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3.5 p-5 sm:p-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">Get My Free Growth Audit</h3>
            <p className="text-muted-foreground text-sm">
              A clear breakdown of what&apos;s capping your ad performance — no cost, no obligation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jordan Lee" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jordan@company.com" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" autoComplete="organization" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} items={businessTypeOptions}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {businessTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly ad budget</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} items={budgetOptions}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {budgetOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Biggest growth challenge <span className="text-muted-foreground font-normal">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder="e.g. rising CPLs, unclear attribution, flat ROAS..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {status === "error" ? (
            <p className="text-destructive flex items-center gap-2 text-sm">
              <AlertCircle className="size-4 shrink-0" />
              Something went wrong sending your request. Please try again, or email{" "}
              {siteConfig.email} directly.
            </p>
          ) : null}

          <Button
            ripple
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="shadow-glow w-full"
          >
            {status === "submitting" ? "Sending..." : "Get My Free Growth Audit"}
            {status === "submitting" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowRight className="size-4" />
            )}
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            No spam. No pressure. Response within one business day.
          </p>
        </form>
      </Form>
    </div>
  )
}
