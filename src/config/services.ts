import type { Service } from "@/types"

export const services: Service[] = [
  {
    slug: "google-ads",
    name: "Google Ads",
    category: "Paid Media",
    summary: "Search, Shopping, and Performance Max campaigns engineered for intent-driven revenue.",
    description:
      "We build and manage Google Ads accounts around a single objective: profitable, repeatable revenue. Every campaign structure, bid strategy, and asset is tied back to tracked conversions, not vanity clicks.",
    icon: "search",
    outcomes: ["Lower cost per qualified lead", "Higher Quality Score", "Scalable Performance Max structure"],
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    category: "Paid Media",
    summary: "Facebook and Instagram campaigns built on first-party signal and creative testing systems.",
    description:
      "Our Meta Ads programs combine structured creative testing with clean pixel and conversion API data, so spend moves toward what is proven to convert — not what merely gets attention.",
    icon: "share-2",
    outcomes: ["Structured creative testing cadence", "Improved ROAS stability", "Full-funnel retargeting logic"],
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    category: "Paid Media",
    summary: "Channel-agnostic strategy that allocates budget to whatever provably drives revenue.",
    description:
      "A performance marketing strategy sits above any single platform. We model your unit economics, define the metrics that matter, and route budget across channels based on measured return.",
    icon: "trending-up",
    outcomes: ["Unified measurement framework", "Cross-channel budget allocation", "Revenue-first reporting"],
  },
  {
    slug: "conversion-tracking",
    name: "Conversion Tracking",
    category: "Tracking & Analytics",
    summary: "Accurate, deduplicated conversion data across every platform you advertise on.",
    description:
      "Broken or partial tracking is the single biggest cause of wasted ad spend. We audit, rebuild, and validate your conversion tracking so every platform optimizes against the truth.",
    icon: "target",
    outcomes: ["Deduplicated cross-platform events", "Offline & online conversion matching", "Audit-backed data accuracy"],
  },
  {
    slug: "google-analytics-4",
    name: "Google Analytics 4",
    category: "Tracking & Analytics",
    summary: "GA4 implementations that connect marketing spend to real business outcomes.",
    description:
      "We architect GA4 properties, event schemas, and reporting views around your actual revenue model — so leadership can see what is working without wading through raw event data.",
    icon: "bar-chart-3",
    outcomes: ["Custom event & funnel schema", "Revenue-linked reporting views", "Clean cross-domain measurement"],
  },
  {
    slug: "google-tag-manager",
    name: "Google Tag Manager",
    category: "Tracking & Analytics",
    summary: "A single, auditable source of truth for every tag, pixel, and tracking script.",
    description:
      "We consolidate fragmented tracking into a documented GTM container architecture, reducing page bloat, tag conflicts, and the risk of silent tracking failures.",
    icon: "tags",
    outcomes: ["Documented container architecture", "Version-controlled deployments", "Reduced page load impact"],
  },
  {
    slug: "meta-pixel",
    name: "Meta Pixel",
    category: "Tracking & Analytics",
    summary: "Pixel and Conversions API implementations built for iOS 14+ and cookieless reality.",
    description:
      "We implement Meta Pixel alongside server-side Conversions API so your optimization signal survives browser restrictions, ad blockers, and platform-level tracking changes.",
    icon: "radar",
    outcomes: ["Browser + server signal matching", "Higher event match quality score", "Resilient long-term tracking"],
  },
  {
    slug: "server-side-tracking",
    name: "Server-Side Tracking",
    category: "Tracking & Analytics",
    summary: "First-party, server-hosted tracking infrastructure built for accuracy and durability.",
    description:
      "Server-side tagging routes conversion data through infrastructure you control, improving data accuracy, page speed, and resilience against browser-level tracking restrictions.",
    icon: "server-cog",
    outcomes: ["First-party data infrastructure", "Improved site speed", "Future-proofed measurement"],
  },
  {
    slug: "landing-page-optimization",
    name: "Landing Page Optimization",
    category: "Conversion & CRO",
    summary: "High-intent landing experiences engineered around a single conversion action.",
    description:
      "We design and iterate landing pages using structured hypotheses and real user data, aligning page narrative, speed, and layout with the intent behind every campaign that drives traffic to it.",
    icon: "layout-template",
    outcomes: ["Higher on-page conversion rate", "Faster Core Web Vitals", "Message-match with ad creative"],
  },
  {
    slug: "conversion-rate-optimization",
    name: "Conversion Rate Optimization",
    category: "Conversion & CRO",
    summary: "Structured testing programs that compound conversion rate improvements over time.",
    description:
      "CRO at Revenue Craft Digital is a research-backed discipline: heuristic audits, session analysis, and controlled experiments that turn existing traffic into measurably more revenue.",
    icon: "flask-conical",
    outcomes: ["Prioritized testing roadmap", "Statistically validated wins", "Compounding conversion lift"],
  },
  {
    slug: "crm-integration",
    name: "CRM Integration",
    category: "Automation & AI",
    summary: "Closed-loop reporting that connects ad spend to pipeline and closed revenue.",
    description:
      "We connect your ad platforms to your CRM so lead quality, sales-qualified conversion, and closed revenue flow back into the same reporting layer that guides ad optimization.",
    icon: "workflow",
    outcomes: ["Closed-loop attribution", "Lead-to-revenue visibility", "Sales & marketing alignment"],
  },
  {
    slug: "marketing-automation",
    name: "Marketing Automation",
    category: "Automation & AI",
    summary: "Automated nurture, scoring, and follow-up systems that shorten sales cycles.",
    description:
      "We build automation sequences across email, SMS, and CRM workflows so every lead is scored, routed, and nurtured consistently — without manual follow-up bottlenecks.",
    icon: "workflow",
    outcomes: ["Automated lead scoring", "Faster response times", "Consistent nurture sequences"],
  },
  {
    slug: "whatsapp-lead-generation",
    name: "WhatsApp Lead Generation",
    category: "Automation & AI",
    summary: "Conversation-first lead capture built for markets where WhatsApp drives decisions.",
    description:
      "We design Click-to-WhatsApp ad flows and automated response systems that convert interest into qualified conversation, without losing the personal touch that drives trust.",
    icon: "message-circle",
    outcomes: ["Higher response-to-lead rate", "Automated qualification flows", "Reduced lead response time"],
  },
  {
    slug: "ai-powered-marketing",
    name: "AI-Powered Marketing Solutions",
    category: "Automation & AI",
    summary: "AI-assisted creative, bidding, and audience systems layered on clean first-party data.",
    description:
      "We apply AI where it measurably improves outcomes — creative variant generation, predictive bidding signals, and audience modeling — always grounded in accurate first-party data.",
    icon: "sparkles",
    outcomes: ["AI-assisted creative testing", "Predictive audience signals", "Faster iteration cycles"],
  },
  {
    slug: "ai-pre-sales",
    name: "AI-Powered Pre-Sales",
    category: "Automation & AI",
    summary: "AI tools that qualify and engage every lead before your team ever picks up the phone.",
    description:
      "We run pre-sales qualification through AI-powered tools instead of tying up your team's time — engaging every inbound lead in real time, answering first-round questions, and surfacing only sales-ready conversations for your calendar.",
    icon: "bot",
    outcomes: ["Higher share of sales-ready leads", "Real-time AI lead qualification", "Less time lost to unqualified calls"],
  },
  {
    slug: "video-production",
    name: "Video & Brand Production",
    category: "Video & Brand Production",
    summary: "Product and service video shoots engineered to generate leads and build market presence.",
    description:
      "We plan and produce product and service video shoots — brand films, demo videos, and short-form ad creative — built to convert cold audiences, not just look polished. Every shoot ties into a distribution and lead-generation plan that establishes your brand in the market.",
    icon: "clapperboard",
    outcomes: ["On-location product & service shoots", "Brand films built for paid distribution", "Video creative engineered for lead generation"],
  },
]

export const serviceCategories = [
  "Paid Media",
  "Tracking & Analytics",
  "Conversion & CRO",
  "Automation & AI",
  "Video & Brand Production",
] as const
