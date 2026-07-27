"use client"

import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { floatLoop } from "@/lib/animations"

interface FloatingShapeProps {
  className?: string
  /** Vertical travel distance in px. */
  distance?: number
  /** Full loop duration in seconds. */
  duration?: number
  /** Negative delay offsets so multiple shapes don't move in lockstep. */
  delay?: number
}

/**
 * A decorative, ambient-floating blurred shape. Size, position, and color are
 * controlled entirely via `className` (e.g. "size-40 rounded-full bg-brand-300/30
 * blur-2xl top-10 left-1/4") — this component only owns the float motion.
 */
export function FloatingShape({ className, distance = 16, duration = 6, delay = 0 }: FloatingShapeProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      animate={prefersReducedMotion ? undefined : floatLoop(distance, duration)}
      transition={{ delay }}
    />
  )
}
