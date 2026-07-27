import Link from "next/link"
import { ArrowRight, Target, TrendingUp, Eye, RefreshCw } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { TiltCard } from "@/components/motion/tilt-card"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { Eyebrow, Heading, Text } from "@/components/ui/typography"

const principles = [
  { icon: Eye, label: "Measurement before media" },
  { icon: TrendingUp, label: "Revenue over vanity metrics" },
  { icon: Target, label: "Transparent, no black-box reporting" },
  { icon: RefreshCw, label: "90-day cycles, not lock-in contracts" },
]

export function AboutSection() {
  return (
    <Section>
      <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>About Revenue Craft Digital</Eyebrow>
          <Heading as="h2" size="lg">
            We got tired of watching good businesses waste spend on broken measurement.
          </Heading>
          <Text muted>
            Most &quot;underperforming&quot; ad accounts aren&apos;t actually underperforming —
            they&apos;re being optimized against the wrong data: undercounted conversions,
            misfired pixels, and dashboards nobody on the leadership team actually trusts.
          </Text>
          <Text muted>
            Revenue Craft Digital rebuilds the measurement layer first, then the media. It&apos;s
            a less exciting pitch than a flashy campaign relaunch — but it&apos;s the difference
            between guessing and knowing exactly what&apos;s driving revenue.
          </Text>
          <div>
            <Button ripple size="lg" variant="outline" render={<Link href="/about" />}>
              Read Our Full Story
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative overflow-hidden rounded-2xl">
          <GradientMesh variant="subtle" />
          <TiltCard maxTilt={4} className="rounded-2xl">
            <GlassCard strong className="p-6 sm:p-8">
              <h3 className="text-foreground mb-5 font-semibold">What guides every engagement</h3>
              <StaggerGroup className="flex flex-col gap-4">
                {principles.map((principle) => {
                  const Icon = principle.icon
                  return (
                    <StaggerItem key={principle.label} className="flex items-center gap-3">
                      <span className="bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex size-9 shrink-0 items-center justify-center rounded-lg">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="text-foreground text-sm font-medium">{principle.label}</span>
                    </StaggerItem>
                  )
                })}
              </StaggerGroup>
            </GlassCard>
          </TiltCard>
        </Reveal>
      </Container>
    </Section>
  )
}
