"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  /** How far the button can be pulled toward the cursor, in px. */
  strength?: number
}

/**
 * Wraps a single interactive child (typically a `Button`) and gently pulls it
 * toward the cursor within its own bounds. Use sparingly — one or two per
 * page, on the highest-intent CTA, not on every button.
 */
export function MagneticButton({ children, className, strength = 12 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * strength)
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * strength)
  }

  function handlePointerLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  )
}
