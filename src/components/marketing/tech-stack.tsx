import { techStack } from "@/config/tech-stack"
import { ContentIcon } from "@/components/ui/content-icon"
import { TiltGlassCard } from "@/components/ui/tilt-glass-card"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { AnimatedIcon } from "@/components/motion/animated-icon"

export function TechStack() {
  return (
    <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {techStack.map((tool) => (
        <StaggerItem key={tool.name} className="h-full">
          <TiltGlassCard maxTilt={8} className="flex flex-col items-center gap-3 p-5 text-center">
            <span className="bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex size-11 items-center justify-center rounded-xl">
              <AnimatedIcon effect="scale">
                <ContentIcon name={tool.icon} className="size-5" />
              </AnimatedIcon>
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-foreground text-sm font-medium text-balance">{tool.name}</span>
              <span className="text-muted-foreground text-xs">{tool.category}</span>
            </div>
          </TiltGlassCard>
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}
