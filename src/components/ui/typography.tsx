import { cn } from "@/lib/utils"

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
type DisplaySize = "2xl" | "xl" | "lg" | "md" | "sm"

interface HeadingProps extends React.ComponentProps<"h1"> {
  as?: HeadingTag
  /** Maps to the --text-display-* fluid type scale defined in globals.css. */
  size?: DisplaySize
  balance?: boolean
}

const displaySizeClass: Record<DisplaySize, string> = {
  "2xl": "text-display-2xl",
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-display-sm",
}

/** The only place display-scale headings should be built from scratch —
 * prefer this over hardcoding `text-display-*` + `as` tags directly. */
export function Heading({ as: Tag = "h2", size = "lg", balance = true, className, ...props }: HeadingProps) {
  return <Tag className={cn(displaySizeClass[size], balance && "text-balance", className)} {...props} />
}

/** Small uppercase label that precedes a Heading (e.g. "What we do"). */
export function Eyebrow({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-brand-700 dark:text-brand-400 text-sm font-semibold tracking-wide uppercase",
        className
      )}
      {...props}
    />
  )
}

/** Large supporting paragraph directly under a Heading. */
export function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-muted-foreground text-lg text-pretty sm:text-xl", className)} {...props} />
  )
}

/** Default body copy. */
export function Text({
  muted = false,
  className,
  ...props
}: React.ComponentProps<"p"> & { muted?: boolean }) {
  return (
    <p className={cn("text-base text-pretty", muted ? "text-muted-foreground" : "text-foreground", className)} {...props} />
  )
}
