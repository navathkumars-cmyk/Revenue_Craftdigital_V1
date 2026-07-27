import type { CaseStudy } from "@/types"

export const caseStudies: CaseStudy[] = [
  {
    slug: "northwind-saas",
    client: "Northwind SaaS",
    industry: "SaaS",
    headline: "Rebuilding measurement first, then rebuilding growth.",
    summary:
      "A broken GA4 and CRM handoff meant Northwind couldn't see which campaigns drove trial-to-paid conversion. We rebuilt tracking end to end before touching a single campaign.",
    metrics: [
      { label: "Cost per qualified lead", value: "-33%" },
      { label: "Trial-to-paid conversion", value: "+21%" },
      { label: "Time to clean reporting", value: "3 weeks" },
    ],
  },
  {
    slug: "fieldstone-d2c",
    client: "Fieldstone",
    industry: "D2C / E-commerce",
    headline: "Creative testing systems that scaled ROAS profitably.",
    summary:
      "Fieldstone needed to scale Meta Ads spend without eroding margins. A structured creative testing cadence and clean Conversions API data got them there.",
    metrics: [
      { label: "Return on ad spend", value: "4.2x" },
      { label: "Ad spend scaled", value: "+65%" },
      { label: "Blended CAC", value: "-18%" },
    ],
  },
  {
    slug: "vantage-health",
    client: "Vantage Health Group",
    industry: "Healthcare",
    headline: "One reporting layer across twelve franchise locations.",
    summary:
      "Vantage needed centralized reporting with local campaign flexibility across a multi-location footprint. We built a franchise-ready measurement and reporting framework.",
    metrics: [
      { label: "Locations onboarded", value: "12" },
      { label: "Booked appointments", value: "+44%" },
      { label: "Reporting hours saved / week", value: "6 hrs" },
    ],
  },
]
