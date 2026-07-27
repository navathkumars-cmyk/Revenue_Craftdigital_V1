"use client"

import dynamic from "next/dynamic"

// These three are purely decorative, invisible-until-mounted overlays with no
// layout impact — deferring them off the main bundle keeps initial hydration
// lighter without any visible difference to the user.
const CursorGlow = dynamic(() => import("@/components/motion/cursor-glow").then((m) => m.CursorGlow), {
  ssr: false,
})
const MouseFollower = dynamic(
  () => import("@/components/motion/mouse-follower").then((m) => m.MouseFollower),
  { ssr: false }
)
const NoiseOverlay = dynamic(() => import("@/components/motion/noise-overlay").then((m) => m.NoiseOverlay), {
  ssr: false,
})

export function DeferredEffects() {
  return (
    <>
      <CursorGlow />
      <MouseFollower />
      <NoiseOverlay />
    </>
  )
}
