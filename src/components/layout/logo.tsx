import Image from "next/image"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  iconSize?: number
  /** Set false for icon-only placements (e.g. a compact loading state). */
  wordmark?: boolean
  /** LCP-relevant placements (header) should preload; others shouldn't. */
  priority?: boolean
}

/**
 * The real brand icon (extracted from the client's logo artwork, see
 * scripts/process-logo.mjs) paired with the wordmark as live, theme-aware
 * text. The icon itself is colorful and works on any background, but the
 * source logo's wordmark is fixed black — rendering the name as text
 * instead of baking it into the image keeps it legible in dark mode and
 * crisp at any size, and is the single place every header/footer/loading
 * placement pulls the mark from.
 */
export function Logo({ className, iconSize = 28, wordmark = true, priority = false }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2 font-semibold tracking-tight", className)}>
      <Image
        src="/brand-icon.png"
        alt=""
        width={iconSize}
        height={iconSize}
        priority={priority}
        className="shrink-0"
      />
      {wordmark ? <span className="whitespace-nowrap">{siteConfig.name}</span> : null}
    </span>
  )
}
