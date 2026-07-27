export interface LeadPayload {
  /** Which form this came from — useful for tagging/routing in the destination. */
  source: "contact" | "growth-audit"
  name: string
  email: string
  phone?: string
  company?: string
  businessType?: string
  monthlyBudget?: string
  message?: string
  submittedAt: string
}

export interface LeadDestination {
  /** Unique key, used in dispatch results and log output. */
  key: string
  /** Whether this destination has the env vars it needs to run. The
   * dispatcher skips destinations that return false instead of failing
   * the whole request — that's what lets you enable exactly the backends
   * you've actually set up. */
  isConfigured(): boolean
  send(payload: LeadPayload): Promise<void>
}
