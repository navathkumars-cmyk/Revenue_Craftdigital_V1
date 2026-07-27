import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { buildMetadata } from "@/lib/seo"
import { getContentProvider } from "@/lib/cms"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { TiltGlassCard } from "@/components/ui/tilt-glass-card"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { MagneticButton } from "@/components/motion/magnetic-button"

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const caseStudies = await getContentProvider().getCaseStudies()
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const study = await getContentProvider().getCaseStudyBySlug(slug)
  if (!study) return buildMetadata({ title: "Case study not found", noIndex: true })

  return buildMetadata({
    title: `${study.client} Case Study`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
  })
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const study = await getContentProvider().getCaseStudyBySlug(slug)
  if (!study) notFound()

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <GradientMesh variant="subtle" />
      <Container narrow className="flex flex-col gap-10">
        <Reveal className="flex flex-col gap-6">
          <span className="text-brand-700 dark:text-brand-400 text-sm font-semibold tracking-wide uppercase">
            {study.industry}
          </span>
          <h1 className="text-display-xl text-balance">{study.headline}</h1>
          <p className="text-muted-foreground text-xl text-pretty">{study.summary}</p>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {study.metrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <TiltGlassCard className="p-6">
                <div className="text-display-md font-semibold">{metric.value}</div>
                <p className="text-muted-foreground mt-1 text-sm">{metric.label}</p>
              </TiltGlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <MagneticButton>
            <Button ripple size="lg" render={<Link href="/contact" />}>
              Get results like {study.client}
              <ArrowRight className="size-4" />
            </Button>
          </MagneticButton>
        </Reveal>
      </Container>
    </Section>
  )
}
