import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import type { Service } from "@/types"
import { cn } from "@/lib/utils"
import { ContentIcon } from "@/components/ui/content-icon"
import { TiltCard } from "@/components/motion/tilt-card"
import { AnimatedIcon } from "@/components/motion/animated-icon"

export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  return (
    <TiltCard className={cn("rounded-2xl", className)}>
      <Link
        href={`/services/${service.slug}`}
        className="glass hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-glow group flex h-full flex-col gap-4 rounded-2xl p-6 transition-all duration-base ease-out-expo"
      >
        <div className="bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex size-11 items-center justify-center rounded-xl">
          <AnimatedIcon effect="rotate">
            <ContentIcon name={service.icon} className="size-5" />
          </AnimatedIcon>
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-foreground font-semibold">{service.name}</h3>
          <p className="text-muted-foreground text-sm text-pretty">{service.summary}</p>
        </div>
        <span className="text-brand-700 dark:text-brand-400 mt-auto inline-flex items-center gap-1 text-sm font-medium">
          Learn more
          <ArrowUpRight className="size-4 transition-transform duration-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </TiltCard>
  )
}
