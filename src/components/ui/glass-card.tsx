import { cn } from "@/lib/utils"
import { GlassPanel } from "@/components/ui/glass-panel"

/**
 * A Card built on the frosted-glass surface instead of the opaque `bg-card`
 * token. Reuses Card's internal spacing rhythm — pair with CardHeader /
 * CardTitle / CardDescription / CardContent / CardFooter from "@/components/ui/card"
 * for consistent internal layout.
 */
function GlassCard({ className, strong, ...props }: React.ComponentProps<"div"> & { strong?: boolean }) {
  return (
    <GlassPanel
      data-slot="card"
      strong={strong}
      className={cn("group/card flex flex-col gap-4 py-4 text-sm", className)}
      {...props}
    />
  )
}

export { GlassCard }
