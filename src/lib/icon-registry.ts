import {
  Search,
  Share2,
  TrendingUp,
  Target,
  BarChart3,
  Tags,
  Radar,
  ServerCog,
  LayoutTemplate,
  FlaskConical,
  Workflow,
  MessageCircle,
  Sparkles,
  Rocket,
  Cloud,
  Store,
  Building2,
  HeartPulse,
  GraduationCap,
  ShoppingCart,
  Package,
  Home,
  Briefcase,
  HelpCircle,
  Bot,
  Clapperboard,
  type LucideIcon,
} from "lucide-react"

/**
 * String-keyed icon registry. Content models (Service, Industry, TechStackItem)
 * store an icon *name* rather than a component reference, because any real
 * CMS (Sanity/Contentful/Strapi/WordPress) can only return JSON-serializable
 * data — a live React component can never come back from a content API.
 * Add new icons here, then reference the key from config/CMS data.
 */
export const iconRegistry: Record<string, LucideIcon> = {
  search: Search,
  "share-2": Share2,
  "trending-up": TrendingUp,
  target: Target,
  "bar-chart-3": BarChart3,
  tags: Tags,
  radar: Radar,
  "server-cog": ServerCog,
  "layout-template": LayoutTemplate,
  "flask-conical": FlaskConical,
  workflow: Workflow,
  "message-circle": MessageCircle,
  sparkles: Sparkles,
  rocket: Rocket,
  cloud: Cloud,
  store: Store,
  "building-2": Building2,
  "heart-pulse": HeartPulse,
  "graduation-cap": GraduationCap,
  "shopping-cart": ShoppingCart,
  package: Package,
  home: Home,
  briefcase: Briefcase,
  bot: Bot,
  clapperboard: Clapperboard,
}

/** Resolves an icon name to its component, falling back to a generic icon
 * for unknown names (e.g. a CMS editor typos an icon key) instead of crashing. */
export function resolveIcon(name: string): LucideIcon {
  return iconRegistry[name] ?? HelpCircle
}
