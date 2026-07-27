import { ArrowUpRight } from "lucide-react"

import type { CaseStudy } from "@/types"
import { TiltGlassCard } from "@/components/ui/tilt-glass-card"

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <TiltGlassCard href={`/case-studies/${study.slug}`} className="p-6">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm font-medium">{study.industry}</span>
        <ArrowUpRight className="text-muted-foreground size-4 transition-transform duration-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <h3 className="text-foreground mt-4 text-lg font-semibold text-balance">{study.headline}</h3>
      <p className="text-muted-foreground mt-2 text-sm text-pretty">{study.summary}</p>
      <dl className="border-border/60 mt-6 grid grid-cols-3 gap-2 border-t pt-4">
        {study.metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground text-xs">{metric.label}</dt>
            <dd className="text-brand-700 dark:text-brand-400 font-mono text-sm font-semibold">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </TiltGlassCard>
  )
}
