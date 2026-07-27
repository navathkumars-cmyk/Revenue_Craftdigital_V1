import Link from "next/link"

import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import { TiltCard } from "@/components/motion/tilt-card"

interface TiltGlassCardProps extends React.ComponentProps<"div"> {
  maxTilt?: number
  strong?: boolean
  /** If set, the whole card becomes a link (TiltCard > Link > GlassCard) —
   * used for clickable previews (service, industry, case study cards).
   * Omit for static content cards (testimonials, process steps, metrics). */
  href?: string
  /** Extra classes for the outer TiltCard wrapper, e.g. "h-full". */
  wrapperClassName?: string
}

/**
 * The "hover-tilting glass surface" pattern repeated across ServiceCard,
 * TestimonialCard, ProcessSteps, case study previews, industry cards, and
 * the tech stack grid. Centralizing it here means the hover-glow treatment
 * and default tilt angle only need to change in one place.
 */
export function TiltGlassCard({
  maxTilt = 6,
  strong,
  href,
  wrapperClassName,
  className,
  children,
  ...props
}: TiltGlassCardProps) {
  const surface = (
    <GlassCard
      strong={strong}
      className={cn("hover:shadow-glow h-full transition-shadow duration-slow", className)}
      {...props}
    >
      {children}
    </GlassCard>
  )

  return (
    <TiltCard maxTilt={maxTilt} className={cn("h-full rounded-2xl", wrapperClassName)}>
      {href ? (
        <Link href={href} className="group block h-full">
          {surface}
        </Link>
      ) : (
        surface
      )}
    </TiltCard>
  )
}
