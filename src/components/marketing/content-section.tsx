import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GradientMesh } from "@/components/marketing/gradient-mesh"
import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"

interface ContentSectionCta {
  label: string
  href: string
  variant?: "default" | "outline"
}

interface ContentSectionProps {
  eyebrow?: string
  title?: React.ReactNode
  description?: React.ReactNode
  headingAlign?: "left" | "center"
  spacing?: "sm" | "md" | "lg"
  /** Alternates the section background — used to create visual rhythm
   * between consecutive sections on a long page (see the homepage). */
  muted?: boolean
  /** Gradient-mesh backdrop, on by default — every section with a glass
   * surface needs one behind it for the glass to actually read as glass. */
  mesh?: boolean
  meshVariant?: "hero" | "subtle"
  narrow?: boolean
  cta?: ContentSectionCta
  children: React.ReactNode
  className?: string
}

/**
 * The recurring "Section + GradientMesh backdrop + heading + content +
 * closing CTA" shell used by nearly every marketing section on the site.
 * Centralizing it here means the backdrop treatment and CTA styling only
 * need to change in one place — see DESIGN_SYSTEM.md §5 for when to reach
 * for this vs. a fully custom section (Hero, CtaSection, ContactSection
 * stay custom because their layout genuinely differs, not just their copy).
 */
export function ContentSection({
  eyebrow,
  title,
  description,
  headingAlign = "left",
  spacing = "md",
  muted = false,
  mesh = true,
  meshVariant = "subtle",
  narrow = false,
  cta,
  children,
  className,
}: ContentSectionProps) {
  return (
    <Section spacing={spacing} className={cn("relative overflow-hidden", muted && "bg-muted/30")}>
      {mesh ? <GradientMesh variant={meshVariant} /> : null}
      <Container narrow={narrow} className={cn("flex flex-col gap-12", className)}>
        {title ? (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={headingAlign}
            className={headingAlign === "center" ? "mx-auto" : undefined}
          />
        ) : null}
        {children}
        {cta ? (
          <Reveal className="flex justify-center">
            <Button ripple variant={cta.variant ?? "outline"} size="lg" render={<Link href={cta.href} />}>
              {cta.label}
              <ArrowRight className="size-4" />
            </Button>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  )
}
