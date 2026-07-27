"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/** Thin brand-colored bar pinned to the very top of the viewport, tracking
 * vertical scroll progress across the whole document. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 })

  return (
    <motion.div
      aria-hidden="true"
      className="from-brand-500 to-brand-300 fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r"
      style={{ scaleX }}
    />
  )
}
