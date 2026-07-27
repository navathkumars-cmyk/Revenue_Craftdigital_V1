"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"

type AnimatedIconEffect = "rotate" | "scale" | "bounce"

interface AnimatedIconProps {
  children: React.ReactNode
  effect?: AnimatedIconEffect
}

const effectVariants: Record<AnimatedIconEffect, Variants> = {
  rotate: { rest: { rotate: 0 }, hover: { rotate: 12 } },
  scale: { rest: { scale: 1 }, hover: { scale: 1.15 } },
  bounce: { rest: { y: 0 }, hover: { y: -3 } },
}

/**
 * Wraps an already-rendered icon element (e.g. `<ServiceIcon className="size-5" />`)
 * with a spring response to hover. Pass a rendered element, not a component
 * reference — this keeps it safe to use from Server Component parents.
 */
export function AnimatedIcon({ children, effect = "scale" }: AnimatedIconProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.span
      className="inline-flex"
      initial="rest"
      whileHover="hover"
      animate="rest"
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <motion.span variants={effectVariants[effect]} className="inline-flex">
        {children}
      </motion.span>
    </motion.span>
  )
}
