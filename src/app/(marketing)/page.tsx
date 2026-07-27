import { buildMetadata, faqPageJsonLd } from "@/lib/seo"
import { getContentProvider } from "@/lib/cms"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Hero } from "@/components/marketing/hero"
import { LogoWall } from "@/components/marketing/logo-wall"
import { ServiceCard } from "@/components/marketing/service-card"
import { ProcessSteps } from "@/components/marketing/process-steps"
import { AboutSection } from "@/components/marketing/about-section"
import { WhyChooseUs } from "@/components/marketing/why-choose-us"
import { CaseStudiesPreview } from "@/components/marketing/case-studies-preview"
import { TestimonialCard } from "@/components/marketing/testimonial-card"
import { TechStack } from "@/components/marketing/tech-stack"
import { FaqAccordion } from "@/components/marketing/faq-accordion"
import { CtaSection } from "@/components/marketing/cta-section"
import { ContactSection } from "@/components/marketing/contact-section"
import { ContentSection } from "@/components/marketing/content-section"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { Reveal } from "@/components/motion/reveal"

export const metadata = buildMetadata({
  title: "Performance Marketing Engineered for Revenue",
  path: "/",
})

export default async function HomePage() {
  const content = getContentProvider()
  const [services, testimonials, generalFaqs] = await Promise.all([
    content.getServices(),
    content.getTestimonials(),
    content.getFaqs(),
  ])
  const featuredServices = services.slice(0, 6)

  return (
    <>
      <Hero />

      <Section spacing="sm">
        <Container className="flex flex-col items-center gap-8">
          <Reveal>
            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              Trusted by growth-minded teams
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <LogoWall />
          </Reveal>
        </Container>
      </Section>

      <AboutSection />

      <ContentSection
        eyebrow="What we do"
        title="A full performance marketing system, not a single channel."
        description="From paid media to the tracking infrastructure underneath it, every service is built to compound into one outcome: predictable revenue."
        cta={{ label: "View all services", href: "/services" }}
      >
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </ContentSection>

      <ContentSection
        muted
        eyebrow="How we work"
        title="A structured, 90-day cycle built for compounding results."
        description="No black boxes. Every engagement follows the same measurement-first process, so you always know what's driving the numbers."
        cta={{ label: "See how a 90-day cycle plays out", href: "/about" }}
      >
        <ProcessSteps />
      </ContentSection>

      <ContentSection
        eyebrow="Why Revenue Craft Digital"
        title="The difference measurement-first makes."
        description="Most performance marketing problems aren't creative problems — they're measurement problems wearing a creative costume."
        cta={{ label: "See the difference in your own numbers", href: "#growth-audit-form", variant: "default" }}
      >
        <WhyChooseUs />
      </ContentSection>

      <ContentSection
        muted
        eyebrow="Proof, not promises"
        title="Real engagements. Real numbers."
        description="A sample of what happens when tracking gets fixed before the media plan does."
        cta={{ label: "View all case studies", href: "/case-studies" }}
      >
        <CaseStudiesPreview />
      </ContentSection>

      <ContentSection
        eyebrow="Client results"
        title="What partners say about working with us."
        cta={{ label: "Read more client stories", href: "/case-studies" }}
      >
        <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </ContentSection>

      <ContentSection
        muted
        eyebrow="The stack we run on"
        title="Enterprise-grade tools, wired together properly."
        description="Great platforms still fail without clean tracking feeding them. We implement and audit all of it — not just the media buying."
        cta={{ label: "Explore our tracking & analytics services", href: "/services" }}
      >
        <TechStack />
      </ContentSection>

      <ContentSection
        narrow
        eyebrow="FAQ"
        title="Answers to the questions we hear most."
        cta={{ label: "Still have questions? Talk to a strategist", href: "/contact" }}
      >
        <FaqAccordion items={generalFaqs} />
        <script type="application/ld+json" dangerouslySetInnerHTML={faqPageJsonLd(generalFaqs)} />
      </ContentSection>

      <CtaSection />
      <ContactSection />
    </>
  )
}
