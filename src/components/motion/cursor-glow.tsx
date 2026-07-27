"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

/**
 * A soft radial glow that trails the cursor, mounted once near the root.
 * Updates a plain DOM style property directly (not React state) so it never
 * triggers a re-render on mousemove. Skipped entirely on touch devices and
 * for users who prefer reduced motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    const node = ref.current
    if (!node) return

    let raf = 0
    function handlePointerMove(event: PointerEvent) {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        node!.style.setProperty("--glow-x", `${event.clientX}px`)
        node!.style.setProperty("--glow-y", `${event.clientY}px`)
        node!.style.opacity = "1"
      })
    }

    window.addEventListener("pointermove", handlePointerMove)
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      cancelAnimationFrame(raf)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-slow hidden sm:block"
      style={{
        background:
          "radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), color-mix(in oklch, var(--color-brand-400) 12%, transparent), transparent 60%)",
      }}
    />
  )
}
