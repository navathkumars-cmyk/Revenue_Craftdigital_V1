import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  className?: string
}

/** Eyebrow + display heading + supporting copy — the recurring header pattern
 * for every marketing section (services grid, industries, case studies, FAQ). */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span className="text-brand-700 dark:text-brand-400 text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-display-lg text-balance">{title}</h2>
      {description ? (
        <p className="text-muted-foreground text-lg text-pretty">{description}</p>
      ) : null}
    </div>
  )
}
