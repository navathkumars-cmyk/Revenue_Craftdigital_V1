"use client"

import { motion, useReducedMotion } from "framer-motion"

import { defaultViewport, staggerContainer, staggerItem } from "@/lib/animations"

interface StaggerGroupProps {
  children: React.ReactNode
  className?: string
  stagger?: number
}

/** Wraps a list of children and staggers their entrance as a group scrolls into view. */
export function StaggerGroup({ children, className, stagger = 0.08 }: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer(stagger)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}
