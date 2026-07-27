"use client"

import { useGsapContext } from "@/lib/gsap"

interface ParallaxLayerProps {
  children: React.ReactNode
  className?: string
  /** Scroll speed multiplier. Positive drifts down relative to the page as you
   * scroll past; negative drifts up (moves opposite to scroll direction). */
  speed?: number
}

/**
 * Scroll-scrubbed parallax via real GSAP + ScrollTrigger (not Framer Motion —
 * this is the one effect GSAP is a genuinely better fit for than declarative
 * variants). Wrap a decorative element (GradientMesh, FloatingShape) that
 * doesn't already animate its own `transform` on the SAME node — nest this
 * around it rather than adding it to an element with its own CSS/Framer
 * transform animation, or the two will fight over the `transform` property.
 */
export function ParallaxLayer({ children, className, speed = 0.25 }: ParallaxLayerProps) {
  const ref = useGsapContext<HTMLDivElement>(({ container, gsap }) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.to(container, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
