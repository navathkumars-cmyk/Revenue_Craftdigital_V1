"use client"

import { useSyncExternalStore } from "react"

const subscribe = () => () => {}

/** True only after client hydration. Use to gate rendering that depends on
 * browser-only state (theme, matchMedia, localStorage) without a
 * setState-in-effect hydration flag. */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
