import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { Reveal } from "@/components/motion/reveal"

export default function NotFound() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <GradientMesh variant="subtle" />
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <span className="text-brand-700 dark:text-brand-400 font-mono text-sm font-semibold">404</span>
          <h1 className="text-display-lg">This page doesn&apos;t exist.</h1>
          <p className="text-muted-foreground max-w-md text-lg text-pretty">
            The page you&apos;re looking for may have moved. Head back to the homepage or get in touch.
          </p>
          <div className="flex gap-3">
            <Button ripple render={<Link href="/" />}>Back to homepage</Button>
            <Button ripple variant="outline" render={<Link href="/contact" />}>
              Contact us
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
