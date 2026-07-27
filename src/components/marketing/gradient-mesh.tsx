import { cn } from "@/lib/utils"

interface GradientMeshProps {
  className?: string
  /** Reduce blob count/size for tighter sections (e.g. cards) vs full hero backdrops. */
  variant?: "hero" | "subtle"
}

/**
 * Decorative, non-interactive gradient-mesh backdrop. Place inside a
 * `relative` container as the first child; it fills via `absolute inset-0`.
 * Colors come from the --mesh-* tokens so it stays on-brand automatically.
 */
export function GradientMesh({ className, variant = "hero" }: GradientMeshProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "bg-mesh-1 absolute rounded-full blur-3xl motion-safe:animate-mesh-drift",
          variant === "hero" ? "-top-32 -left-24 size-[32rem] opacity-70" : "-top-16 -left-16 size-64 opacity-40"
        )}
      />
      <div
        className={cn(
          "bg-mesh-2 absolute rounded-full blur-3xl motion-safe:animate-mesh-drift-slow",
          variant === "hero" ? "top-1/3 -right-32 size-[28rem] opacity-60" : "top-1/4 -right-16 size-56 opacity-30"
        )}
      />
      {variant === "hero" ? (
        <div className="bg-mesh-3 motion-safe:animate-mesh-drift absolute bottom-[-8rem] left-1/3 size-[26rem] rounded-full opacity-50 blur-3xl [animation-delay:-3s]" />
      ) : null}
    </div>
  )
}
