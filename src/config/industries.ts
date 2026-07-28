import type { Industry } from "@/types"

export const industries: Industry[] = [
  {
    slug: "startups",
    name: "Startups",
    summary: "Go-to-market and paid acquisition systems built for capital-efficient growth.",
    icon: "rocket",
    relevantServiceSlugs: ["google-ads", "performance-marketing", "conversion-tracking"],
  },
  {
    slug: "saas",
    name: "SaaS Companies",
    summary: "Demand generation engineered around trial starts, activation, and expansion revenue.",
    icon: "cloud",
    relevantServiceSlugs: ["google-ads", "marketing-automation", "crm-integration"],
  },
  {
    slug: "local-businesses",
    name: "Local Businesses",
    summary: "Location-based campaigns that convert nearby search intent into booked visits.",
    icon: "store",
    relevantServiceSlugs: ["google-ads", "landing-page-optimization", "whatsapp-lead-generation"],
  },
  {
    slug: "franchises",
    name: "Franchises",
    summary: "Multi-location campaign frameworks with centralized reporting and local flexibility.",
    icon: "building-2",
    relevantServiceSlugs: ["performance-marketing", "crm-integration", "google-analytics-4"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    summary: "Compliant patient acquisition strategies built around appointment bookings.",
    icon: "heart-pulse",
    relevantServiceSlugs: ["google-ads", "landing-page-optimization", "conversion-tracking"],
  },
  {
    slug: "education",
    name: "Education",
    summary: "Enrollment funnels engineered for admissions cycles and program inquiries.",
    icon: "graduation-cap",
    relevantServiceSlugs: ["google-ads", "marketing-automation", "landing-page-optimization"],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    summary: "Full-funnel acquisition and retention systems built around profitable ROAS.",
    icon: "shopping-cart",
    relevantServiceSlugs: ["meta-ads", "conversion-rate-optimization", "server-side-tracking"],
  },
  {
    slug: "d2c-brands",
    name: "D2C Brands",
    summary: "Creative-led performance campaigns tuned for repeat purchase and LTV.",
    icon: "package",
    relevantServiceSlugs: ["meta-ads", "video-production", "ai-powered-marketing"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    summary: "Lead generation systems built around inventory, listings, and buyer intent.",
    icon: "home",
    relevantServiceSlugs: ["google-ads", "landing-page-optimization", "whatsapp-lead-generation"],
  },
  {
    slug: "b2b-companies",
    name: "B2B Companies",
    summary: "Pipeline-focused campaigns aligned to sales cycles and account-based targeting.",
    icon: "briefcase",
    relevantServiceSlugs: ["google-ads", "crm-integration", "ai-pre-sales"],
  },
]
