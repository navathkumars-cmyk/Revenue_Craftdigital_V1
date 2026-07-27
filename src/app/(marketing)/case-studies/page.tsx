import { buildMetadata } from "@/lib/seo"
import { getContentProvider } from "@/lib/cms"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/marketing/section-heading"
import { CaseStudyCard } from "@/components/marketing/case-study-card"
import { CtaSection } from "@/components/marketing/cta-section"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"

export const metadata = buildMetadata({
  title: "Case Studies",
  description: "Real results from Revenue Craft Digital's performance marketing engagements.",
  path: "/case-studies",
})

export default async function CaseStudiesPage() {
  const caseStudies = await getContentProvider().getCaseStudies()

  return (
    <>
      <Section spacing="lg" className="relative overflow-hidden">
        <GradientMesh variant="subtle" />
        <Container className="flex flex-col gap-16">
          <SectionHeading
            eyebrow="Case studies"
            title="Results, measured the way you measure your business."
            description="A sample of engagements across SaaS, D2C, and healthcare — each one starting with measurement, not media spend."
            className="max-w-3xl"
          />
          <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <StaggerItem key={study.slug} className="h-full">
                <CaseStudyCard study={study} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>
      <CtaSection />
    </>
  )
}
