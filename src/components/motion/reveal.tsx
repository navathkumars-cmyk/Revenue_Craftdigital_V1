"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"

import { defaultViewport, fadeUp } from "@/lib/animations"

interface RevealProps {
  children: React.ReactNode
  variants?: Variants
  className?: string
  delay?: number
  as?: "div" | "section" | "li"
}

/**
 * Scroll-triggered entrance wrapper used across marketing sections.
 * Respects prefers-reduced-motion by rendering children statically.
 */
export function Reveal({ children, variants = fadeUp, className, delay = 0, as = "div" }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion[as]

  if (prefersReducedMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
