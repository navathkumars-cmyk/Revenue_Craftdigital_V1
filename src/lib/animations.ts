import type { Transition, Variants } from "framer-motion"

/**
 * Shared Framer Motion variants. Keep these as the single source of truth for
 * marketing-page motion so every section animates on the same rhythm.
 * Durations/easings mirror the CSS tokens in globals.css (--duration-*, --ease-*).
 */

export const EASE_OUT_EXPO: Transition["ease"] = [0.16, 1, 0.3, 1]
export const EASE_OUT_QUART: Transition["ease"] = [0.25, 1, 0.5, 1]

export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  slower: 0.6,
} as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
}

/** Wrap a group of children with this to stagger their entrance. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
}

export const blurIn: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.slower, ease: EASE_OUT_EXPO },
  },
}

/** Continuous ambient float for decorative elements (FloatingShape, blobs).
 * Not a scroll-triggered variant — drive it with `animate`, not `whileInView`. */
export const floatLoop = (distance = 16, duration = 6): { y: number[]; transition: Transition } => ({
  y: [0, -distance, 0],
  transition: { duration, repeat: Infinity, ease: "easeInOut" },
})

/** Default viewport config for scroll-triggered reveals across the site. */
export const defaultViewport = { once: true, margin: "-80px" } as const
