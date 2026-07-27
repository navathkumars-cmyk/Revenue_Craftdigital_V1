"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  label: string
}

export function StatCounter({ value, suffix = "", prefix = "", decimals = 0, label }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion()
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 90 })

  useEffect(() => {
    if (isInView) {
      motionValue.set(prefersReducedMotion ? value : value)
    }
  }, [isInView, motionValue, value, prefersReducedMotion])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`
      }
    })
  }, [springValue, prefix, suffix, decimals])

  return (
    <div className="flex flex-col gap-1">
      <span className="text-display-md text-foreground font-semibold tabular-nums" ref={ref}>
        {prefix}0{suffix}
      </span>
      <span className="text-muted-foreground text-sm">{label}</span>
    </div>
  )
}
