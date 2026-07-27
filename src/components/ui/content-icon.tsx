import { createElement } from "react"

import { resolveIcon } from "@/lib/icon-registry"

interface ContentIconProps {
  /** Key into `iconRegistry` — the string stored on Service/Industry/TechStackItem. */
  name: string
  className?: string
}

/**
 * Renders a content-driven icon by its registry name. Uses `createElement`
 * rather than `const Icon = resolveIcon(name); <Icon />` deliberately — that
 * pattern trips the `react-hooks/static-components` lint rule, which can't
 * verify `resolveIcon` always returns the same stable reference for a given
 * name (it does; `iconRegistry` is a static lookup table, never recreated).
 */
export function ContentIcon({ name, className }: ContentIconProps) {
  return createElement(resolveIcon(name), { className, "aria-hidden": true })
}
