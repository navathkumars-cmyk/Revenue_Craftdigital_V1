/**
 * Fixed, full-viewport film-grain texture (see `.bg-noise` in globals.css).
 * Mounted once in the root layout, above everything else, `pointer-events-none`
 * so it never intercepts clicks. Kept extremely subtle — this is texture, not
 * decoration you should consciously notice.
 */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="bg-noise pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
    />
  )
}
