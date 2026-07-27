"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"

/**
 * A small ring that trails the real cursor with a spring lag and grows when
 * hovering anything clickable. Supplements the native cursor — never hides
 * it, so text selection and form inputs keep their normal cursor affordances.
 * Skipped on touch devices and under prefers-reduced-motion.
 */
export function MouseFollower() {
  const prefersReducedMotion = useReducedMotion()

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const scale = useMotionValue(1)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })
  const springScale = useSpring(scale, { stiffness: 300, damping: 25 })

  useEffect(() => {
    if (prefersReducedMotion) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    function handlePointerMove(event: PointerEvent) {
      // Offset by half the ring's size (size-6 = 24px) so it's centered on the pointer —
      // Framer Motion owns `transform` entirely via the style prop below, so centering
      // has to be baked into the coordinates rather than a separate translate class.
      x.set(event.clientX - 12)
      y.set(event.clientY - 12)

      const target = event.target as Element | null
      const isInteractive = !!target?.closest('a, button, [role="button"], input, textarea, select')
      scale.set(isInteractive ? 1.8 : 1)
    }

    window.addEventListener("pointermove", handlePointerMove)
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [prefersReducedMotion, x, y, scale])

  if (prefersReducedMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="border-brand-500/60 pointer-events-none fixed top-0 left-0 z-[60] hidden size-6 rounded-full border-2 mix-blend-difference sm:block"
      style={{ x: springX, y: springY, scale: springScale }}
    />
  )
}
