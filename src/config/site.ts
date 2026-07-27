import type { NavItem } from "@/types"

export const siteConfig = {
  name: "Revenue Craft Digital",
  shortName: "Revenue Craft",
  tagline: "Performance Marketing, Engineered for Revenue.",
  description:
    "Revenue Craft Digital partners with ambitious businesses to engineer measurable growth through data-driven performance marketing — Google Ads, Meta Ads, conversion tracking, and AI-powered marketing systems built to compound revenue.",
  url: "https://www.revenuecraftdigital.com",
  email: "hello@revenuecraftdigital.com",
  links: {
    linkedin: "https://www.linkedin.com/company/revenuecraftdigital",
    instagram: "https://www.instagram.com/revenuecraftdigital",
  },
  cta: {
    primary: "Book a Strategy Call",
    secondary: "Explore Services",
  },
} as const

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
]

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { label: "Google Ads", href: "/services/google-ads" },
      { label: "Meta Ads", href: "/services/meta-ads" },
      { label: "Conversion Rate Optimization", href: "/services/conversion-rate-optimization" },
      { label: "Marketing Automation", href: "/services/marketing-automation" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Industries",
    items: [
      { label: "SaaS Companies", href: "/industries/saas" },
      { label: "E-commerce & D2C", href: "/industries/ecommerce" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Real Estate", href: "/industries/real-estate" },
    ],
  },
]
