export interface NavItem {
  label: string
  href: string
  description?: string
}

export type ServiceCategory =
  | "Paid Media"
  | "Tracking & Analytics"
  | "Conversion & CRO"
  | "Automation & AI"
  | "Video & Brand Production"

export interface Service {
  slug: string
  name: string
  category: ServiceCategory
  summary: string
  description: string
  /** Key into `iconRegistry` (src/lib/icon-registry.ts) — a string, not a
   * component, so this shape stays JSON-serializable for any CMS backend. */
  icon: string
  outcomes: string[]
}

export interface Industry {
  slug: string
  name: string
  summary: string
  /** Key into `iconRegistry` — see note on Service.icon. */
  icon: string
  /** Service slugs shown on this industry's detail page, curated per industry
   * rather than a generic top-3 — see note on the industry detail page. */
  relevantServiceSlugs: string[]
}

export interface CaseStudy {
  slug: string
  client: string
  industry: string
  headline: string
  summary: string
  challenge: string
  approach: string
  metrics: { label: string; value: string }[]
  logo?: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  avatar?: string
}

export interface FaqItem {
  question: string
  answer: string
}
