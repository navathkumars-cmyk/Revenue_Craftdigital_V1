import { buildMetadata } from "@/lib/seo"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { Reveal } from "@/components/motion/reveal"

export const metadata = buildMetadata({
  title: "Insights",
  description: "Perspectives on performance marketing, tracking, and conversion optimization from Revenue Craft Digital.",
  path: "/insights",
})

export default function InsightsPage() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <GradientMesh variant="subtle" />
      <Container className="flex flex-col gap-6">
        <Reveal>
          <SectionHeading
            eyebrow="Insights"
            title="Perspectives on performance marketing."
            description="Long-form breakdowns on tracking, conversion optimization, and channel strategy are coming soon. In the meantime, book a call and we'll walk you through what's working right now."
            className="max-w-2xl"
          />
        </Reveal>
      </Container>
    </Section>
  )
}
