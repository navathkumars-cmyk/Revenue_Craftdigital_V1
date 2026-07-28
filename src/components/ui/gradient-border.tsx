import { cn } from "@/lib/utils"

interface GradientBorderProps extends React.ComponentProps<"div"> {
  /** Border thickness in px. */
  thickness?: number
  /** Tailwind radius utility applied to both the outer gradient and inner content. */
  rounded?: string
  /** Background for the inner fill. Leave transparent (default) when wrapping
   * a `GlassCard`/`GlassPanel` so its backdrop-blur still sees through to
   * whatever sits behind this component. Pass "bg-background" (or similar)
   * when wrapping opaque content, so the gradient only shows as a thin ring. */
  innerClassName?: string
}

/**
 * Wraps children in a gradient-colored border using the padding trick: an
 * outer div paints the gradient and reserves `thickness` px of padding, an
 * inner div fills the rest with `innerClassName`. Pass the actual surface
 * (e.g. a `GlassCard`) as the child — this component only owns the border.
 */
export function GradientBorder({
  thickness = 1,
  rounded = "rounded-2xl",
  innerClassName,
  className,
  children,
  ...props
}: GradientBorderProps) {
  return (
    <div
      className={cn(
        "from-brand-400 via-brand-200 to-brand-500 dark:from-brand-400 dark:via-brand-600 dark:to-brand-800 bg-gradient-to-br",
        rounded,
        className
      )}
      style={{ padding: thickness }}
      {...props}
    >
      <div className={cn("h-full", rounded, innerClassName)}>{children}</div>
    </div>
  )
}
