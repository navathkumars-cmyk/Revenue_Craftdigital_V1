import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { TiltGlassCard } from "@/components/ui/tilt-glass-card"

interface ProcessStep {
  number: string
  title: string
  description: string
}

export const defaultProcessSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Audit & Measurement",
    description:
      "We audit your tracking, accounts, and unit economics before recommending a single dollar of spend — so every decision after this point is grounded in accurate data.",
  },
  {
    number: "02",
    title: "Strategy & Build",
    description:
      "We architect the tracking infrastructure, campaign structure, and testing roadmap, aligned to the metrics that actually move your business.",
  },
  {
    number: "03",
    title: "Launch & Optimize",
    description:
      "Campaigns go live inside a structured testing cadence — creative, audience, and bidding decisions are all validated against real conversion data.",
  },
  {
    number: "04",
    title: "Report & Compound",
    description:
      "Transparent, revenue-linked reporting each cycle, with a clear roadmap for the next 90 days of compounding improvement.",
  },
]

export function ProcessSteps({ steps = defaultProcessSteps }: { steps?: ProcessStep[] }) {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <StaggerItem key={step.number} className="h-full">
          <TiltGlassCard className="flex flex-col gap-3 p-6">
            <span className="text-brand-600 dark:text-brand-400 font-mono text-sm font-semibold">
              {step.number}
            </span>
            <h3 className="text-foreground font-semibold">{step.title}</h3>
            <p className="text-muted-foreground text-sm text-pretty">{step.description}</p>
          </TiltGlassCard>
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}
