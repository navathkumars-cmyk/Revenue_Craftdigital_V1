import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/motion/magnetic-button"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { ParallaxLayer } from "@/components/motion/parallax-layer"
import { Reveal } from "@/components/motion/reveal"

export function CtaSection() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="bg-ink-950 relative isolate overflow-hidden rounded-3xl">
          <ParallaxLayer className="absolute inset-0 -z-10" speed={0.2}>
            <GradientMesh variant="hero" />
          </ParallaxLayer>
          <Reveal className="glass glass-strong relative m-3 flex flex-col items-center gap-6 rounded-2xl px-8 py-14 text-center sm:m-6 sm:px-16 sm:py-20">
            <h2 className="text-display-lg max-w-2xl text-balance text-white">
              Ready to turn ad spend into predictable revenue?
            </h2>
            <p className="text-ink-200 max-w-xl text-lg text-pretty">
              Book a strategy call and get a clear view of where performance marketing can move
              your numbers — before you commit to anything.
            </p>
            <MagneticButton>
              <Button
                ripple
                size="lg"
                className="bg-brand-500 hover:bg-brand-400 shadow-glow text-white"
                render={<Link href="/contact" />}
              >
                {siteConfig.cta.primary}
                <ArrowRight className="size-4" />
              </Button>
            </MagneticButton>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
