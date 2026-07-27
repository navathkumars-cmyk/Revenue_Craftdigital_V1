import { XCircle, CheckCircle2 } from "lucide-react"

import { comparisonRows } from "@/config/why-choose-us"
import { GlassCard } from "@/components/ui/glass-card"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"

export function WhyChooseUs() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <GlassCard className="p-6 sm:p-8">
        <h3 className="text-muted-foreground mb-6 font-semibold">Without a performance partner</h3>
        <StaggerGroup className="flex flex-col gap-5">
          {comparisonRows.map((row) => (
            <StaggerItem key={row.problem} className="flex items-start gap-3">
              <XCircle className="text-muted-foreground/60 mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <span className="text-muted-foreground text-sm text-pretty">{row.problem}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </GlassCard>

      <GlassCard strong className="shadow-glow p-6 sm:p-8">
        <h3 className="text-foreground mb-6 font-semibold">With Revenue Craft Digital</h3>
        <StaggerGroup className="flex flex-col gap-5">
          {comparisonRows.map((row) => (
            <StaggerItem key={row.outcome} className="flex items-start gap-3">
              <CheckCircle2 className="text-signal-600 mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <span className="text-foreground text-sm font-medium text-pretty">{row.outcome}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </GlassCard>
    </div>
  )
}
