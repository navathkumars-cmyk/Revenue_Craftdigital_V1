import { buildMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Heading, Text } from "@/components/ui/typography"

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Revenue Craft Digital collects, uses, and protects your information.",
  path: "/privacy",
})

const sections = [
  {
    heading: "Information we collect",
    body: "When you submit a form (Growth Audit request, contact form, or newsletter signup) we collect the details you provide directly — name, email, phone, company, and any message content. We also collect standard analytics data (pages visited, referral source, approximate location, device type) via Google Analytics 4 and similar tools.",
  },
  {
    heading: "How we use your information",
    body: "We use the information you submit to respond to your inquiry, prepare a Growth Audit or proposal, and — if you're an active client — to deliver and report on the services you've engaged us for. We do not sell your personal information to third parties.",
  },
  {
    heading: "Cookies and tracking",
    body: "This site uses cookies and similar technologies (including Google Tag Manager, Google Analytics 4, and Meta Pixel) to understand how visitors use the site and to measure the performance of our own marketing. You can control cookies through your browser settings; disabling them may affect how parts of the site function.",
  },
  {
    heading: "Third-party services",
    body: "We use third-party providers — including Google, Meta, and CRM/automation platforms — to operate this website and deliver our services. Each provider processes data under its own privacy policy; we only share what's necessary for the purpose described above.",
  },
  {
    heading: "Data retention",
    body: "We retain form submissions and client data for as long as necessary to provide our services and meet legal, accounting, or reporting obligations, after which it's deleted or anonymized.",
  },
  {
    heading: "Your rights",
    body: "You can request a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it, by emailing the address below. We'll respond within a reasonable timeframe.",
  },
  {
    heading: "Contact",
    body: `Questions about this policy can be sent to ${siteConfig.email}.`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <Section spacing="lg">
      <Container narrow className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Heading as="h1" size="xl">
            Privacy Policy
          </Heading>
          <Text muted>Last updated: January 2026</Text>
        </div>
        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-2">
              <h2 className="text-foreground text-lg font-semibold">{section.heading}</h2>
              <Text muted>{section.body}</Text>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
