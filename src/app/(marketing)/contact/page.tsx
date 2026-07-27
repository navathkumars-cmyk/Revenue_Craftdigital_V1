import { Mail, MessageCircle } from "lucide-react"

import { buildMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ContactForm } from "@/components/forms/contact-form"
import { Reveal } from "@/components/motion/reveal"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { GlassCard } from "@/components/ui/glass-card"
import { Eyebrow, Heading, Lead } from "@/components/ui/typography"

export const metadata = buildMetadata({
  title: "Contact",
  description: "Book a strategy call with Revenue Craft Digital.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <GradientMesh variant="subtle" />
      <Container className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.2fr]">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>Contact</Eyebrow>
          <Heading as="h1" size="lg">
            Let&apos;s find out where performance marketing moves your numbers.
          </Heading>
          <Lead>
            Tell us about your business and current channels. We&apos;ll follow up within one
            business day to schedule a strategy call — no pressure, no generic pitch decks.
          </Lead>
          <div className="flex flex-col gap-3 pt-4">
            <a href={`mailto:${siteConfig.email}`} className="text-foreground flex items-center gap-3 text-sm">
              <Mail className="text-brand-600 dark:text-brand-400 size-5" />
              {siteConfig.email}
            </a>
            <span className="text-muted-foreground flex items-center gap-3 text-sm">
              <MessageCircle className="text-brand-600 dark:text-brand-400 size-5" />
              WhatsApp available for qualified leads
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <GlassCard className="p-6 sm:p-8">
            <ContactForm />
          </GlassCard>
        </Reveal>
      </Container>
    </Section>
  )
}
