import { cn } from "@/lib/utils"

interface SectionProps extends React.ComponentProps<"section"> {
  spacing?: "sm" | "md" | "lg"
}

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  sm: "py-12 md:py-16",
  md: "py-20 md:py-28",
  lg: "py-28 md:py-40",
}

/** Standard vertical rhythm wrapper for marketing page sections. */
export function Section({ spacing = "md", className, ...props }: SectionProps) {
  return <section className={cn(spacingClasses[spacing], className)} {...props} />
}
