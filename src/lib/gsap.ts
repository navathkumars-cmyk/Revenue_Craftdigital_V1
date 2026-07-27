"use client"

import { useEffect, useRef, type RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

let registered = false

/** Registers GSAP plugins exactly once on the client. Import this before any
 * GSAP usage that relies on ScrollTrigger. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

/**
 * Runs a GSAP animation scoped to a container ref, cleaning up the context
 * (and any ScrollTriggers created inside it) on unmount. Use this for
 * complex, timeline-driven sections (parallax, pinning, scrubbed reveals)
 * where Framer Motion's declarative variants aren't the right tool.
 */
export function useGsapContext<T extends HTMLElement>(
  callback: (context: { container: T; gsap: typeof gsap }) => void,
  deps: unknown[] = []
): RefObject<T | null> {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    registerGsap()
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      callback({ container: containerRef.current as T, gsap })
    }, containerRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}

export { gsap, ScrollTrigger }
