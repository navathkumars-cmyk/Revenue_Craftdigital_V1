import type { CaseStudy } from "@/types"

export const caseStudies: CaseStudy[] = [
  {
    slug: "northwind-saas",
    client: "Northwind SaaS",
    industry: "SaaS",
    headline: "Rebuilding measurement first, then rebuilding growth.",
    summary:
      "A broken GA4 and CRM handoff meant Northwind couldn't see which campaigns drove trial-to-paid conversion. We rebuilt tracking end to end before touching a single campaign.",
    challenge:
      "Northwind's GA4 and CRM handoff had drifted out of sync, so the team couldn't trace which campaigns actually produced trial-to-paid customers. Budget was being allocated on gut feel, and every optimization decision downstream was built on numbers nobody fully trusted.",
    approach:
      "Before touching a single campaign, we rebuilt the tracking layer end to end: clean GA4 event architecture, a repaired CRM handoff so trial signups matched paid conversions one-to-one, and a reporting model tied to trial-to-paid revenue instead of clicks. Only once that foundation was verified did we start reallocating spend.",
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
    challenge:
      "Fieldstone wanted to scale Meta Ads spend to hit an aggressive growth target, but every prior attempt to increase budget had eroded margins — new spend chased diminishing returns because creative and audience decisions weren't backed by reliable signal.",
    approach:
      "We stood up server-side Conversions API tracking so campaign data held up as iOS attribution degraded, then ran a structured creative testing cadence — new concepts validated on a fixed cycle against blended CAC, not vanity metrics — before scaling any single ad set.",
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
    challenge:
      "Vantage's twelve locations were each running local campaigns with no shared reporting standard, so leadership had no consolidated view of performance and every location's team was assembling reports manually every week.",
    approach:
      "We built a franchise-ready measurement framework: one reporting layer that rolled every location's numbers up to a single dashboard, while keeping enough local flexibility for each location to run campaigns suited to its own market and appointment volume.",
    metrics: [
      { label: "Locations onboarded", value: "12" },
      { label: "Booked appointments", value: "+44%" },
      { label: "Reporting hours saved / week", value: "6 hrs" },
    ],
  },
]
