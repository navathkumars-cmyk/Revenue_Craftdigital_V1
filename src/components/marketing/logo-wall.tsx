const placeholderClients = ["Northwind", "Vantage Health", "Ledger&Co", "Brightloop", "Kavara", "Fieldstone"]

/** Swap these text marks for real client logos (SVG, currentColor fill) once available. */
export function LogoWall() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale">
      {placeholderClients.map((name) => (
        <span key={name} className="text-muted-foreground text-lg font-semibold tracking-tight">
          {name}
        </span>
      ))}
    </div>
  )
}
