"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

import { siteConfig } from "@/config/site"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientBorder } from "@/components/ui/gradient-border"
import { Reveal } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"
import { StatCounter } from "@/components/marketing/stat-counter"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { FloatingShape } from "@/components/motion/floating-shape"
import { MagneticButton } from "@/components/motion/magnetic-button"
import { TiltCard } from "@/components/motion/tilt-card"
import { ParallaxLayer } from "@/components/motion/parallax-layer"
import { GrowthAuditForm } from "@/components/forms/growth-audit-form"
import { fadeUp, floatLoop } from "@/lib/animations"

const heroStats = [
  { value: 4.2, suffix: "x", decimals: 1, label: "Average ROAS improvement" },
  { value: 38, suffix: "%", label: "Lower cost per qualified lead" },
  { value: 120, suffix: "+", label: "Performance campaigns managed" },
]

const trustBadges = ["No Long-Term Contracts", "100% Performance Tracked", "24-Hour Response Time"]

function FloatingFormFrame({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <motion.div animate={prefersReducedMotion ? undefined : floatLoop(6, 8)}>{children}</motion.div>
  )
}

export function Hero() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <ParallaxLayer className="absolute inset-0 -z-10" speed={0.15}>
        <GradientMesh />
        <FloatingShape className="bg-brand-300/30 top-24 left-[6%] size-16 rounded-2xl blur-xl hidden lg:block" duration={7} />
        <FloatingShape className="bg-signal-400/25 top-1/4 right-[38%] size-12 rounded-full blur-lg hidden lg:block" duration={5} delay={0.5} />
        <FloatingShape className="bg-brand-400/20 bottom-24 left-[12%] size-10 rounded-full blur-lg hidden lg:block" duration={8} delay={1} />
      </ParallaxLayer>

      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* Left: copy, trust signals, stats, CTAs */}
        <div className="flex flex-col gap-8">
          <Reveal variants={fadeUp}>
            <Badge variant="secondary" className="gap-1.5 rounded-full px-4 py-1.5">
              Free Growth Audit — No Obligation
            </Badge>
          </Reveal>

          <h1 className="text-display-2xl text-balance">
            <TextReveal text="Turn ad spend into" />{" "}
            <TextReveal
              text="predictable revenue."
              delay={0.24}
              className="from-brand-600 to-brand-400 bg-gradient-to-r bg-clip-text text-transparent"
            />
          </h1>

          <Reveal variants={fadeUp} delay={0.35}>
            <p className="text-muted-foreground max-w-xl text-lg text-pretty sm:text-xl">
              Get a free, no-obligation Growth Audit and see exactly where your Google Ads, Meta
              Ads, and tracking setup are leaking revenue — plus the fixes that would move the
              needle fastest.
            </p>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.4} className="flex flex-wrap gap-2.5">
            {trustBadges.map((label) => (
              <Badge key={label} variant="outline" className="gap-1.5 rounded-full py-1.5">
                <CheckCircle2 className="text-signal-600 size-3.5" />
                {label}
              </Badge>
            ))}
          </Reveal>

          <Reveal variants={fadeUp} delay={0.45} className="flex flex-col gap-3 sm:flex-row">
            <MagneticButton>
              <Button ripple size="lg" render={<Link href="#growth-audit-form" />}>
                {siteConfig.cta.primary}
                <ArrowRight className="size-4" />
              </Button>
            </MagneticButton>
            <Button size="lg" variant="outline" render={<Link href="/case-studies" />}>
              See Case Studies
            </Button>
          </Reveal>

          <Reveal
            variants={fadeUp}
            delay={0.5}
            className="border-border/60 grid w-full max-w-lg grid-cols-1 gap-8 border-t pt-8 sm:grid-cols-3"
          >
            {heroStats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </Reveal>
        </div>

        {/* Right: premium lead form */}
        <Reveal variants={fadeUp} delay={0.15}>
          <FloatingFormFrame>
            <GradientBorder className="shadow-glow mx-auto max-w-md lg:max-w-none">
              <TiltCard maxTilt={4} className="rounded-2xl">
                <GlassCard strong className="py-0">
                  <GrowthAuditForm id="growth-audit-form" />
                </GlassCard>
              </TiltCard>
            </GradientBorder>
          </FloatingFormFrame>
        </Reveal>
      </Container>
    </Section>
  )
}
