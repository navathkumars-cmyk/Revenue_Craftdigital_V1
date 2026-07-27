import { buildMetadata } from "@/lib/seo"
import { getContentProvider } from "@/lib/cms"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/marketing/section-heading"
import { CtaSection } from "@/components/marketing/cta-section"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { ContentIcon } from "@/components/ui/content-icon"
import { TiltGlassCard } from "@/components/ui/tilt-glass-card"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"

export const metadata = buildMetadata({
  title: "Industries",
  description: "Performance marketing built for startups, SaaS, e-commerce, healthcare, real estate, and more.",
  path: "/industries",
})

export default async function IndustriesPage() {
  const industries = await getContentProvider().getIndustries()

  return (
    <>
      <Section spacing="lg" className="relative overflow-hidden">
        <GradientMesh variant="subtle" />
        <Container className="flex flex-col gap-16">
          <SectionHeading
            eyebrow="Industries"
            title="Category-specific playbooks, not generic templates."
            description="Every industry has a different sales cycle, margin structure, and buyer journey. We adapt our measurement and campaign frameworks to fit yours."
            className="max-w-3xl"
          />
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <StaggerItem key={industry.slug} className="h-full">
                <TiltGlassCard href={`/industries/${industry.slug}`} className="flex flex-col gap-4 p-6">
                  <div className="bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex size-11 items-center justify-center rounded-xl">
                    <ContentIcon name={industry.icon} className="size-5" />
                  </div>
                  <h3 className="text-foreground font-semibold">{industry.name}</h3>
                  <p className="text-muted-foreground text-sm text-pretty">{industry.summary}</p>
                </TiltGlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>
      <CtaSection />
    </>
  )
}
