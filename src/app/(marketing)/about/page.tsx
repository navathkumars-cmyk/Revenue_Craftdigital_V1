import { buildMetadata } from "@/lib/seo"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/marketing/section-heading"
import { ProcessSteps } from "@/components/marketing/process-steps"
import { CtaSection } from "@/components/marketing/cta-section"
import { StatCounter } from "@/components/marketing/stat-counter"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { TiltGlassCard } from "@/components/ui/tilt-glass-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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

const founders = [
  {
    name: "Navath Kumar",
    role: "Founder",
    bio: "Started Revenue Craft Digital after seeing too many businesses spend on ads without ever knowing what was actually working. Leads strategy and makes sure every engagement stays tied to revenue, not vanity metrics.",
  },
  {
    name: "Hari Krishna Shetty",
    role: "Co-Founder",
    bio: "Leads execution across every engagement — campaign builds, tracking infrastructure, and the reporting that makes results verifiable. Believes better decisions start with cleaner data.",
  },
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

      <Section className="relative overflow-hidden">
        <GradientMesh variant="subtle" />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Who's behind it"
            title="Founded on a simple idea: fix the data before you touch the spend."
          />
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {founders.map((founder) => (
              <StaggerItem key={founder.name}>
                <TiltGlassCard className="flex-row items-start gap-4 p-6">
                  <Avatar size="lg" className="shrink-0">
                    <AvatarFallback className="bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-semibold">
                      {founder.name
                        .split(" ")
                        .map((part) => part.charAt(0))
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1.5">
                    <div>
                      <h3 className="text-foreground font-semibold">{founder.name}</h3>
                      <p className="text-brand-700 dark:text-brand-400 text-sm font-medium">{founder.role}</p>
                    </div>
                    <p className="text-muted-foreground text-sm text-pretty">{founder.bio}</p>
                  </div>
                </TiltGlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
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
