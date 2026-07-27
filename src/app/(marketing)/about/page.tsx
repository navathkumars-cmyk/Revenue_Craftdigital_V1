import { buildMetadata } from "@/lib/seo"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/marketing/section-heading"
import { ProcessSteps } from "@/components/marketing/process-steps"
import { CtaSection } from "@/components/marketing/cta-section"
import { StatCounter } from "@/components/marketing/stat-counter"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { Reveal } from "@/components/motion/reveal"

export const metadata = buildMetadata({
  title: "About",
  description: "Revenue Craft Digital partners with ambitious businesses to engineer measurable growth through data-driven performance marketing.",
  path: "/about",
})

const stats = [
  { value: 120, suffix: "+", label: "Performance campaigns managed" },
  { value: 4.2, decimals: 1, suffix: "x", label: "Average ROAS improvement" },
  { value: 12, suffix: "M+", label: "In tracked ad spend" },
]

export default function AboutPage() {
  return (
    <>
      <Section spacing="lg" className="relative overflow-hidden">
        <GradientMesh />
        <Container narrow className="flex flex-col gap-8">
          <Reveal>
            <span className="text-brand-700 dark:text-brand-400 text-sm font-semibold tracking-wide uppercase">
              About Revenue Craft Digital
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-display-xl text-balance">
              We build the measurement and media systems that turn ad spend into revenue.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground text-xl text-pretty">
              Revenue Craft Digital exists because most marketing spend is optimized against the
              wrong signal — clicks and impressions instead of revenue and margin. We partner with
              ambitious businesses to fix the measurement layer first, then build performance
              marketing systems on top of data that can actually be trusted.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-muted/30">
        <Container className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="How we operate"
            title="Consultative, data-first, and accountable to revenue."
            description="Every engagement runs through the same disciplined process — regardless of industry or budget size."
          />
          <ProcessSteps />
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}
