import { buildMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Heading, Text } from "@/components/ui/typography"

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that govern use of the Revenue Craft Digital website and services.",
  path: "/terms",
})

const sections = [
  {
    heading: "Acceptance of terms",
    body: "By using this website or engaging Revenue Craft Digital for services, you agree to these terms. If you don't agree, please don't use the site or our services.",
  },
  {
    heading: "Services described on this site",
    body: "Service descriptions, case study results, and stated timelines on this website are illustrative of typical engagements and outcomes. Actual results vary by account history, budget, industry, and market conditions, and are never guaranteed.",
  },
  {
    heading: "Engagement terms",
    body: "Specific scope, deliverables, pricing, and cancellation terms for any paid engagement are set out in a separate signed proposal or agreement, which takes precedence over anything stated on this website.",
  },
  {
    heading: "Intellectual property",
    body: "All content on this site — copy, design, and code — is owned by Revenue Craft Digital or its licensors and may not be reproduced without permission.",
  },
  {
    heading: "Limitation of liability",
    body: "Revenue Craft Digital is not liable for indirect, incidental, or consequential damages arising from use of this website. Nothing in these terms limits liability where it cannot be limited under applicable law.",
  },
  {
    heading: "Changes to these terms",
    body: "We may update these terms from time to time. Continued use of the site after a change constitutes acceptance of the revised terms.",
  },
  {
    heading: "Governing law",
    body: "These terms are governed by the laws of the jurisdiction in which Revenue Craft Digital is registered, without regard to conflict-of-law principles.",
  },
  {
    heading: "Contact",
    body: `Questions about these terms can be sent to ${siteConfig.email}.`,
  },
]

export default function TermsOfServicePage() {
  return (
    <Section spacing="lg">
      <Container narrow className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Heading as="h1" size="xl">
            Terms of Service
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
