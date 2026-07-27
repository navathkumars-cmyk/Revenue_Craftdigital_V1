import { buildMetadata } from "@/lib/seo"
import { serviceCategories } from "@/config/services"
import { getContentProvider } from "@/lib/cms"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/marketing/section-heading"
import { ServiceCard } from "@/components/marketing/service-card"
import { CtaSection } from "@/components/marketing/cta-section"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Performance marketing services spanning paid media, tracking and analytics, conversion optimization, and marketing automation.",
  path: "/services",
})

export default async function ServicesPage() {
  const services = await getContentProvider().getServices()

  return (
    <>
      <Section spacing="lg" className="relative overflow-hidden">
        <GradientMesh variant="subtle" />
        <Container className="flex flex-col gap-16">
          <SectionHeading
            eyebrow="Services"
            title="Every discipline your revenue engine needs, under one roof."
            description="We don't sell isolated tactics. Each service below plugs into the same measurement layer, so paid media, tracking, and conversion work compound instead of competing."
            className="max-w-3xl"
          />

          {serviceCategories.map((category) => {
            const categoryServices = services.filter((service) => service.category === category)
            return (
              <div key={category} className="flex flex-col gap-6">
                <h2 className="text-display-sm">{category}</h2>
                <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => (
                    <StaggerItem key={service.slug}>
                      <ServiceCard service={service} className="h-full" />
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            )
          })}
        </Container>
      </Section>
      <CtaSection />
    </>
  )
}
