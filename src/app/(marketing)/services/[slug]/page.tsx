import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { buildMetadata } from "@/lib/seo"
import { getContentProvider } from "@/lib/cms"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { TiltGlassCard } from "@/components/ui/tilt-glass-card"
import { ContentIcon } from "@/components/ui/content-icon"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { Reveal } from "@/components/motion/reveal"
import { MagneticButton } from "@/components/motion/magnetic-button"

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = await getContentProvider().getServices()
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getContentProvider().getServiceBySlug(slug)
  if (!service) return buildMetadata({ title: "Service not found", noIndex: true })

  return buildMetadata({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
  })
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getContentProvider().getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <GradientMesh variant="subtle" />
      <Container narrow className="flex flex-col gap-8">
        <Reveal className="flex flex-col gap-6">
          <div className="bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex size-14 items-center justify-center rounded-2xl">
            <ContentIcon name={service.icon} className="size-7" />
          </div>
          <h1 className="text-display-xl text-balance">{service.name}</h1>
          <p className="text-muted-foreground text-xl text-pretty">{service.description}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <TiltGlassCard className="flex flex-col gap-4 p-8">
            <h2 className="font-semibold">What you can expect</h2>
            <ul className="flex flex-col gap-3">
              {service.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <CheckCircle2 className="text-signal-600 mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  <span className="text-foreground text-base">{outcome}</span>
                </li>
              ))}
            </ul>
          </TiltGlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <MagneticButton>
            <Button ripple size="lg" render={<Link href="/contact" />}>
              Talk to us about {service.name}
              <ArrowRight className="size-4" />
            </Button>
          </MagneticButton>
        </Reveal>
      </Container>
    </Section>
  )
}
