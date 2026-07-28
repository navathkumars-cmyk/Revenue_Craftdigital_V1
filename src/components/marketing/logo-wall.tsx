const verifiedClients = ["Northwind", "Vantage Health", "Fieldstone"]

/** Only names with a matching case study and named testimonial belong here —
 * this row sits under a "trusted by" claim, so nothing unverified goes in it.
 * Swap for real client logos (SVG, currentColor fill) once available. */
export function LogoWall() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale">
      {verifiedClients.map((name) => (
        <span key={name} className="text-muted-foreground text-lg font-semibold tracking-tight">
          {name}
        </span>
      ))}
    </div>
  )
}
