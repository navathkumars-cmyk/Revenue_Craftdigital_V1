import { cn } from "@/lib/utils"

interface GlassPanelProps extends React.ComponentProps<"div"> {
  /** Stronger fill for panels that need to read clearly over busy backgrounds
   * (e.g. sitting directly on top of a GradientMesh or photo). */
  strong?: boolean
}

/**
 * Frosted-glass surface (see `.glass` in globals.css). Needs a backdrop behind
 * it — a GradientMesh, image, or colored section — to actually read as glass;
 * on a flat background it just looks like a translucent card.
 */
export function GlassPanel({ strong = false, className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn("glass rounded-2xl", strong && "glass-strong", className)}
      {...props}
    />
  )
}
