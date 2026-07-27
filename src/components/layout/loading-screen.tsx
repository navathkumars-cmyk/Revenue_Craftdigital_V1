"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { siteConfig } from "@/config/site"

/**
 * Brief branded splash shown once on initial load, then self-dismisses.
 * Mounted at the root layout so it never remounts on client-side navigation
 * (the layout persists across route changes within the App Router).
 */
export function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), prefersReducedMotion ? 0 : 700)

    // Safety net: if a visitor manages to interact before the timer fires
    // (or the timer is delayed — e.g. a backgrounded tab throttles it), don't
    // let this full-viewport overlay trap their click. Dismiss immediately.
    const dismiss = () => setLoading(false)
    window.addEventListener("pointerdown", dismiss, { once: true })
    window.addEventListener("keydown", dismiss, { once: true })

    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener("pointerdown", dismiss)
      window.removeEventListener("keydown", dismiss)
    }
  }, [prefersReducedMotion])

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-background pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-brand-600 flex size-12 items-center justify-center rounded-xl text-lg font-bold text-white"
          >
            {siteConfig.shortName.charAt(0)}
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
