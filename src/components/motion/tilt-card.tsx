"use client"

import { useRef, type PointerEvent } from "react"
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** Max tilt rotation in degrees. */
  maxTilt?: number
}

/**
 * Wraps a single child (typically a Card) with a subtle 3D tilt that follows
 * the cursor, plus a light glare highlight. Disabled entirely under
 * prefers-reduced-motion, where it renders the child unmodified.
 */
export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const springX = useSpring(pointerX, { stiffness: 300, damping: 30 })
  const springY = useSpring(pointerY, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt])
  const glareX = useTransform(springX, [0, 1], ["0%", "100%"])
  const glareY = useTransform(springY, [0, 1], ["0%", "100%"])
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(320px circle at ${x} ${y}, oklch(1 0 0 / 0.12), transparent 60%)`
  )

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width)
    pointerY.set((event.clientY - bounds.top) / bounds.height)
  }

  function handlePointerLeave() {
    pointerX.set(0.5)
    pointerY.set(0.5)
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={cn("group relative", className)}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-base group-hover:opacity-100"
        style={{ background: glareBackground }}
      />
    </motion.div>
  )
}
