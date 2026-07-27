"use client"

import { motion, useReducedMotion } from "framer-motion"

import { DURATION, EASE_OUT_EXPO, defaultViewport } from "@/lib/animations"

interface TextRevealProps {
  text: string
  className?: string
  /** Seconds before the first word starts animating. */
  delay?: number
  /** Stagger increment between words, in seconds. */
  wordDelay?: number
}

/**
 * Masks each word behind an overflow-hidden clip and slides it up into view,
 * staggered left-to-right. Renders as an inline `<span>` so it composes
 * inside any heading tag — split a headline across two `TextReveal`s (e.g. a
 * plain lead-in phrase + a gradient-highlighted phrase) and offset the
 * second one's `delay` to keep the stagger continuous across both.
 */
export function TextReveal({ text, className, delay = 0, wordDelay = 0.06 }: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(/\s+/)

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={defaultViewport}
            transition={{
              duration: DURATION.slower,
              ease: EASE_OUT_EXPO,
              delay: delay + index * wordDelay,
            }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
