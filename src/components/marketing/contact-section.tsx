import Link from "next/link"
import { Mail, MessageCircle, Clock, ArrowRight } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { Reveal } from "@/components/motion/reveal"
import { Eyebrow, Heading, Lead } from "@/components/ui/typography"

const channels = [
  { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MessageCircle, label: "WhatsApp available for qualified leads" },
  { icon: Clock, label: "Typical response time: under 24 hours" },
]

export function ContactSection() {
  return (
    <Section className="relative overflow-hidden">
      <GradientMesh variant="subtle" />
      <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>Get in Touch</Eyebrow>
          <Heading as="h2" size="lg">
            Prefer to talk it through first?
          </Heading>
          <Lead>
            Email us directly, or fill out a two-minute form and we&apos;ll follow up within one
            business day — no automated sequences, no sales scripts.
          </Lead>
          <ul className="flex flex-col gap-3 pt-2">
            {channels.map((channel) => {
              const Icon = channel.icon
              const content = (
                <>
                  <Icon className="text-brand-600 dark:text-brand-400 size-5" aria-hidden="true" />
                  <span className="text-foreground text-sm">{channel.label}</span>
                </>
              )
              return (
                <li key={channel.label} className="flex items-center gap-3">
                  {channel.href ? (
                    <a href={channel.href} className="hover:text-brand-700 dark:hover:text-brand-400 flex items-center gap-3 transition-colors">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard strong className="p-6 sm:p-8">
            <h3 className="text-foreground font-semibold">Not ready for a call?</h3>
            <p className="text-muted-foreground mt-2 text-sm text-pretty">
              Send us a short message with your goals and current channels — we&apos;ll come back
              with real next steps, not a generic pitch deck.
            </p>
            <Button ripple size="lg" className="mt-6 w-full" render={<Link href="/contact" />}>
              Send Us a Message
              <ArrowRight className="size-4" />
            </Button>
          </GlassCard>
        </Reveal>
      </Container>
    </Section>
  )
}
