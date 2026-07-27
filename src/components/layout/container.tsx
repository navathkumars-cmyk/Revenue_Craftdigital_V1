import { cn } from "@/lib/utils"

interface ContainerProps extends React.ComponentProps<"div"> {
  narrow?: boolean
}

/** Page content rail: max-w-(page|narrow) with responsive gutters. */
export function Container({ narrow = false, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-8 lg:px-12",
        narrow ? "max-w-narrow" : "max-w-page",
        className
      )}
      {...props}
    />
  )
}
