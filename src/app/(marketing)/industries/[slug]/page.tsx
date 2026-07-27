import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { buildMetadata } from "@/lib/seo"
import { getContentProvider } from "@/lib/cms"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { ContentIcon } from "@/components/ui/content-icon"
import { ServiceCard } from "@/components/marketing/service-card"
import { CtaSection } from "@/components/marketing/cta-section"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { MagneticButton } from "@/components/motion/magnetic-button"

interface IndustryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const industries = await getContentProvider().getIndustries()
  return industries.map((industry) => ({ slug: industry.slug }))
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params
  const industry = await getContentProvider().getIndustryBySlug(slug)
  if (!industry) return buildMetadata({ title: "Industry not found", noIndex: true })

  return buildMetadata({
    title: industry.name,
    description: industry.summary,
    path: `/industries/${industry.slug}`,
  })
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params
  const content = getContentProvider()
  const industry = await content.getIndustryBySlug(slug)
  if (!industry) notFound()

  const relevantServices = (await content.getServices()).slice(0, 3)

  return (
    <>
      <Section spacing="lg" className="relative overflow-hidden">
        <GradientMesh variant="subtle" />
        <Container narrow className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-6">
            <div className="bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex size-14 items-center justify-center rounded-2xl">
              <ContentIcon name={industry.icon} className="size-7" />
            </div>
            <h1 className="text-display-xl text-balance">
              Performance marketing for {industry.name}
            </h1>
            <p className="text-muted-foreground text-xl text-pretty">{industry.summary}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <MagneticButton>
              <Button ripple size="lg" render={<Link href="/contact" />}>
                Talk to us about {industry.name}
                <ArrowRight className="size-4" />
              </Button>
            </MagneticButton>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-muted/30 relative overflow-hidden">
        <GradientMesh variant="subtle" />
        <Container className="flex flex-col gap-10">
          <h2 className="text-display-sm">Relevant services</h2>
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relevantServices.map((service) => (
              <StaggerItem key={service.slug}>
                <ServiceCard service={service} className="h-full" />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}
