export interface TechStackItem {
  name: string
  category: "Paid Media" | "Tracking & Analytics" | "CRM & Automation"
  /** Key into `iconRegistry` (src/lib/icon-registry.ts). */
  icon: string
}

export const techStack: TechStackItem[] = [
  { name: "Google Ads Manager", category: "Paid Media", icon: "search" },
  { name: "Meta Business Suite", category: "Paid Media", icon: "share-2" },
  { name: "Google Analytics 4", category: "Tracking & Analytics", icon: "bar-chart-3" },
  { name: "Google Tag Manager", category: "Tracking & Analytics", icon: "tags" },
  { name: "Meta Pixel & Conversions API", category: "Tracking & Analytics", icon: "radar" },
  { name: "Server-Side Tagging", category: "Tracking & Analytics", icon: "server-cog" },
  { name: "CRM & Pipeline Sync", category: "CRM & Automation", icon: "workflow" },
  { name: "WhatsApp Business API", category: "CRM & Automation", icon: "message-circle" },
]

export const techStackCategories = ["Paid Media", "Tracking & Analytics", "CRM & Automation"] as const
